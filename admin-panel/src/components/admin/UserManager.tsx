"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import type { AdminUser } from "@/lib/types";

type CreateUserFormValues = {
  fullName: string;
  email: string;
  password: string;
  role: AdminUser["role"];
};

const emptyFormValues: CreateUserFormValues = {
  fullName: "",
  email: "",
  password: "",
  role: "user",
};

interface UserManagerProps {
  users: AdminUser[];
}

export default function UserManager({ users }: UserManagerProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [form, setForm] = useState<CreateUserFormValues>(emptyFormValues);
  const [notice, setNotice] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [roleDrafts, setRoleDrafts] = useState<
    Record<string, AdminUser["role"]>
  >(
    () =>
      Object.fromEntries(users.map((user) => [user.id, user.role])) as Record<
        string,
        AdminUser["role"]
      >,
  );

  const handleCreateUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNotice(null);

    startTransition(() => {
      fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      })
        .then(async (response) => {
          const result = (await response.json()) as { message?: string };

          if (!response.ok) {
            throw new Error(
              result.message ?? "Unable to create the user right now.",
            );
          }

          setNotice({
            type: "success",
            message: "User created successfully.",
          });
          setForm(emptyFormValues);
          router.refresh();
        })
        .catch((error: unknown) => {
          setNotice({
            type: "error",
            message:
              error instanceof Error
                ? error.message
                : "Unable to create the user right now.",
          });
        });
    });
  };

  const handleRoleSave = (userId: string) => {
    setNotice(null);

    startTransition(() => {
      fetch(`/api/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role: roleDrafts[userId],
        }),
      })
        .then(async (response) => {
          const result = (await response.json()) as { message?: string };

          if (!response.ok) {
            throw new Error(
              result.message ?? "Unable to update the user role.",
            );
          }

          setNotice({
            type: "success",
            message: "User role updated successfully.",
          });
          router.refresh();
        })
        .catch((error: unknown) => {
          setNotice({
            type: "error",
            message:
              error instanceof Error
                ? error.message
                : "Unable to update the user role.",
          });
        });
    });
  };

  return (
    <div className="admin-grid two">
      <section className="admin-card admin-card-pad">
        <p className="admin-eyebrow">Access</p>
        <h2 className="admin-title" style={{ fontSize: "2.3rem" }}>
          Create User
        </h2>

        <form
          className="admin-form"
          style={{ marginTop: 24 }}
          onSubmit={handleCreateUser}
        >
          <div className="admin-field">
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              value={form.fullName}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  fullName: event.target.value,
                }))
              }
              required
            />
          </div>

          <div className="admin-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  email: event.target.value,
                }))
              }
              required
            />
          </div>

          <div className="admin-form-grid">
            <div className="admin-field">
              <label htmlFor="password">Temporary Password</label>
              <input
                id="password"
                type="password"
                minLength={8}
                value={form.password}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    password: event.target.value,
                  }))
                }
                required
              />
            </div>

            <div className="admin-field">
              <label htmlFor="role">Role</label>
              <select
                id="role"
                value={form.role}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    role: event.target.value as AdminUser["role"],
                  }))
                }
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          {notice ? (
            <p
              className={`notice ${notice.type === "success" ? "success" : "error"}`}
            >
              {notice.message}
            </p>
          ) : null}

          <button type="submit" className="button-primary" disabled={isPending}>
            {isPending ? "Saving..." : "Create User"}
          </button>
        </form>
      </section>

      <section className="admin-card admin-card-pad">
        <p className="admin-eyebrow">Team</p>
        <h2 className="admin-title" style={{ fontSize: "2.3rem" }}>
          Existing Users
        </h2>

        <div className="stack" style={{ marginTop: 24 }}>
          {users.map((user) => (
            <article key={user.id} className="list-card">
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 16,
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <h3>{user.fullName}</h3>
                  <div className="meta">
                    <div>{user.email}</div>
                    <div>
                      Created {new Date(user.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <select
                    className="inline-select"
                    value={roleDrafts[user.id] ?? user.role}
                    onChange={(event) =>
                      setRoleDrafts((current) => ({
                        ...current,
                        [user.id]: event.target.value as AdminUser["role"],
                      }))
                    }
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>

                  <button
                    type="button"
                    className="button-secondary"
                    disabled={
                      isPending ||
                      (roleDrafts[user.id] ?? user.role) === user.role
                    }
                    onClick={() => handleRoleSave(user.id)}
                  >
                    Save Role
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
