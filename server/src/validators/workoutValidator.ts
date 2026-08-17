import {z} from 'zod'

export const touchWorkoutSchema = z.object({
    name : z.string(),
    description : z.string()
})

export const touchExerciseSchema = z.object({
    name : z.string(),
    sets : z.int().min(1, "No negative values or 0 sets"),
    reps : z.int().min(0, "No negative weights exist"),
    weight : z.int().max(1000, "You did not move that").min(0,"no negative weights"),
    isKg : z.boolean(),
    notes : z.object()
})

