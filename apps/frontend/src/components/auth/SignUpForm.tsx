"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { Field, PasswordField } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { ApiClientError, register as registerAccount } from "@/lib/api";

type FieldName = "name" | "username" | "email" | "password";
type FieldErrors = Partial<Record<FieldName | "form", string>>;

const usernamePattern = /^[a-zA-Z0-9_]+$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function SignUpForm() {
  const router = useRouter();
  const { signIn } = useAuth();
  const { toast } = useToast();
  const [values, setValues] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [busy, setBusy] = useState(false);

  const update = (field: FieldName) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues((current) => ({ ...current, [field]: event.target.value }));
    setErrors((current) => ({ ...current, [field]: undefined, form: undefined }));
  };

  const validate = (): FieldErrors => {
    const next: FieldErrors = {};
    if (values.name.trim().length < 2) next.name = "Use at least 2 characters.";
    if (values.username.trim().length < 3) {
      next.username = "Use at least 3 characters.";
    } else if (!usernamePattern.test(values.username.trim())) {
      next.username = "Letters, numbers, and underscores only.";
    }
    if (!emailPattern.test(values.email.trim())) next.email = "Enter a valid email address.";
    if (values.password.length < 8) {
      next.password = "Use at least 8 characters.";
    } else if (!/[A-Za-z]/.test(values.password) || !/\d/.test(values.password)) {
      next.password = "Include at least one letter and one number.";
    }
    return next;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setBusy(true);
    setErrors({});

    try {
      await registerAccount({
        name: values.name.trim(),
        username: values.username.trim(),
        email: values.email.trim(),
        password: values.password,
      });

      await signIn(values.username.trim(), values.password);
      toast("Account created. You are in.", "success");
      router.replace("/dashboard");
      router.refresh();
    } catch (caught) {
      if (caught instanceof ApiClientError) {
        if (caught.issues && caught.issues.length > 0) {
          const mapped: FieldErrors = {};
          for (const issue of caught.issues) {
            const field = issue.field as FieldName | undefined;
            if (field && ["name", "username", "email", "password"].includes(field)) {
              mapped[field] = issue.message;
            }
          }
          setErrors({ ...mapped, form: caught.message });
        } else {
          setErrors({ form: caught.message });
        }
      } else {
        setErrors({ form: "Could not create the account. Check your connection and try again." });
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="animate-rise">
      <p className="label-mono">First time here</p>
      <h1 className="display mt-3 text-[2rem]">Create your account</h1>
      <p className="mt-3 max-w-sm text-[13px] leading-relaxed text-muted">
        Keep a record of every run, re-download past results, and batch images in the studio.
      </p>

      <form onSubmit={handleSubmit} className="mt-7 space-y-4" noValidate>
        {errors.form ? (
          <div className="rounded-lg border border-danger/20 bg-danger/5 px-3 py-2.5 text-[12px] leading-relaxed text-danger">
            {errors.form}
          </div>
        ) : null}

        <Field
          label="Full name"
          name="name"
          autoComplete="name"
          placeholder="Ada Lovelace"
          value={values.name}
          onChange={update("name")}
          error={errors.name}
          required
        />

        <Field
          label="Username"
          name="username"
          autoComplete="username"
          placeholder="ada_optimizes"
          value={values.username}
          onChange={update("username")}
          error={errors.username}
          required
        />

        <Field
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="ada@example.com"
          value={values.email}
          onChange={update("email")}
          error={errors.email}
          required
        />

        <PasswordField
          label="Password"
          name="password"
          autoComplete="new-password"
          placeholder="At least 8 characters"
          hint="Letter + number"
          value={values.password}
          onChange={update("password")}
          error={errors.password}
          required
        />

        <Button type="submit" size="lg" className="mt-2 w-full" loading={busy}>
          Create account
          <ArrowUpRight className="h-4 w-4" />
        </Button>
      </form>

      <p className="mt-6 text-[13px] text-muted">
        Already have an account?{" "}
        <Link href="/signin" className="font-medium text-accent-text hover:underline">
          Sign in
        </Link>
      </p>

      <p className="mt-8 border-t border-line pt-4 font-mono text-[9px] uppercase leading-relaxed tracking-[0.06em] text-muted">
        History stays until you delete it · no marketing email · no card
      </p>
    </div>
  );
}
