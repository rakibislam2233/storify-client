"use client";
import Logo from "@/components/Shared/Navbar/Logo";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/form-input";
import { AuthActionState, resetPassword } from "@/services/auth.service";
import { Lock } from "lucide-react";
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

export default function ResetPasswordForm() {
  const [state, action, isPending] = useActionState(
    resetPassword,
    initialState,
  );
  const router = useRouter();

  // Show toast messages based on form state
  useEffect(() => {
    if (state?.success) {
      toast.success(state?.message || "Password reset successfully!");
    } else if (state.message && !state.errors) {
      toast.error(state.message);
    }
  }, [state]);

  useEffect(() => {
    if (state?.success) {
      router.push("/login");
    }
  }, [state, router]);

  return (
    <div className="w-full max-w-md mx-auto p-8 border border-gray-100 bg-white rounded">
      <div className="flex flex-col items-center mb-6">
        <Link href="/" className="flex items-center justify-center gap-1 mb-6">
          <Logo />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Reset Password
        </h1>
        <p className="text-sm text-gray-500 text-center">
          Please enter your new password below.
        </p>
      </div>

      <form action={action} className="space-y-6">
        <FormInput
          id="password"
          name="password"
          type="password"
          label="Password"
          icon={Lock}
          defaultValue={state?.inputs?.password ?? undefined}
          placeholder="Enter your password"
          error={state?.errors?.password}
          required
        />

        <FormInput
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          label="Confirm Password"
          icon={Lock}
          defaultValue={state?.inputs?.confirmPassword ?? undefined}
          placeholder="Enter your password"
          error={state?.errors?.confirmPassword}
          required
        />

        <Button
          type="submit"
          disabled={isPending}
          className="w-full bg-primary text-white rounded h-12 text-base font-semibold shadow-none hover:bg-primary"
        >
          {isPending ? "Resetting..." : "Reset Password"}
        </Button>
      </form>
    </div>
  );
}
