import type { AllWorkouts } from "../types"
import { getUserWorkouts } from "../api/user"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"

export const WorkoutList = () => {
    const [workouts, setWorkouts] = useState<AllWorkouts[]>([])
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getUserWorkouts();
                //setWorkouts(data) save both states at some point
                setWorkouts(data.reverse())
            }catch (err){
                console.error(err)
            }
        }
        fetchData()
    },[])

    
     return  (
        <div className="workout-list-wrapper">
     <div className="workout-list">
        <ul className="workout-list">
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
            <span className="workout-btn"><button className="login-button"onClick={() => navigate(`/workout/${w.id}`)}> View</button></span>
            </div>
            
        </li>
      ))}
    </ul>
     </div>
     </div>)
}