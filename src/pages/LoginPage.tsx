import { LoginContainer } from "../components/LoginContainer";
import { RegisterContainer } from "../components/RegisterContainer";
import { useState } from "react";
  
// Make the submitssions on each contianer a bit nicer better ux need to learn more

export const LoginPage = () => {
  const [loginState, setLoginState] = useState(false);

  const swapContainer = () => {
    setLoginState(!loginState);
  };

  return (
    <div>
      <div className="home-page">
        <div className="login-header">
          <h1>Welcome to the Exercise Tracker</h1>
          <h3>Please Login or Register below</h3>
          <button
            type="button"
            onClick={swapContainer}
            className="login-button"
          >
            {" "}
            {loginState ? "Register" : "Login"}
          </button>
          <div></div>
        </div>
        <div className="home-container">{loginState ? <LoginContainer /> : <RegisterContainer />}</div>
        
      </div>
    </div>
  );
};
