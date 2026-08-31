export const LoginContainer = () => {
    return (
        <div className="login-container">
            <h1>Login here</h1>
            <div className="field-group">
                <label className="login-label">
                    Email
                    <input className="login-input" type="text" placeholder="you@example.com" />
                </label>
                <label className="login-label">
                    Password
                    <input className="login-input" type="password" placeholder="••••••••" />
                </label>
                <button className="login-button"> Submit</button>
            </div>
        </div>
    );
};