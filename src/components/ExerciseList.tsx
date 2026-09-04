import { useEffect, useState } from "react"
import { getWorkout } from "../api/workout";
import { useParams } from "react-router";
import { addExercise } from "../api/workout";
import type { Exercise } from "../types";


export const ExerciseList = () => {
    const [exercises, setExercises] = useState<Exercise[]>([])
    const { id } = useParams<{ id: string }>();
    const [name, setName] = useState("")
    const [reps, setReps] = useState<number | "">("")
    const [sets, setSets] = useState<number | "">("")
    const [weight, setWeight] = useState<number | "">("")
    const [adding, setAdding] = useState(false)

    const addNewExercise = async () => {
        try {
            if(id && reps && sets && weight){
                await addExercise(id,name,reps,sets,weight,false,"")

            }
            setAdding(!adding)
            setName("")
            setSets("")
            setReps("")
            setWeight("")
            
        } catch (err){
            console.error(err)
        }
    }

    const getWorkoutInfo = async () => {
        if (!id) {
            return <div> Error Getting workout</div>
        }
        try {
            const response = await getWorkout(id)

            if (response.exercises) {
                setExercises(response.exercises)
            }            

        } catch (err) {
            console.error(err)
        }
    }
    useEffect(() => {
        getWorkoutInfo()
    }, [addNewExercise])
    return (
        <div >
            <button className="login-button" onClick={() => setAdding(!adding)}> {!adding ? "Add Exercise" : "Close" }</button>
            {adding ?  
               <div>
                
                <div className="add-workout">
                    <div className="field-group">
                        <label className="login-label">
                            Name
                            <input className="login-input"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)} />
                        </label>
                        <label className="login-label">
                            Reps
                            <input
                                className="login-input"
                                type="number"
                                min="0"
                                step="1"
                                value={reps}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    setReps(val === "" ? "" : Number(val));
                                }}
                            />
                        </label>
                        <label className="login-label">
                            Sets
                            <input
                                className="login-input"
                                type="number"
                                min="0"
                                step="1"
                                value={sets}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    setSets(val === "" ? "" : Number(val));
                                }}
                            />
                        </label>
                        <label className="login-label">
                            Weight
                            <input
                                className="login-input"
                                type="number"
                                min="0"
                                step="1"
                                value={weight}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    setWeight(val === "" ? "" : Number(val));
                                }}
                            />
                        </label>
                        <div>
                            <button onClick={addNewExercise}>Add</button>
                        </div>
                    </div>
                </div>

            </div>: ""}


            <ul className="exercise-list">
                {exercises.map((exercise) => (<li key={exercise.id}>
                    <div className="exercise-item">
                        <div className="exercise-stat-box"> {exercise.name}</div>
                        <div className="exercise-stat-box">
                            Set
                            <div> {exercise.sets}</div>
                        </div>

                        <div className="exercise-stat-box">
                            Rep
                            <div> {exercise.reps}</div>
                        </div>
                        <div className="exercise-stat-box">
                            Weight
                            <div> {exercise.weight}</div>
                        </div>
                    </div>
                </li>))}
            </ul>

        </div>
    )
}