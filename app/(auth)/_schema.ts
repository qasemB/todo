import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const loginFormValidationSchema = zodResolver(z.object({
    phone: z.string().min(1, "ورود این مقدار اجباری است"),
    password: z.string().min(1, "ورود این مقدار اجباری است"),
}))
export const rgisterFormValidationSchema = zodResolver(z.object({
    phone: z.string().min(1, "ورود این مقدار اجباری است"),
    password: z.string().min(1, "ورود این مقدار اجباری است"),
    conPass: z.string().min(1, "ورود این مقدار اجباری است"),
}).superRefine((val, ctx) => {
    if (val.conPass !== val.password) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "رمز عبور و تکرار آن باید یکسان باشند",
            path: ["conPass"],
        });
    }
}))