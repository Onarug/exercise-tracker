//Incomplete 

const BASE_URL = import.meta.env.BASE_URL

if (!BASE_URL){
    throw new Error("Cound not get Base Url")
}

type ApiResponse<T> = { status: "success"; data: T } | { status: "error"; data: string };

export async function request<T>(
    path: string,
    options: RequestInit = {}
): Promise<T> {
    const response = await fetch(`${BASE_URL}${path}`, {
        ...options,
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },
    });

    const body: ApiResponse<T> = await response.json();

    if (body.status === "error") {
        throw new Error(body.data);
    }

    return body.data;
}