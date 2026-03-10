import { z } from "zod";

// --- 1. Constants & Enums ---
export const TIMEZONES = Intl.supportedValuesOf("timeZone");
export const HABIT_FREQUENCIES = ["DAILY", "WEEKLY"];

// --- 2. Shared User Base ---
const userBaseSchema = z.object({
  username: z.string().trim().min(1, "Username is required."),
  firstName: z.string().trim().min(1, "First name is required."),
  lastName: z.string().trim().min(1, "Last name is required."),
  timezone: z.string().refine((val) => TIMEZONES.includes(val), {
    message: "Please select a valid timezone from the list."
  }),
  phoneNumber: z.string().optional(),
  selfIntroduction: z.string().optional(),
});

// --- 3. Auth Schemas ---
export const loginSchema = z.object({
  email: z.string().trim().min(1, "Email is required.").email("Invalid email address."),
  password: z.string().trim().min(1, "Password is required."),
});

export const registerSchema = userBaseSchema.extend({
  email: z.string().trim().min(1, "Email is required.")
    .pipe(z.email("Please enter a valid email address.")),
  password: z.string().trim().min(1, "Password is required."),
  confirmPassword: z.string().trim().min(1, "Please confirm your password."),
  acceptedTerms: z.boolean().refine((value) => value, {
    message: "You must accept the Terms and Conditions.",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords do not match.",
});

// --- 4. Profile Schemas ---
export const updateProfileSchema = userBaseSchema;

// --- 5. Habit Schemas ---
export const habitSchema = z.object({
  name: z.string().trim().min(1, "Habit name is required."),
  description: z.string().optional(),
  frequency: z.enum(HABIT_FREQUENCIES, {
    message: "Please select a valid frequency",
  }),
  targetPerPeriod: z.number().min(1, "Target must be at least 1"),
}).refine((data) => {
  // Return TRUE if valid
  if (data.frequency === "DAILY") {
    return data.targetPerPeriod === 1;
  }
  if (data.frequency === "WEEKLY") {
    return data.targetPerPeriod <= 7;
  }
  return true;
}, {
  path: ["targetPerPeriod"],
  message: "Daily habits must have a target of 1; Weekly cannot exceed 7."
});

// --- 6. Exported Types ---
export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
export type UpdateProfileFormValues = z.infer<typeof updateProfileSchema>;
export type HabitFormValues = z.infer<typeof habitSchema>;