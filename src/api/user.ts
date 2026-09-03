import { request } from "./client";
import type {StatsResponse} from "../types/index.ts"

export function getStats() {

    return request<StatsResponse>("/workout/stats", { method: "GET" });

}

