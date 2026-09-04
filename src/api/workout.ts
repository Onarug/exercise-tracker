import { request } from "./client";
import type{ Workout } from "../types";

export const getWorkout = (id : string) =>{
    return request <Workout>(`/workout/${id}`, {method : "GET"});
}