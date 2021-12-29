import React, { useState } from "react";
import DashboardHeader from "../dashboardHeader/DashboardHeader";
import "./addStore.css";
import authFetch from "../../functions/authFetch";
import url from "../../functions/backendServerAdd";
import shopicon from "../../media/undraw_business_shop_qw-5-t.svg";

export default function AddStore() {
    const [state, setState] = useState({
        storeName: "",
        address: "",
        type: "",
    });
    const submitHandler = async (e) => {
        e.preventDefault();
        if (
            state.storeName === "" ||
            state.address === "" ||
            state.type === ""
        ) {
            return alert("Every Field is requied");
        } else {
            const data = await authFetch(`${url}/admin/store/`, "POST", state);
            if (data.ok) {
                setState({
                    storeName: "",
                    address: "",
                    type: "",
                });
                alert("Succesfully Added Store");
                window.location.reload();
            } else {
                alert("Unexpected Error");
            }
        }
    };
    return (
        <div className='addStore-container'>
            <DashboardHeader routeHeading={"Add A Store"} />
            <div className='AS-inner-container'>
                <div className='as-form-container'>
                    <img className='shopsvg' src={shopicon} alt='' />
                    <form onSubmit={submitHandler}>
                        <input
                            required={true}
                            type='text'
                            placeholder='Name'
                            value={state.storeName}
                            onChange={(e) => {
                                setState((state) => ({
                                    ...state,
                                    storeName: e.target.value,
                                }));
                            }}
                        />
                        <input
                            required={true}
                            value={state.address}
                            type='text'
                            placeholder='Address'
                            onChange={(e) => {
                                setState((state) => ({
                                    ...state,
                                    address: e.target.value,
                                }));
                            }}
                        />
                        <input
                            required={true}
                            type='text'
                            value={state.type}
                            placeholder='Type of the Store'
                            onChange={(e) => {
                                setState((state) => ({
                                    ...state,
                                    type: e.target.value,
                                }));
                            }}
                        />
                        <button type='submit' className='as-submit-button'>
                            Add Store
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
