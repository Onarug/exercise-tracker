import { prisma } from '../utils/prisma.js'
import { Request,Response } from 'express'

export const addWorkoutToDb = async (req :Request, res :Response) => {
    try {
        const {name ,description,exercises} = req.body;

        if(!req.user){
            return res.status(400).json({
                error : "Not Authenticated"
            });
        }

        const newWorkout = await prisma.workout.create({
        
            data: {
                name,
                description,
                createdBy : req.user.id,

                exercises : {
                    create :exercises ?? []
                }


            },
            include : {
                exercises : true
            }
        });
            return res.status(201).json({
                status : newWorkout
        });
        } catch (err){
            return res.status(401).json({
                error : err
            })
        }
    

}

export const getAllUserWorkouts = async (req : Request, res : Response ) => {
    try {

        if(!req.user){
            return res.status(400).json({
                error : "Not Authenticated"
            });
        }

        const userWorkouts = await prisma.workout.findMany({
            where : {
                createdBy :req.user.id
            }
        })

        return res.status(201).json({
            status : "sucess",
            data : userWorkouts
        })

    } catch (err) {
       return res.status(401).json({
            error : err
        }) 
    }
} 

export const getUserWorkoutById = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            return res.status(400).json({
                error: "Not Authenticated"
            });
        }

        const workout = await prisma.workout.findFirst({
            where: {
                id: req.params.workoutId as string,
            },
            include: {
                exercises: true
            }
        });

        if (!workout) {
            return res.status(404).json({
                error: "Workout not found"
            });
        }

        return res.status(200).json({
            status: "success",
            data: workout
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            error: "Error fetching workout"
        });
    }
};

export const updateUserWorkoutById = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            return res.status(400).json({ error: "Not Authenticated" });
        }

        const { name, description } = req.body;

        const existing = await prisma.workout.findFirst({
            where: {
                id: req.params.workoutId as string,
                createdBy: req.user.id,
            },
        });

        if (!existing) {
            return res.status(404).json({ error: "Workout not found" });
        }

        const updatedWorkout = await prisma.workout.update({
            where: {
                id: req.params.workoutId as string,
            },
            data: {
                name,
                description,
            },
        });

        return res.status(200).json({
            status: "success",
            data: updatedWorkout,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Error updating workout" });
    }
};

export const deleteUserWorkoutById = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            return res.status(400).json({
                error: "Not Authenticated"
            });
        }

        const workout = await prisma.workout.findFirst({
            where: {
                id: req.params.workoutId as string,
            },
            include: {
                exercises: true
            }
        });

        if (!workout) {
            return res.status(404).json({
                error: "Workout not found"
            });
        }

        await prisma.workout.delete({
            where : {
                id : req.params.workoutId as string
            }
        })

        return res.status(200).json({
            status: "successfully removed",
            
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            error: "Error deleting workout"
        });
    }
};

export const addExerciseToWorkout = async (req :Request , res: Response) => {
    try {
        const {name,sets,reps,weight,isKg,notes} = req.body
        if (!req.user) {
            return res.status(400).json({
                error: "Not Authenticated"
            });
            
        }
        const existing = await prisma.workout.findFirst({
            where: {
                id: req.params.workoutId as string,
                createdBy: req.user.id,
            },
        });

        if(!existing){
             return res.status(400).json({
                error: "Not Found or Wrong User"
            });
        }

        const newExercise = await prisma.exercise.create({
            data: {
                workoutId : req.params.workoutId  as string,
                name,
                sets,
                reps,
                weight,
                isKg,
                notes,
                }
        });

        return res.status(201).json({
            status: "success",
            data: newExercise,
        });
    
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            error: "Error adding exercise"
        });
    }
}


export const getExerciseFromWorkout = async (req :Request , res: Response) => {
    try {
        if (!req.user) {
            return res.status(400).json({
                error: "Not Authenticated"
            });
            
        }
        const existing = await prisma.workout.findFirst({
            where: {
                id: req.params.workoutId as string,
                createdBy: req.user.id,
            }, 
            include : {
                exercises :true
            }
        });

        if(!existing){
             return res.status(400).json({
                error: "Not Found or Wrong User"
            });
        }


        return res.status(201).json({
            status: "success",
            data: existing.exercises,
        });
    
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            error: "Error adding exercise"
        });
    }
}



export const updateExerciseToWorkout = async (req :Request , res: Response) => {
    try {
        const {name,sets,reps,weight,isKg,notes} = req.body
        if (!req.user) {
            return res.status(400).json({
                error: "Not Authenticated"
            });
            
        }
        const existing = await prisma.workout.findFirst({
            where: {
                id: req.params.workoutId as string,
                createdBy: req.user.id,
            },
        });

        if(!existing){
             return res.status(400).json({
                error: "Not Found or Wrong User"
            });
        }

        const newExercise = await prisma.exercise.update({
            where: {
                id: req.params.id as string,
            },
            data: {
                name,
                sets,
                reps,
                weight,
                isKg,
                notes,
                }
        });

        return res.status(201).json({
            status: "success",
            data: newExercise,
        });
    
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            error: "Error adding exercise"
        });
    }
}

export const deleteUserExerciseById = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            return res.status(400).json({
                error: "Not Authenticated"
            });
        }

        const workout = await prisma.workout.findFirst({
            where: {
                id: req.params.workoutId as string,
                createdBy : req.user.id
            },
            include: {
                exercises: true
            }
        });

        if (!workout) {
            return res.status(404).json({
                error: "Workout not found"
            });
        }

        await prisma.exercise.delete({
            where : {
                id : req.params.id as string
            }
        })

        return res.status(200).json({
            status: "successfully removed",
            
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            error: "Error deleting workout"
        });
    }
};