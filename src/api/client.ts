//Incomplete 

const BASE_URL = import.meta.env.BASE_URL

if (!BASE_URL){
    throw new Error("Cound not get Base Url")
}

type ApiResponse <T> = {status : "success", data: T} | {status : "error", data: string}


//export const request()