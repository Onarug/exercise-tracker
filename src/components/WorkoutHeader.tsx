import { useParams } from "react-router"
import { useEffect,useState } from "react";
import { getWorkout } from "../api/workout";

export const WorkoutHeader = () => {
    const {id} = useParams<{ id: string }>();
    const [name,setName] = useState("")
    const [description,setDescription] = useState("")
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
            
        } catch (err){

        }
    }
    useEffect(() => {
        getWorkoutInfo()
    },[])
    return <div>  {name}    {description}</div>

}