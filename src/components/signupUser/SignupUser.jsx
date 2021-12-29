import React, { useState, useEffect } from "react";
import DashboardHeader from "../dashboardHeader/DashboardHeader";
import useFetch2 from "../../hooks/useFetch2";
import authFetch from "../../functions/authFetch";
import url from "../../functions/backendServerAdd";
import "./styles.css";

export default function SignupUser() {
    const [storesData, isloading, error, respose] = useFetch2(
        "/admin/store",
        "GET"
    );
    const [formData, setFormData] = useState({
        selectedStore: "",
        userName: "",
        name: "",
        email: "",
        password: "",
        role: "",
    });
    const [alert, setAlert] = useState("");
    const [operatingAlert, setOperatingAlert] = useState(null);
    useEffect(() => {
        if (alert !== "" && alert !== "success") {
            const splittedAlert = alert.split(" ");
            const primal = splittedAlert[5];
            const splittedPrimal = primal.split(`'`);
            const main = splittedPrimal[1];
            setOperatingAlert(main);
        }
        
    }, [alert]);

    // console.log(storesData);
    const formSubmitHandler = async (e) => {
        e.preventDefault();
        // console.log("submitting");
        if (formData.selectedStore === "") {
            setOperatingAlert("shopselection");
            return;
        }
        const returnData = await authFetch(`${url}/admin/signup/`, "POST", {
            name: formData.name,
            password: formData.password,
            role: formData.role,
            username: formData.userName,
            email: formData.email,
            storeId: formData.selectedStore,
        });
        const serverReturn = await returnData.json();
        console.log(serverReturn.errorsql);
        if (serverReturn.errorsql) {
            setAlert("")
            return setAlert(serverReturn.errorsql);
            
        }

        setAlert("success");
        console.log(alert);
        setFormData({
            selectedStore: "",
            userName: "",
            name: "",
            email: "",
            password: "",
            role: "",
        });
        setOperatingAlert("");
    };
    return (
        <div className='sngupnu-container'>
            <DashboardHeader routeHeading={"Signup New User"} />
            <div className='sngupnu-form-container'>
                <form className='sngupnu-form' onSubmit={formSubmitHandler}>
                    <input
                        className={
                            operatingAlert === "userName"
                                ? "sgnup-form-element taken"
                                : "sgnup-form-element"
                        }
                        required
                        type='text'
                        placeholder='Username'
                        value={formData.userName}
                        onChange={(e) =>{
                            setFormData({
                                ...formData,
                                userName: e.target.value,
                            })
                            operatingAlert === "userName"
                                ? setOperatingAlert(null)
                                : setOperatingAlert((e) => e);
                        }
                        }
                    />
                    {operatingAlert === "userName" ? (
                        <div className='smgupnu-form-inner-alert'>
                            Username is taken, please enter another username!
                        </div>
                    ) : null}
                    <input
                        className='sgnup-form-element'
                        required
                        type='text'
                        placeholder='Name'
                        value={formData.name}
                        onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                        }
                    />
                    <select
                        className={
                            operatingAlert === "shopselection"
                                ? "sgnup-form-element taken"
                                : "sgnup-form-element"
                        }
                        defaultValue=''
                        name='store'
                        id='store'
                        value={formData.selectedStore}
                        onChange={(e) => {
                            setFormData({
                                ...formData,
                                selectedStore: e.target.value,
                            });
                            operatingAlert === "shopselection"
                                ? setOperatingAlert(null)
                                : setOperatingAlert((ess) => ess);
                        }}
                    >
                        <option value='' selected>
                            Select Shop
                        </option>
                        {storesData.map((store, i) => {
                            return (
                                <option value={store.storeId} key={i}>
                                    {store.storeName}
                                </option>
                            );
                        })}
                    </select>
                    {operatingAlert === "shopselection" ? (
                        <div className='smgupnu-form-inner-alert'>
                            You have not selected any shop!
                        </div>
                    ) : null}

                    <input
                        className={
                            operatingAlert === "email"
                                ? "sgnup-form-element taken"
                                : "sgnup-form-element"
                        }
                        required
                        type='email'
                        placeholder='Email'
                        value={formData.email}
                        onChange={(e) =>{
                            setFormData({ ...formData, email: e.target.value })
                            operatingAlert === "email" ? setOperatingAlert(null) : setOperatingAlert(e => e)
                        }
                        }
                    />

                    {operatingAlert === "email" ? (
                        <div className='smgupnu-form-inner-alert'>
                            Email is taken, please enter another email!
                        </div>
                    ) : null}

                    <input
                        className='sgnup-form-element'
                        required
                        type='password'
                        placeholder='Password'
                        value={formData.password}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                password: e.target.value,
                            })
                        }
                    />
                    <input
                        className='sgnup-form-element'
                        required
                        type='text'
                        placeholder='Role'
                        value={formData.role}
                        onChange={(e) =>
                            setFormData({ ...formData, role: e.target.value })
                        }
                    />
                    <button type='submit' className='sgnup-submit-btn'>
                        Signup
                    </button>
                </form>
            </div>
        </div>
    );
}
