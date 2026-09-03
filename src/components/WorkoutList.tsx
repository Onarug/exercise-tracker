import type { AllWorkouts } from "../types"
import { getUserWorkouts } from "../api/user"
import { useEffect, useState } from "react"

export const WorkoutList = () => {
    const [workouts, setWorkouts] = useState<AllWorkouts[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getUserWorkouts();
                setWorkouts(data)
            }catch (err){
                console.error(err)
            }
        }
        fetchData()
    },[])

    
     return  (
     <div className="workout-list">
        <ul>
      {workouts.map((w) => (
        <li key={w.id}>
          <div className="workout-item">
            <div className="workout-header">
            <span className="workout-name">{w.name} </span>  
            <div className="workout-date">
                ({new Date(w.date).toLocaleDateString()})
            </div>
            </div>
            
            <span className="workout-desc" >{w.description}</span> 
            </div>
        </li>
      ))}
    </ul>
     </div>)
}