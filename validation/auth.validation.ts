import z from "zod";

export const loginValidationSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters long"),
});

export const registerFormValidationSchema = z.object({
  fullName: z
    .string()
    .min(1, "Full Name is required")
    .min(2, "Name is too short"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export const forgotPasswordValidationSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
});

export const verifyOtpValidationSchema = z.object({
  sessionId: z
    .string()
    .min(1, "Session ID is required")
    .min(4, "Invalid Session ID length"),
  code: z
    .string()
    .min(1, "OTP code is required")
    .min(6, "Invalid OTP code length"),
});

export const resetPasswordFormValidationSchema = z
  .object({
    password: z
      .string()
      .min(1, "Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const resetPasswordValidationSchema = z
  .object({
    resetPasswordToken: z
      .string()
      .min(1, "Reset password token is required")
      .min(4, "Invalid reset password token length"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string().min(1, "Confirmation is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
