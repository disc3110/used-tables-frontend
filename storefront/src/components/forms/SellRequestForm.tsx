"use client";

import {
  ChangeEvent,
  FormEvent,
  startTransition,
  useActionState,
  useEffect,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { submitSellRequest } from "@/app/actions/inquiries";
import { initialInquiryActionState } from "./inquiry-action-state";

const inputClassName =
  "rounded-[1rem] border border-[#dfcfb7] bg-[#fffcf7] px-4 py-3 text-sm text-[#122233] outline-none transition focus:border-[#c89f57]";

interface SellRequestFormProps {
  itemType: string;
}

type UploadStatus = "idle" | "uploading" | "uploaded" | "error";

interface UploadedImageMeta {
  url: string;
  publicId: string;
  width?: number;
  height?: number;
  originalFilename?: string;
}

interface LocalImagePreview {
  id: string;
  file: File;
  previewUrl: string;
  uploadStatus: UploadStatus;
  result?: UploadedImageMeta;
}

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

async function uploadToCloudinary(file: File): Promise<UploadedImageMeta> {
  const body = new FormData();
  body.append("file", file);
  body.append("upload_preset", UPLOAD_PRESET!);
  body.append("folder", "used-billiard-store/sell-requests");

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    { method: "POST", body },
  );

  if (!response.ok) {
    throw new Error(`Upload failed: ${response.status}`);
  }

  const data = await response.json() as {
    secure_url: string;
    public_id: string;
    width?: number;
    height?: number;
    original_filename?: string;
  };

  return {
    url: data.secure_url,
    publicId: data.public_id,
    width: data.width,
    height: data.height,
    originalFilename: data.original_filename,
  };
}

