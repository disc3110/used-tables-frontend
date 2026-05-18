"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import type { InquiryStatus, InquiryType } from "@/lib/types";

const statusOptions: InquiryStatus[] = ["new", "read", "pending", "done"];

interface InquiryStatusControlsProps {
  id: string;
  type: InquiryType;
  currentStatus: InquiryStatus;
}

export default function InquiryStatusControls({
  id,
  type,
  currentStatus,
}: InquiryStatusControlsProps) {
  const router = useRouter();
  const [status, setStatus] = useState(currentStatus);
  const [isPending, startTransition] = useTransition();

  const updateStatus = (nextStatus: InquiryStatus) => {
    setStatus(nextStatus);

    startTransition(() => {
      fetch(`/api/inquiries/${type}/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: nextStatus }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Unable to update status.");
          }

          router.refresh();
        })
        .catch(() => {
          setStatus(currentStatus);
        });
    });
  };

  return (
    <div className="status-control">
      <label htmlFor={`${type}-${id}-status`}>Status</label>
      <select
        id={`${type}-${id}-status`}
        value={status}
        disabled={isPending}
        onChange={(event) => updateStatus(event.target.value as InquiryStatus)}
      >
        {statusOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
