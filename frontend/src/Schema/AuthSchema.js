import { object, z } from "zod";
export const signupSchema = z
  .object({
    name: z.string().min(4, "name must be of more then 3 characters"),
    email: z.email(),
    password: z
      .string()
      .min(6, "password must contain more then 5 characters")
      .regex(/[A-Z]/, "Must contain an uppercase letter")
      .regex(/[a-z]/, "Must contain a lowercase letter")
      .regex(/[0-9]/, "Must contain a number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });


  export const logInSchema = z.object({
    email : z.email(),
    password : z.string().min(6, "password must contain more then 5 characters"),
  })