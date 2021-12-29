import React, { useState, useEffect } from "react";
import DashboardHeader from "../dashboardHeader/DashboardHeader";

export default function AdminDashboard() {
    return (
        <div className='dashboard-wrapper'>
            <DashboardHeader routeHeading={"Dashboard"}/>
        </div>
    );
}
