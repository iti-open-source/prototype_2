import { z } from "zod/v4";
import validator from "validator";

const passwordRegex = /^[a-zA-Z0-9]+$/;
const zipRegex = /^\d+$/;

export const loginUserSchema = z.object({
  email: z.email().trim(),
  password: z
    .string()
    .regex(passwordRegex, "password must be alphanumeric")
    .min(8)
    .max(128),
});

export const registerUserSchema = z
  .object({
    username: z
      .string()
      .min(3)
      .max(32)
      .trim()
      .regex(/^[a-zA-Z0-9]*$/, "only alphanumeric characters allowed"),
    email: z.email().trim(),
    password: z
      .string()
      .regex(passwordRegex, "password must be alphanumeric")
      .min(8)
      .max(128),
    confirmPassword: z.string(),
    phone: z
      .string()
      .refine((phone) => validator.isMobilePhone(phone, "ar-EG"), {
        message: "invalid egyptian phone number",
      }),
    address: z.object({
      street: z.string().max(128),
      city: z.string().max(32),
      country: z.string().max(32),
      zip: z.string().regex(zipRegex, "invalid zip").min(5).max(10),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "passwords do not match",
    path: ["confirmPassword"],
  });

export const updateUserSchema = z.object({
  username: z
    .string()
    .min(3)
    .max(32)
    .trim()
    .regex(/^[a-zA-Z0-9]*$/, "only alphanumeric characters allowed")
    .optional(),
  email: z.email().trim().optional(),
  phone: z
    .string()
    .refine((phone) => validator.isMobilePhone(phone, "ar-EG"), {
      message: "invalid Egyptian phone number",
    })
    .optional(),
  address: z
    .object({
      street: z.string().max(128).optional(),
      city: z.string().max(32).optional(),
      country: z.string().max(32).optional(),
      zip: z.string().regex(zipRegex, "invalid zip").min(5).max(10).optional(),
    })
    .optional(),
});

export const changePasswordSchema = z
  .object({
    password: z
      .string()
      .regex(passwordRegex, "password must be alphanumeric")
      .min(8)
      .max(128),
    newPassword: z
      .string()
      .regex(passwordRegex, "password must be alphanumeric")
      .min(8)
      .max(128),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "passwords do not match",
    path: ["confirmNewPassword"],
  });

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .regex(passwordRegex, "password must be alphanumeric")
      .min(8)
      .max(128),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "passwords do not match",
    path: ["confirmPassword"],
  });
