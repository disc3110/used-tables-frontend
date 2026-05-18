"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import type { AdminCategory, AdminProduct } from "@/lib/types";

type ProductImageFormValue = {
  url: string;
  alt: string;
};

type ProductFormValues = {
  sku: string;
  slug: string;
  name: string;
  categorySlug: string;
  shortDescription: string;
  description: string;
  startingPrice: string;
  quantity: string;
  condition: string;
  dimensions: string;
  brand: string;
  detailLayout: string;
  clothColors: string;
  images: ProductImageFormValue[];
  available: boolean;
  featured: boolean;
  quoteOnly: boolean;
};

const MAX_PRODUCT_IMAGES = 5;

const emptyFormValues: ProductFormValues = {
  sku: "",
  slug: "",
  name: "",
  categorySlug: "pool-tables",
  shortDescription: "",
  description: "",
  startingPrice: "",
  quantity: "1",
  condition: "excellent",
  dimensions: "",
  brand: "",
  detailLayout: "default",
  clothColors: "",
  images: [],
  available: true,
  featured: false,
  quoteOnly: false,
};

interface ProductManagerProps {
  products: AdminProduct[];
  categories: AdminCategory[];
}

function mapProductToForm(product: AdminProduct): ProductFormValues {
  return {
    sku: product.sku,
    slug: product.slug,
    name: product.name,
    categorySlug: product.category.slug,
    shortDescription: product.shortDescription,
    description: product.description,
    startingPrice: String(product.startingPrice),
    quantity: String(product.quantity),
    condition: product.condition,
    dimensions: product.dimensions ?? "",
    brand: product.brand ?? "",
    detailLayout: product.detailLayout,
    clothColors: product.clothColors.join(", "),
    images: product.images.map((image) => ({
      url: image.url,
      alt: image.alt,
    })),
    available: product.available,
    featured: product.featured,
    quoteOnly: product.quoteOnly,
  };
}

