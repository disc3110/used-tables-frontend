"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
    setMessage(null);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message ?? "Unable to sign in right now.");
      }

      router.push("/");
      router.refresh();
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Unable to sign in right now.",
      );
    } finally {
      setPending(false);
    }
  };

  return (
    <section
      className="admin-card admin-card-pad"
      style={{ maxWidth: 520, margin: "64px auto" }}
    >
      <p className="admin-eyebrow">Admin Access</p>
      <h1 className="admin-title">Sign in</h1>
      <p className="admin-subtitle">
        Use your admin credentials to manage products, upload images, and review
        incoming leads.
      </p>

      <form className="admin-form" style={{ marginTop: 24 }} onSubmit={handleSubmit}>
        <div className="admin-field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>

        <div className="admin-field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>

        <button className="button-primary" type="submit" disabled={pending}>
          {pending ? "Signing in..." : "Sign in"}
        </button>

        {message ? <div className="notice error">{message}</div> : null}
      </form>
    </section>
  );
}
