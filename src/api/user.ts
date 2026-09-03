import { request } from "./client";
import type {StatsResponse,AllWorkouts} from "../types/index.ts"

export function getStats() {

    return request<StatsResponse>("/workout/stats", { method: "GET" });

}

export function getUserWorkouts(){
    return request<AllWorkouts[]>("/workout/", {method : "GET"});
}
