import { LoginContainer } from "../components/LoginContainer";
import { RegisterContainer } from "../components/RegisterContainer";
import { useState } from "react";

export const LoginPage = () => {
    const [loginState,setLoginState] = useState(false)

    return (<div>
        
        <LoginContainer />
        <RegisterContainer />
         </div>);
    
}