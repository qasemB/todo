import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const createTaskFormValidationSchema = zodResolver(z.object({
    title: z.string().min(1, "ورود این مقدار اجباری است"),
    description: z.string().min(1, "ورود این مقدار اجباری است"),
    startedAt: z.string().min(1, "ورود این مقدار اجباری است"),
    endedAt: z.string().min(1, "ورود این مقدار اجباری است"),
    taskCategoryId: z.string().min(1, "ورود این مقدار اجباری است"),
    repetitionItems: z.string().min(1, "ورود این مقدار اجباری است"),
    repetitionType: z.string().min(1, "ورود این مقدار اجباری است"),
}))