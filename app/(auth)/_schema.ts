import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const loginFormValidationSchema = zodResolver(z.object({
    phone: z.string().min(1, "ورود این مقدار اجباری است"),
    password: z.string().min(1, "ورود این مقدار اجباری است"),
}))