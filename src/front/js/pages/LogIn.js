import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../../styles/index.css";


const LogIn = () => {
    const { actions } = useContext(Context);
    const navigate = useNavigate()
    const handleSubmit = async (event) => {
        event.preventDefault();
        let email = event.target.emailInput.value;
        let password = event.target.passwordInput.value;
        const response = await actions.logIn(email, password);
        if (response) {
            console.log('Login successful');
            navigate('/private')
        } else {
            console.log('Login failed');
            // alert("Invalid username or password. Please try again.");
            navigate('/private')
        };
    };

    return (
        <div className="authDiv">
            <h1>LOG IN</h1>
            <form onSubmit={handleSubmit} className="d-flex flex-column w-100 align-items-center">
                <input type="email" placeholder="email@host.com" name="emailInput" required></input>
                <input type="password" placeholder="type password here" name="passwordInput" required></input>
                <button className="btn btn-primary mt-3" type="submit">Log In</button>
                <Link to="/sign-up" className="mt-4">Click here to Sign Up</Link>
            </form>
        </div>
    )
}


export default LogIn;
