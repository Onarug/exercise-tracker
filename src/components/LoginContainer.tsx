import {useState} from "react"
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";

export const LoginContainer = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const {login, user} = useAuth()
    
     const SubmitLogin = async () => {
        try{
            const loggedInUser = await login(email,password);
            navigate(`/user/${loggedInUser.id}`)
            
        } catch (err) {
            console.error(err)
        }
    }
    
    
    return (
        <div className="login-container">
            <h1>Login here</h1>
            <div className="field-group">
                <label className="login-label">
                    Email
                    <input className="login-input"
                     type="text"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label className="login-label">
                    Password
                    <input className="login-input"
                     type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)} />
                </label>
                <button className="login-button" onClick={SubmitLogin}> Submit</button>
            </div>
        </div>
    );
};