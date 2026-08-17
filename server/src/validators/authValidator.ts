import {z} from "zod"

export const regsiterSchema = z.object({
    name : z.string(),
    email : z.email(),
    password : z.string().min(8,"Password must be 8 characters minimum")
})

export const loginSchema = z.object({
    email : z.string(),
    password : z.string().min(8,"Password must be 8 characters minimum")
})

