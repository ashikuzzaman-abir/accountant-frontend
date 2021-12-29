import React, { useEffect } from "react";
import "./login.css";
import LoginForm from "../../components/loginForm/LoginForm";
import LoginHero from "../../components/loginHero/LoginHero";
import LoginFooter from "../../components/loginFooter/LoginFooter";
import { useHistory } from "react-router-dom";

export default function Login() {
    const History = useHistory();

    useEffect(() => {
        if (localStorage.getItem("userData")) {
            if (JSON.parse(localStorage.getItem("userData")).role === "admin") {
                History.push("/admin");
            } else {
                History.push("/user");
            }
        }
    }, []);

    return (
        <React.Fragment>
            <div className='whole-wrapper'>
                <div className='login-container'>
                    <LoginHero />
                    <LoginForm />
                    <LoginFooter />
                </div>
            </div>
        </React.Fragment>
    );
}
