import React, { useState } from "react";
import myFetch from "../../functions/myFetch";
import url from "../../functions/backendServerAdd";
import jwt from "jsonwebtoken";
import { useHistory } from "react-router-dom";

export default function LoginForm() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        adminCheck: false,
        submitStatus: "",
    });
    const History = useHistory();
    const formSubmit = async (e) => {
        e.preventDefault();
        if (
            (formData.username === "" && formData.password === "") ||
            formData.username === "" ||
            formData.password === ""
        ) {
            return setFormData({
                ...formData,
                submitStatus: `valid username and password required`,
            });
        }
        if (formData.adminCheck === true) {
            const response = await myFetch(`/admin/login`, "POST", {
                username: formData.username,
                password: formData.password,
            });
            if (response.ok) {
                const resData = await response.json();
                const decodedToken = await jwt.decode(resData.token);
                localStorage.setItem("token", resData.token);
                localStorage.setItem("userData", JSON.stringify(decodedToken));
                return History.push("/admin");
            } else {
                return setFormData({
                    ...formData,
                    submitStatus: "username or password incorrect",
                });
            }
        } else {
            const response = await myFetch(`${url}/user/login`, "POST", {
                username: formData.username,
                password: formData.password,
            });
            if (response.ok) {
                const resData = await response.json();
                const decodedToken = await jwt.decode(resData.token);
                localStorage.setItem("token", resData.token);
                localStorage.setItem("userData", JSON.stringify(decodedToken));
                return History.push("/user");
            } else {
                return setFormData({
                    ...formData,
                    submitStatus: "username or password incorrect",
                });
            }
        }
    };
    return (
        <div>
            <form className='login-form' onSubmit={(e) => formSubmit(e)}>
                <input
                    type='text'
                    name='username'
                    placeholder='username'
                    value={formData.username}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            username: e.target.value,
                            submitStatus: "",
                        })
                    }
                />
                <input
                    type='password'
                    name='password'
                    placeholder='password'
                    value={formData.password}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            password: e.target.value,
                            submitStatus: "",
                        })
                    }
                />
                <div
                    onClick={() =>
                        setFormData({
                            ...formData,
                            adminCheck: !formData.adminCheck,
                            submitStatus: "",
                        })
                    }
                >
                    <input
                        type='checkbox'
                        name='admin'
                        checked={formData.adminCheck}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                adminCheck: e.target.checked,
                                submitStatus: "",
                            })
                        }
                    />
                    <label htmlFor='admin'>admin</label>
                </div>
                <p className='form-warning'>
                    {formData.submitStatus ? `*${formData.submitStatus}` : ""}
                </p>
                <input type='submit' className='submit-button' value='log in' />
            </form>
        </div>
    );
}
