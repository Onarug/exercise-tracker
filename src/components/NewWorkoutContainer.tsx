import { useState } from "react";
import { addNewWorkout } from "../api/user";
import { useNavigate } from "react-router";


export const NewWorkoutContainer = () => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const navigate = useNavigate()
    const [message,setMessage] = useState("")

    const SubmitNewWorkout = async () => {
        try {
            setMessage("Adding ...")
            const response = await addNewWorkout(name, description)
            setName("")
            setDescription("")
            navigate(`/workout/${response.id}`)

        } catch (err) {
            console.error(err)
            setMessage(String(err))
        }
    }

    return (
        <div className="add-workout">
            <div className="add-workout-form">
                <div className="field-group">
                    <label className="login-label">
                        Name
                        <input className="login-input"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)} />
                    </label>
                    <label className="login-label">
                        Description
                        <input className="login-input"
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)} />
                    </label>
                    <button className="login-button" onClick={SubmitNewWorkout}> Submit</button>
                    <div className="adding-message"><p>{message}</p></div>
                </div>
                
            </div>

        </div>
    );
};