export default function ProductManager({
  products,
  categories,
}: ProductManagerProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [notice, setNotice] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [form, setForm] = useState<ProductFormValues>(emptyFormValues);

  const categoryOptions = useMemo(
    () =>
      categories.map((category) => ({
        value: category.slug,
        label: category.name,
      })),
    [categories],
  );

  const resetForm = () => {
    setEditingProductId(null);
    setForm(emptyFormValues);
    setIsFormOpen(false);
  };

  const openCreateForm = () => {
    if (isFormOpen && !editingProductId) {
      resetForm();
      return;
    }

    setEditingProductId(null);
    setForm(emptyFormValues);
    setNotice(null);
    setIsFormOpen(true);
  };

  const handleEdit = (product: AdminProduct) => {
    setEditingProductId(product.id);
    setForm(mapProductToForm(product));
    setNotice(null);
    setIsFormOpen(true);
  };

  const handleChange = (
    key: keyof ProductFormValues,
    value: string | boolean,
  ) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const handleImageAltChange = (index: number, value: string) => {
    setForm((current) => ({
      ...current,
      images: current.images.map((image, imageIndex) =>
        imageIndex === index ? { ...image, alt: value } : image,
      ),
    }));
  };

  const removeImage = (index: number) => {
    setForm((current) => ({
      ...current,
      images: current.images.filter((_, imageIndex) => imageIndex !== index),
    }));
  };

  const setMainImage = (index: number) => {
    setForm((current) => {
      const images = [...current.images];
      const [selectedImage] = images.splice(index, 1);

      if (!selectedImage) return current;

      return {
        ...current,
        images: [selectedImage, ...images],
      };
    });
  };

  const submitProduct = async () => {
    setNotice(null);

    if (form.images.length < 1) {
      throw new Error("Add at least one product image before saving.");
    }

    if (form.images.length > MAX_PRODUCT_IMAGES) {
      throw new Error("Products can have a maximum of 5 images.");
    }

    const payload = {
      ...form,
      startingPrice: Number(form.startingPrice),
      quantity: Number(form.quantity),
      clothColors: form.clothColors
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      images: form.images.map((image, index) => ({
        url: image.url,
        alt: image.alt || form.name || `Product image ${index + 1}`,
      })),
    };

    const isEditing = Boolean(editingProductId);
    const endpoint = isEditing
      ? `/api/products/${editingProductId}`
      : "/api/products";
    const method = isEditing ? "PATCH" : "POST";

    const response = await fetch(endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const result = (await response.json()) as { message?: string };

      throw new Error(
        result.message ?? "Unable to save the product right now.",
      );
    }

    setNotice({
      type: "success",
      message: isEditing
        ? "Product updated successfully."
        : "Product created successfully.",
    });
    resetForm();
    router.refresh();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    startTransition(() => {
      submitProduct().catch((error: unknown) => {
        setNotice({
          type: "error",
          message:
            error instanceof Error
              ? error.message
              : "Unable to save the product right now.",
        });
      });
    });
  };

  const handleDelete = (productId: string) => {
    const confirmed = window.confirm(
      "Delete this product? This will remove it from the storefront.",
    );

    if (!confirmed) return;

    setNotice(null);

    startTransition(() => {
      fetch(`/api/products/${productId}`, {
        method: "DELETE",
      })
        .then(async (response) => {
          if (!response.ok) {
            const result = (await response.json()) as { message?: string };
            throw new Error(
              result.message ?? "Unable to delete the product right now.",
            );
          }

          setNotice({
            type: "success",
            message: "Product deleted successfully.",
          });

          if (editingProductId === productId) {
            resetForm();
          }

          router.refresh();
        })
        .catch((error: unknown) => {
          setNotice({
            type: "error",
            message:
              error instanceof Error
                ? error.message
                : "Unable to delete the product right now.",
          });
        });
    });
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = Array.from(event.target.files ?? []);

    if (files.length === 0) return;

    const remainingSlots = MAX_PRODUCT_IMAGES - form.images.length;

    if (files.length > remainingSlots) {
      setNotice({
        type: "error",
        message: `You can add ${remainingSlots} more image${
          remainingSlots === 1 ? "" : "s"
        }. Products are limited to 5 images.`,
      });
      event.target.value = "";
      return;
    }

    setUploadingImages(true);
    setNotice(null);

    try {
      const uploadedImages: ProductImageFormValue[] = [];

      for (const file of files) {
        const payload = new FormData();
        payload.append("file", file);

        const response = await fetch("/api/uploads/image", {
          method: "POST",
          body: payload,
        });

        const result = (await response.json()) as {
          url?: string;
          message?: string;
        };

        if (!response.ok || !result.url) {
          throw new Error(
            result.message ?? "Unable to upload the image right now.",
          );
        }

        uploadedImages.push({
          url: result.url,
          alt: form.name || file.name,
        });
      }

      setForm((current) => ({
        ...current,
        images: [...current.images, ...uploadedImages],
      }));
      setNotice({
        type: "success",
        message:
          uploadedImages.length === 1
            ? "Image uploaded successfully."
            : "Images uploaded successfully.",
      });
    } catch (error) {
      setNotice({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Unable to upload the image right now.",
      });
    } finally {
      setUploadingImages(false);
      event.target.value = "";
    }
  };

  return (
    <div className="admin-page">
      <section className="admin-card admin-card-pad">
        <div className="admin-header">
          <div>
            <p className="admin-eyebrow">Inventory</p>
            <h2 className="admin-title" style={{ fontSize: "2.4rem" }}>
              Products
            </h2>
          </div>
          <button
            type="button"
            className={isFormOpen ? "button-secondary" : "button-primary"}
            onClick={isFormOpen ? resetForm : openCreateForm}
          >
            {isFormOpen ? "Hide Form" : "Add Product"}
          </button>
        </div>

        {notice ? (
          <div className={`notice ${notice.type}`} style={{ marginTop: 20 }}>
            {notice.message}
          </div>
        ) : null}

        {isFormOpen ? (
          <section className="admin-card admin-card-pad">
            <div className="admin-header">
              <div>
                <p className="admin-eyebrow">
                  {editingProductId ? "Edit Product" : "Create Product"}
                </p>
                <h2 className="admin-title" style={{ fontSize: "2.4rem" }}>
                  {editingProductId ? "Update product" : "Add product"}
                </h2>
              </div>
            </div>

            <form
              className="admin-form"
              style={{ marginTop: 24 }}
              onSubmit={handleSubmit}
            >
              <div className="admin-form-grid">
                <div className="admin-field">
                  <label htmlFor="sku">SKU</label>
                  <input
                    id="sku"
                    value={form.sku}
                    onChange={(event) =>
                      handleChange("sku", event.target.value)
                    }
                    required
                  />
                </div>
                <div className="admin-field">
                  <label htmlFor="slug">Slug</label>
                  <input
                    id="slug"
                    value={form.slug}
                    onChange={(event) =>
                      handleChange("slug", event.target.value)
                    }
                    required
                  />
                </div>
              </div>

              <div className="admin-form-grid">
                <div className="admin-field">
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    value={form.name}
                    onChange={(event) =>
                      handleChange("name", event.target.value)
                    }
                    required
                  />
                </div>
                <div className="admin-field">
                  <label htmlFor="categorySlug">Category</label>
                  <select
                    id="categorySlug"
                    value={form.categorySlug}
                    onChange={(event) =>
                      handleChange("categorySlug", event.target.value)
                    }
                  >
                    {categoryOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="admin-field">
                <label htmlFor="shortDescription">Short Description</label>
                <input
                  id="shortDescription"
                  value={form.shortDescription}
                  onChange={(event) =>
                    handleChange("shortDescription", event.target.value)
                  }
                  required
                />
              </div>

              <div className="admin-field">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  value={form.description}
                  onChange={(event) =>
                    handleChange("description", event.target.value)
                  }
                  required
                />
              </div>

              <div className="admin-form-grid">
                <div className="admin-field">
                  <label htmlFor="startingPrice">Starting Price</label>
                  <input
                    id="startingPrice"
                    type="number"
                    min="0"
                    value={form.startingPrice}
                    onChange={(event) =>
                      handleChange("startingPrice", event.target.value)
                    }
                    required
                  />
                </div>
                <div className="admin-field">
                  <label htmlFor="quantity">Quantity</label>
                  <input
                    id="quantity"
                    type="number"
                    min="0"
                    value={form.quantity}
                    onChange={(event) =>
                      handleChange("quantity", event.target.value)
                    }
                    required
                  />
                </div>
              </div>

              <div className="admin-form-grid">
                <div className="admin-field">
                  <label htmlFor="condition">Condition</label>
                  <select
                    id="condition"
                    value={form.condition}
                    onChange={(event) =>
                      handleChange("condition", event.target.value)
                    }
                  >
                    <option value="excellent">Excellent</option>
                    <option value="very-good">Very Good</option>
                    <option value="good">Good</option>
                    <option value="restored">Restored</option>
                  </select>
                </div>
                <div className="admin-field">
                  <label htmlFor="brand">Brand</label>
                  <input
                    id="brand"
                    value={form.brand}
                    onChange={(event) =>
                      handleChange("brand", event.target.value)
                    }
                  />
                </div>
                <div className="admin-field">
                  <label htmlFor="dimensions">Dimensions</label>
                  <input
                    id="dimensions"
                    value={form.dimensions}
                    onChange={(event) =>
                      handleChange("dimensions", event.target.value)
                    }
                  />
                </div>
              </div>

              <div className="admin-form-grid">
                <div className="admin-field">
                  <label htmlFor="detailLayout">Detail Layout</label>
                  <select
                    id="detailLayout"
                    value={form.detailLayout}
                    onChange={(event) =>
                      handleChange("detailLayout", event.target.value)
                    }
                  >
                    <option value="pool">Pool</option>
                    <option value="foosball">Foosball</option>
                    <option value="ping-pong">Ping Pong</option>
                    <option value="smoker">Smoker</option>
                    <option value="default">Default</option>
                  </select>
                </div>
                <div className="admin-field">
                  <label htmlFor="clothColors">Cloth Colors</label>
                  <input
                    id="clothColors"
                    value={form.clothColors}
                    onChange={(event) =>
                      handleChange("clothColors", event.target.value)
                    }
                    placeholder="green, blue, black"
                  />
                </div>
              </div>

              <div className="admin-field">
                <label htmlFor="imageUpload">Product Images</label>
                <input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  disabled={
                    uploadingImages || form.images.length >= MAX_PRODUCT_IMAGES
                  }
                />
                <p className="meta">
                  {uploadingImages
                    ? "Uploading images..."
                    : `Upload 1 to 5 images. The first image is the main product image; the rest are extra images.`}
                </p>
              </div>

              {form.images.length > 0 ? (
                <div className="image-preview-grid">
                  {form.images.map((image, index) => (
                    <div
                      className="image-preview-card"
                      key={`${image.url}-${index}`}
                    >
                      <Image
                        src={image.url}
                        alt={image.alt || `Product image ${index + 1}`}
                        width={360}
                        height={270}
                        unoptimized
                      />
                      <div className="admin-field">
                        <label htmlFor={`imageAlt-${index}`}>
                          {index === 0 ? "Main Image Alt" : "Extra Image Alt"}
                        </label>
                        <input
                          id={`imageAlt-${index}`}
                          value={image.alt}
                          onChange={(event) =>
                            handleImageAltChange(index, event.target.value)
                          }
                        />
                      </div>
                      <div className="admin-actions">
                        {index > 0 ? (
                          <button
                            type="button"
                            className="button-secondary"
                            onClick={() => setMainImage(index)}
                          >
                            Set Main
                          </button>
                        ) : (
                          <span className="badge">Main</span>
                        )}
                        <button
                          type="button"
                          className="button-danger"
                          onClick={() => removeImage(index)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="notice error">
                  Add at least one image before saving this product.
                </div>
              )}

              <div className="admin-checkbox-row">
                <label className="admin-checkbox">
                  <input
                    type="checkbox"
                    checked={form.available}
                    onChange={(event) =>
                      handleChange("available", event.target.checked)
                    }
                  />
                  <span>Available</span>
                </label>
                <label className="admin-checkbox">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(event) =>
                      handleChange("featured", event.target.checked)
                    }
                  />
                  <span>Featured</span>
                </label>
              </div>

              <div className="admin-actions">
                <button
                  className="button-primary"
                  type="submit"
                  disabled={isPending || uploadingImages}
                >
                  {isPending
                    ? "Saving..."
                    : editingProductId
                      ? "Update Product"
                      : "Create Product"}
                </button>
                <button
                  className="button-secondary"
                  type="button"
                  onClick={resetForm}
                >
                  {editingProductId ? "Cancel Edit" : "Cancel"}
                </button>
              </div>
            </form>
          </section>
        ) : null}

        <div className="table-wrap" style={{ marginTop: 24 }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>
                    <strong>{product.name}</strong>
                    <div className="meta">{product.sku}</div>
                  </td>
                  <td>{product.category.name}</td>
                  <td>${product.startingPrice}</td>
                  <td>{product.quantity}</td>
                  <td>
                    <span
                      className={`badge ${product.available ? "" : "dark"}`}
                    >
                      {product.available ? "Available" : "Hidden"}
                    </span>
                  </td>
                  <td>
                    <div
                      className="admin-actions"
                      style={{ justifyContent: "flex-end" }}
                    >
                      <button
                        type="button"
                        className="button-secondary"
                        onClick={() => handleEdit(product)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="button-danger"
                        onClick={() => handleDelete(product.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
