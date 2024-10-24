import { z } from "zod";

export const registrationSchema = z
    .object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Invalid email format"),
        password: z
            .string()
            .min(6, "Password must be at least 6 characters")
            .max(100, "Password must not exceed 100 characters"),
        confirmPassword: z.string(),
        acceptTerms: z.boolean().refine((val) => val === true, {
            message: "You must accept the terms and conditions",
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });;

export type RegistrationFormValues = z.infer<typeof registrationSchema>;