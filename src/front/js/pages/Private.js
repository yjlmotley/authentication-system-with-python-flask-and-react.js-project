import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/index.css";


const Private = () => {
    const { actions } = useContext(Context)
    const [isAuthenticated, setIsAuthenticated]= useState("pending")

    useEffect(()=>{
        let authenticate = async () => {
            try {
                const result = await actions.goPrivate();
                setIsAuthenticated(result ? "yes" : "no");
            } catch (error) {
                console.error("Error occurred during authentication:", error);
                setIsAuthenticated("no");
            }
        };

        authenticate();
    }, [actions]);
    

    switch(isAuthenticated) {
        case "pending": 
            return(
                <div>
                    <h1>Authentication in Progress</h1>
                    <p>Please wait while we check your authentication status.</p>
                </div>
            )
        case "yes": 
            return (
                <div>
                    <h1>Private Page</h1>
                    <p>This page is only accessible to successfully logged in users.</p>
                </div>
            )
        case "no":
            return (
                <div>
                    <h1>Access Denied</h1>
                    <p>You're not an authenticated user. Please log in successfully to access the private page.</p>
                    <Link to="/log_in">
                        <p>Log In</p>
                    </Link>
                </div>
            )    
    }
};


export default Private;