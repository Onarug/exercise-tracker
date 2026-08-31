//Incomplete need to add url to a env file but since local not a securiyt risk

const BASE_URL = "http://localhost:5001/"

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