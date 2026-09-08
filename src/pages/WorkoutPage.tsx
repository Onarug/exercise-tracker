import { WorkoutHeader } from "../components/WorkoutHeader"
import { ExerciseList } from "../components/ExerciseList"

export const WorkoutPage = () => {
    return (<div className="workout-page">

        <WorkoutHeader />
        < ExerciseList/>
    </div>)
}