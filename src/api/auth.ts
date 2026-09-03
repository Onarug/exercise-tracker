import { request } from "./client";
import type {AuthResponse,RegisterResponse,User} from "../types/index.ts"

export function login(email :string, password :string){
    return request<AuthResponse>(
        "/auth/login",{
            method :"POST",
            body: JSON.stringify({email, password})
        }
    )
}

export function register(name : string, email :string, password :string){
    return request <RegisterResponse>  (
        '/auth/register',{
            method: "POST",
            body: JSON.stringify({name, email,password})
        }
    )
}

export function logout() {
    return request<null>("/auth/logout", { method: "POST" });
}

export function getMe() {
    return request<{ user: User }>("/auth/me", { method: "GET" });
}