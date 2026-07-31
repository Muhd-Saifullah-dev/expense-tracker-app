import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "email is required").email("invalid email address"),

  password: z.string().min(1, "password is required"),
});

export type LoginSchema = z.infer<typeof loginSchema>;




export const signupSchema = z.object({
  name: z.string().min(1, "Name is required"),

  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address"),

  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type SignupSchema = z.infer<typeof signupSchema>;