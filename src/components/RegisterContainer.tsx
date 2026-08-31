import { register } from "../api/auth";
import { useState } from "react";

export const RegisterContainer = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("")

  const RegisterSubmit = async () => {
    try {
        await register(name,email,password);
        console.log("Success")
        setStatus(`Successfully registerd ${name} \n Please log in now`)
        setEmail("")
        setName("")
        setPassword("")
    } catch (err){
        console.error(err)
        setStatus(`Error Registering ${name} \n Please try again`)


    }
        

  };

  return (
    <div className="login-container">
      <h1>Register here!</h1>
      <div className="field-group">
        <label className="login-label">
          Email
          <input
            className="login-input"
            type="text"
            placeholder="you@example.com"
            value={email}
            onChange={(e) =>setEmail(e.target.value)}
          />
        </label>
        <label className="login-label">
          Username
          <input className="login-input"
           type="text"
            placeholder="username"
            value={name}
            onChange={(e) =>setName(e.target.value)} />
        </label>
        <label className="login-label">
          Password
          <input
            className="login-input"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) =>setPassword(e.target.value)}
          />
        </label>
        <button className="login-button" onClick={RegisterSubmit}> Submit</button>
        <h4>{status}</h4>
      </div>
    </div>
  );
};