export default function SellRequestForm({ itemType }: SellRequestFormProps) {
  const [state, formAction, pending] = useActionState(
    submitSellRequest,
    initialInquiryActionState,
  );
  const formRef = useRef<HTMLFormElement | null>(null);

  const [selectedImages, setSelectedImages] = useState<LocalImagePreview[]>([]);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const isUploading = selectedImages.some((img) => img.uploadStatus === "uploading");
  const hasUploadErrors = selectedImages.some((img) => img.uploadStatus === "error");
  const isSubmitDisabled = pending || isUploading;

  const handleImageSelection = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);

    if (!files.length) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    const maxFileSize = 10 * 1024 * 1024;

    let hadInvalid = false;
    const validFiles = files.filter((file) => {
      if (!allowedTypes.includes(file.type)) {
        setUploadError("Only JPG, PNG, and WEBP images are allowed.");
        hadInvalid = true;
        return false;
      }
      if (file.size > maxFileSize) {
        setUploadError("Images must be smaller than 10MB.");
        hadInvalid = true;
        return false;
      }
      return true;
    });

    if (!validFiles.length) return;
    if (!hadInvalid) setUploadError(null);

    setSelectedImages((previous) => {
      const remainingSlots = 3 - previous.length;
      return [
        ...previous,
        ...validFiles.slice(0, remainingSlots).map((file) => ({
          id: crypto.randomUUID(),
          file,
          previewUrl: URL.createObjectURL(file),
          uploadStatus: "idle" as const,
        })),
      ];
    });

    event.target.value = "";
  };

  const removeImage = (imageId: string) => {
    setSelectedImages((previous) => {
      const image = previous.find((img) => img.id === imageId);
      if (image) URL.revokeObjectURL(image.previewUrl);
      return previous.filter((img) => img.id !== imageId);
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (selectedImages.length > 0 && (!CLOUD_NAME || !UPLOAD_PRESET)) {
      setUploadError(
        "Photo uploads are not available right now. Remove your photos and try again, or contact us directly.",
      );
      return;
    }

    setUploadError(null);

    const idleImages = selectedImages.filter((img) => img.uploadStatus === "idle");

    // Track new upload results locally to avoid stale-closure issues when building imagesJson
    const newResults = new Map<string, UploadedImageMeta>();

    if (idleImages.length > 0) {
      setSelectedImages((prev) =>
        prev.map((img) =>
          img.uploadStatus === "idle"
            ? { ...img, uploadStatus: "uploading" as const }
            : img,
        ),
      );

      const outcomes = await Promise.allSettled(
        idleImages.map((img) =>
          uploadToCloudinary(img.file).then((result) => ({ id: img.id, result })),
        ),
      );

      let hasErrors = false;

      outcomes.forEach((outcome) => {
        if (outcome.status === "fulfilled") {
          newResults.set(outcome.value.id, outcome.value.result);
        } else {
          hasErrors = true;
        }
      });

      setSelectedImages((prev) =>
        prev.map((img) => {
          const idleMatch = idleImages.find((idle) => idle.id === img.id);
          if (!idleMatch) return img;
          const result = newResults.get(img.id);
          if (result) return { ...img, uploadStatus: "uploaded" as const, result };
          return { ...img, uploadStatus: "error" as const };
        }),
      );

      if (hasErrors) {
        setUploadError("Some photos failed to upload. Remove them and try again.");
        return;
      }
    }

    // Collect results from both previously-uploaded and just-uploaded images
    const allUploaded: UploadedImageMeta[] = selectedImages
      .map((img) => {
        if (img.uploadStatus === "uploaded" && img.result) return img.result;
        return newResults.get(img.id) ?? null;
      })
      .filter((r): r is UploadedImageMeta => r !== null);

    const formData = new FormData(formRef.current!);
    if (allUploaded.length > 0) {
      formData.set("imagesJson", JSON.stringify(allUploaded));
    }

    startTransition(() => formAction(formData));
  };

  useEffect(() => {
    if (state.status !== "success") return;

    formRef.current?.reset();
    selectedImages.forEach((img) => URL.revokeObjectURL(img.previewUrl));

    const timeout = setTimeout(() => {
      setSelectedImages([]);
      setUploadError(null);
    }, 0);

    return () => clearTimeout(timeout);
  }, [state.status]);

  const submitLabel = isUploading
    ? "Uploading photos…"
    : pending
      ? "Sending…"
      : "Get a Quote";

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="mt-8 space-y-4">
      <input type="hidden" name="itemType" value={itemType} />
      <input type="hidden" name="imagesJson" />

      <div className="grid gap-4 sm:grid-cols-2">
        <input
          required
          name="fullName"
          type="text"
          placeholder="Full Name"
          className={inputClassName}
        />
        <input
          required
          name="email"
          type="email"
          placeholder="Email Address"
          className={inputClassName}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-[minmax(0,0.75fr)_minmax(0,1fr)]">
        <input
          required
          name="phone"
          type="tel"
          placeholder="Phone Number"
          className={inputClassName}
        />
        <input
          name="location"
          type="text"
          placeholder="Location"
          className={inputClassName}
        />
      </div>

      <textarea
        name="message"
        rows={3}
        placeholder="Tell us a little about your table."
        className={`${inputClassName} min-h-[112px] w-full`}
      />

      <div className="space-y-3">
        <div className="space-y-1">
          <p className="text-sm font-medium text-[#122233]">
            Upload photos of your table
          </p>
          <p className="text-xs text-[#7f8b96]">
            Add up to 3 photos. JPG, PNG, or WEBP only.
          </p>
        </div>

        <label
          htmlFor="sell-request-images"
          className="group flex min-h-[160px] cursor-pointer flex-col items-center justify-center rounded-[1.5rem] border border-dashed border-[#d8c7ac] bg-[#fffaf2] px-6 py-8 text-center transition hover:border-[#c89f57] hover:bg-[#fff7eb]"
        >
          <div className="space-y-2">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#f7e2b5] text-[#8c6120] transition group-hover:bg-[#f1c269]">
              <span className="text-xl">+</span>
            </div>

            <div>
              <p className="text-sm font-medium text-[#122233]">
                Drag & drop photos here
              </p>
              <p className="mt-1 text-xs text-[#7f8b96]">
                or click to browse from your device
              </p>
            </div>
          </div>

          <input
            id="sell-request-images"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            capture="environment"
            className="hidden"
            onChange={handleImageSelection}
            disabled={selectedImages.length >= 3 || isUploading}
          />
        </label>

        {selectedImages.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {selectedImages.map((image) => (
              <div
                key={image.id}
                className={`relative overflow-hidden rounded-[1.25rem] border bg-white ${
                  image.uploadStatus === "error"
                    ? "border-[#c0392b]"
                    : "border-[#e7dbc7]"
                }`}
              >
                <div className="relative">
                  <img
                    src={image.previewUrl}
                    alt="Selected pool table upload preview"
                    className={`h-32 w-full object-cover transition ${
                      image.uploadStatus === "uploading" ? "opacity-50" : ""
                    }`}
                  />

                  {image.uploadStatus === "uploading" ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#c89f57] border-t-transparent" />
                    </div>
                  ) : null}

                  {image.uploadStatus === "uploaded" ? (
                    <div className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[rgba(80,140,80,0.90)] text-xs text-white">
                      ✓
                    </div>
                  ) : null}
                </div>

                <button
                  type="button"
                  onClick={() => removeImage(image.id)}
                  disabled={image.uploadStatus === "uploading"}
                  className="absolute left-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-[rgba(18,34,51,0.82)] text-sm text-white backdrop-blur-sm transition hover:bg-[rgba(18,34,51,0.95)] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  ×
                </button>

                <div
                  className={`border-t border-[#efe4d3] px-3 py-2 text-xs ${
                    image.uploadStatus === "error"
                      ? "text-[#c0392b]"
                      : image.uploadStatus === "uploaded"
                        ? "text-[#4a7c4a]"
                        : "text-[#6f7a84]"
                  }`}
                >
                  {image.uploadStatus === "uploading"
                    ? "Uploading…"
                    : image.uploadStatus === "uploaded"
                      ? "Uploaded"
                      : image.uploadStatus === "error"
                        ? "Upload failed — remove and retry"
                        : image.file.name}
                </div>
              </div>
            ))}
          </div>
        ) : null}

        {selectedImages.length > 0 ? (
          <p className="text-xs text-[#7f8b96]">
            {selectedImages.length} / 3 photos selected
          </p>
        ) : null}

        {hasUploadErrors ? (
          <p className="text-sm text-[#a33a2b]">
            Some photos failed to upload. Remove them and try again.
          </p>
        ) : uploadError ? (
          <p className="text-sm text-[#a33a2b]">{uploadError}</p>
        ) : null}
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={isSubmitDisabled || hasUploadErrors}
          className="inline-flex items-center justify-center gap-3 self-start rounded-full bg-[#f1c269] px-6 py-3.5 text-sm font-medium text-[#18212d] shadow-[0_10px_24px_rgba(0,0,0,0.12)] transition hover:bg-[#f5ce82] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span>{submitLabel}</span>
          <span aria-hidden="true" className="text-base leading-none">
            &rarr;
          </span>
        </button>

        <Link
          href="/contact"
          className="text-sm font-medium text-[#8c6120] transition hover:text-[#6d4716]"
        >
          Learn how it works
        </Link>
      </div>

      {state.message ? (
        <p
          className={`text-sm ${
            state.status === "success" ? "text-[#6d7a48]" : "text-[#a33a2b]"
          }`}
        >
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
