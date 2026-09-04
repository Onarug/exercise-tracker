import { request } from "./client";
import type {StatsResponse,AllWorkouts,Workout} from "../types/index.ts"

export function getStats() {

    return request<StatsResponse>("/workout/stats", { method: "GET" });

}

export function getUserWorkouts(){
    return request<AllWorkouts[]>("/workout", {method : "GET"});
}

export function addNewWorkout (name :string, description : string) {
    return request<Workout>("/workout", 
        {method : "POST",
        body: JSON.stringify({name, description})
        })
}
