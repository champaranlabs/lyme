import { z } from "zod";

export const verifyFormSchema = z.object({
    otp: z.string(),
});

export type VerifyFormValues = z.infer<typeof verifyFormSchema>;