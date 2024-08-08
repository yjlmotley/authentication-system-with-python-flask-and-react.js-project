import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/index.css";


const Sign_up = () => {
    const { actions } = useContext(Context);
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault();
        let email = event.target.emailInput.value;
        let password = event.target.passwordInput.value;
        const response = await actions.signUp(email, password);
        if (response) {
            console.log("sign up successful")
            alert("Sign up successful! You can now log in."); // Show alert for successful sign-up
            navigate('/log_in')
        } else {
            console.log("sign up failed")
        }
    };

    return (
        <div>
            <h1> SIGN UP </h1>
            <form onSubmit={handleSubmit}>
                <input type="email" name="emailInput" placeholder="example@host.com" required />
                <input placeholder="type password here" type="password" name="passwordInput" className="passwordInput" required />
                <br></br>
                <button className="submitBtn" type="submit">Sign Up</button>
            </form>
        </div>
    )
};


export default Sign_up;