import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Login.css'; // 1. Import your new custom CSS file

const Login = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    let history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();

        if (json.success) {
            localStorage.setItem('token', json.authtoken);
            toast.success("Logged in successfully!");
            history.push("/");
        } else {
            toast.error("Invalid email or password.");
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        // 2. Use the new custom classes for layout and styling
        <div className="login-container">
            <div className="login-card">
                <h2>Login to iNotebook</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input
                            type="email"
                            className="form-control-custom"
                            value={credentials.email}
                            onChange={onChange}
                            id="email"
                            name="email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control-custom"
                            value={credentials.password}
                            onChange={onChange}
                            name="password"
                            id="password"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="custom-btn btn-primary-custom">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;