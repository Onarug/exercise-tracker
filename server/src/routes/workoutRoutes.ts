import express  from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import 
{   addWorkoutToDb,
    getAllUserWorkouts,
    getUserWorkoutById,
    updateUserWorkoutById,
    deleteUserWorkoutById,
    addExerciseToWorkout,
    getExerciseFromWorkout,
    updateExerciseToWorkout,
    deleteUserExerciseById,
    getWorkoutStats } from "../controllers/workoutController.js";
import { validateRequest } from "../middleware/validationMiddleware.js";
import { touchExerciseSchema,touchWorkoutSchema } from "../validators/workoutValidator.js";

const router = express.Router();

router.use(authMiddleware)

// Workout Specfic

router.post("/",validateRequest(touchWorkoutSchema),addWorkoutToDb);
router.get("/",getAllUserWorkouts);
router.get("/stats",getWorkoutStats)
router.get("/:workoutId",getUserWorkoutById);
router.patch("/:workoutId",validateRequest(touchWorkoutSchema),updateUserWorkoutById);
router.delete("/:workoutId",deleteUserWorkoutById);


// Exercise Specfic
router.post("/:workoutId/exercise",validateRequest(touchExerciseSchema),addExerciseToWorkout);
router.get("/:workoutId/exercise",getExerciseFromWorkout);
router.patch("/:workoutId/exercise/:id",validateRequest(touchExerciseSchema),updateExerciseToWorkout);
router.delete("/:workoutId/exercise/:id",deleteUserExerciseById);







export default router