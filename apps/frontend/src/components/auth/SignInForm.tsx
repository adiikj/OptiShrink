"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { Field, PasswordField } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { ApiClientError } from "@/lib/api";

export function SignInForm() {
  const router = useRouter();
  const { user, loading, signIn } = useAuth();
  const { toast } = useToast();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      router.replace("/dashboard");
    }
  }, [loading, router, user]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!identifier.trim() || !password) {
      setError("Enter your email or username, and your password.");
      return;
    }

    setBusy(true);
    try {
      await signIn(identifier.trim(), password);
      toast("Signed in. Welcome back.", "success");
      router.replace("/dashboard");
      router.refresh();
    } catch (caught) {
      setError(
        caught instanceof ApiClientError
          ? caught.message
          : "Could not sign in. Check your connection and try again.",
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="animate-rise">
      <p className="label-mono">Welcome back</p>
      <h1 className="display mt-3 text-[2rem]">Sign in to your account</h1>
      <p className="mt-3 max-w-sm text-[13px] leading-relaxed text-muted">
        Pick up where you left off — history, batch runs, and every byte you saved.
      </p>

      <form onSubmit={handleSubmit} className="mt-7 space-y-5" noValidate>
        {error ? (
          <div className="rounded-lg border border-danger/20 bg-danger/5 px-3 py-2.5 text-[12px] leading-relaxed text-danger">
            {error}
          </div>
        ) : null}

        <Field
          label="Email or username"
          name="emailOrUsername"
          autoComplete="username"
          placeholder="you@example.com"
          value={identifier}
          onChange={(event) => setIdentifier(event.target.value)}
          required
        />

        <PasswordField
          label="Password"
          name="password"
          autoComplete="current-password"
          placeholder="Your password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        <Button type="submit" size="lg" className="w-full" loading={busy}>
          Sign in
          <ArrowUpRight className="h-4 w-4" />
        </Button>
      </form>

      <p className="mt-6 text-[13px] text-muted">
        New here?{" "}
        <Link href="/signup" className="font-medium text-accent-text hover:underline">
          Create an account
        </Link>
      </p>

      <p className="mt-8 border-t border-line pt-4 font-mono text-[9px] uppercase leading-relaxed tracking-[0.06em] text-muted">
        httpOnly sessions · bcrypt passwords · no tracking
      </p>
    </div>
  );
}
