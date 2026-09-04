import { request } from "./client";
import type{ Workout } from "../types";

export const getWorkout = (id : string) =>{
    return request <Workout>(`/workout/${id}`, {method : "GET"});
}

export const addExercise = (id : string,name : string, sets : number, reps :number,weight :number,isKg : boolean, notes : string ) => {
    return request <Workout>(`/workout/${id}/exercise`, 
        {method : "POST",
            body : JSON.stringify({name,sets,reps,weight,isKg,notes})

        }
    );

}