"use client";
import Logo from "@/components/Shared/Navbar/Logo";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/form-input";
import { AuthActionState, register } from "@/services/auth.service";
import { Lock, Mail, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

const initialState: AuthActionState = {
  success: false,
  message: "",
  errors: {},
  inputs: {},
  timestamp: 0,
};

export default function RegisterForm() {
  const [state, formAction, isPending] = useActionState(register, initialState);
  const router = useRouter();

  // Show toast messages based on form state
  useEffect(() => {
    if (state?.success) {
      toast.success(state?.message || "Registration successful!");
    } else if (state.message && !state.errors) {
      toast.error(state.message);
    }
  }, [state]);

  // Redirect to verify-email on successful registration
  useEffect(() => {
    if (state?.success && state?.data?.sessionId) {
      router.push("/verify-email");
    }
  }, [state, router]);

  return (
    <div className="w-full max-w-xl mx-auto px-8 py-8 md:px-10 md:py-9 border border-gray-100 bg-white rounded">
      <div className="flex flex-col items-center">
        <Link href="/" className="flex items-center justify-center gap-1 mb-6">
          <Logo />
        </Link>
        <h1 className="text-3xl font-black text-[#25324B] mb-2 tracking-tighter">
          Create <span className="text-primary">Account</span>
        </h1>
        <p className="text-sm text-gray-400 font-medium text-center">
          Start managing your files with secure cloud storage.
        </p>
      </div>

      <form action={formAction} className="space-y-6">
        <FormInput
          id="fullName"
          name="fullName"
          label="Full Name"
          icon={User}
          defaultValue={state?.inputs?.fullName ?? undefined}
          placeholder="Enter your full name"
          error={state?.errors?.fullName}
          required
        />

        <FormInput
          id="email"
          name="email"
          type="email"
          label="Email Address"
          icon={Mail}
          defaultValue={state?.inputs?.email ?? undefined}
          placeholder="Enter your email"
          error={state?.errors?.email}
          required
        />

        <FormInput
          id="password"
          name="password"
          type="password"
          label="Password"
          icon={Lock}
          defaultValue={state?.inputs?.password ?? undefined}
          placeholder="Create a strong password"
          error={state?.errors?.password}
          required
        />
        <Button
          type="submit"
          disabled={isPending}
          className="w-full bg-primary text-white rounded h-12 text-xs font-bold  tracking-widest shadow-none hover:bg-primary/90 transition-all active:scale-[0.98] mt-4 cursor-pointer"
        >
          {isPending ? "Creating Account..." : "Start Managing Files"}
        </Button>
      </form>

      <div className="mt-8 text-center sm:flex sm:items-center sm:justify-center sm:gap-2">
        <p className="text-xs text-gray-400 font-medium">
          Already have an account?
        </p>
        <Link
          href="/login"
          className="text-xs font-bold text-primary  tracking-widest hover:underline"
        >
          Log In
        </Link>
      </div>
    </div>
  );
}
