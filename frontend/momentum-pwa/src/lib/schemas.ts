import { z } from "zod";

const TIMEZONES = Intl.supportedValuesOf("timeZone");

export const registerSchema = z.object({
  username: z.string().trim().min(1, "Username is required."),
  email: z.string().trim().min(1, "Email is required.")
    .pipe(z.email("Please enter a valid email address.")),
  firstName: z.string().trim().min(1, "First name is required."),
  lastName: z.string().trim().min(1, "Last name is required."),
  password: z.string().trim().min(1, "Password is required."),
  confirmPassword: z.string().trim().min(1, "Please confirm your password."),
  timezone: z.string().refine((val) => TIMEZONES.includes(val), {
    message: "Please select a valid timezone from the list."
  }),
  phoneNumber: z.string().optional(),
  selfIntroduction: z.string().optional(),
  acceptedTerms: z.boolean().refine((value) => value, {
    message: "You must accept the Terms and Conditions.",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords do not match.",
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
export { TIMEZONES };

export const loginSchema = z.object({
  email: z.string().trim().min(1, "Email is required.").email("Invalid email address."),
  password: z.string().trim().min(1, "Password is required."),
});

export type LoginFormValues = z.infer<typeof loginSchema>;