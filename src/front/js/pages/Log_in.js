import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../../styles/index.css";


const Log_in = () => {
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
        <div>
            <h1>LOG IN</h1>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="email@host.com" name="emailInput" required></input>
                <input type="password" placeholder="type password here" name="passwordInput" className="passwordInput" required></input>
                <br></br>
                <button className="submitBtn" type="submit">Log In</button>
                <Link to="/sign_up">
                    <p>Click here to Sign Up</p>
                </Link>
            </form>
        </div>
    )
}


export default Log_in;