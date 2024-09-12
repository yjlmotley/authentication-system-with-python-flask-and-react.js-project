import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/index.css";


const SignUp = () => {
    const { actions } = useContext(Context);
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault();

        let email = event.target.emailInput.value;
        let password = event.target.passwordInput.value;
        let confirmPassword = event.target.confirmPasswordInput.value;

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        const response = await actions.signUp(email, password);
        if (response) {
            console.log("sign up successful")
            alert("Sign up successful! You can now log in."); // Show alert for successful sign-up
            navigate('/log-in')
        } else {
            console.log("sign up failed")
        }
    };

    return (
        <div className="authDiv">
            <h1> SIGN UP </h1>
            <form onSubmit={handleSubmit} className="d-flex flex-column w-100 align-items-center">
                <input type="email" name="emailInput" placeholder="email@host.com" required />
                <input placeholder="type password" type="password" name="passwordInput" required />
                <input placeholder="confirm password" type="password" name="confirmPasswordInput" required />
                <button className="btn btn-primary mt-3" type="submit">Sign Up</button>
            </form>
        </div>
    )
};


export default SignUp;
