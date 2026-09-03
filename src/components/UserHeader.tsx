import { useAuth } from "../context/AuthContext";
import { logout } from "../api/auth";
import { useNavigate } from "react-router";

export const UserHeader = () => {
    const {user} = useAuth()
    const navigate = useNavigate()
    const SubmitLogout = async () => {
        try{
            await logout();
            navigate(`/`)
            
        } catch (err) {
            console.error(err)
        }
    }
    return <div>
        <h1 className="user-page-header-text">Welcome {user?.name}</h1>
        <div className="user-page-container">
            <div>
                <button className="login-button" onClick={() => console.log("Add workout btn")}> Add workout</button>
            </div>
            <div>
                <button className="login-button" onClick={SubmitLogout}> Logout</button>
            </div>
        </div>
    </div>


}