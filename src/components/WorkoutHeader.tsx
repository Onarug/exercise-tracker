import { useParams } from "react-router"
import { useEffect,useState } from "react";
import { getWorkout } from "../api/workout";
import { useNavigate } from "react-router";

export const WorkoutHeader = () => {
    const {id} = useParams<{ id: string }>();
    const [name,setName] = useState("")
    const [description,setDescription] = useState("")
    const navigate = useNavigate()
    const getWorkoutInfo = async () => {
        if (!id){
            return <div> Error Getting workout</div>
        }
        try{
            const response = await getWorkout(id)
            setName(response.name)
            if(response.description){
                setDescription(response.description)
            }
            console.log(response.exercises)
        } catch (err){

        }
    }
    useEffect(() => {
        getWorkoutInfo()
    },[])
    return (<div className="workout-header">
        <div><h1>{name}</h1> </div> 
        <div><p>{description}</p></div>
       <button className="login-button" onClick={() => navigate(-1)}>Back</button>
        </div>)

}