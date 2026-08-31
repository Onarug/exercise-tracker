import { request } from "./client";
import type {AuthResponse,RegisterResponse} from "../types/index.ts"

export function login(email :string, password :string){
    return request<AuthResponse>(
        "auth/login",{
            method :"POST",
            body: JSON.stringify({email, password})
        }
    )
}

export function register(name : string, email :string, password :string){
    return request <RegisterResponse>  (
        'auth/register',{
            method: "POST",
            body: JSON.stringify({name, email,password})
        }
    )
}