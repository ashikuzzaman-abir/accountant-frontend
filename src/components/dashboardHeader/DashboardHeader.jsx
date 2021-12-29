import React, { useState, useEffect } from "react";
import { CgProfile } from "react-icons/cg";

export default function DashboardHeader(props) {
    const [headerData, setHeaderData] = useState("");
    const data = JSON.parse(localStorage.getItem("userData"));
    useEffect(() => {
        setHeaderData(data.name);
    }, []);
    return (
        <>
            <div className='dash-header-container'>
                <div className='dash-page-heading'>
                    <h3>
                        <span>/</span> {props.routeHeading}
                    </h3>
                </div>
                <div className='dash-header-inner-container'>
                    <h3>{headerData}</h3>
                    <CgProfile className='dash-head-profile-icon' />
                </div>
            </div>
        </>
    );
}
