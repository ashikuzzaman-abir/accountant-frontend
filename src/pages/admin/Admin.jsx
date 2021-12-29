import React, { useState, useEffect } from "react";

import { Route, Switch, useRouteMatch, useHistory } from "react-router-dom";
import AddStore from "../../components/addStore/AddStore";
import AdminDashboard from "../../components/adminDashboard/AdminDashboard";
import AdminNav from "../../components/adminNav/AdminNav";
import BackButton from "../../components/backButton/BackButton";
import Entries from "../../components/entries/Entries";
import SignupUser from "../../components/signupUser/SignupUser";
import Stores from "../../components/stores/Stores";
import "./admin.css";

export default function Admin() {
    const { path } = useRouteMatch();
    const History = useHistory();

    useEffect(() => {
        //route security
        if (!localStorage.getItem("token")) {
            History.push("/login");
        }
        if (!localStorage.getItem("userData")) {
            History.push("/login");
        }
        if (localStorage.getItem("userData")) {
            if (JSON.parse(localStorage.getItem("userData")).role !== "admin") {
                localStorage.removeItem("token");
                localStorage.removeItem("userData");
                History.push("/login");
            }
            if (
                JSON.parse(localStorage.getItem("userData")).exp <
                Date.now().valueOf() / 1000
            ) {
                localStorage.removeItem("token");
                localStorage.removeItem("userData");
                History.push("/login");
            }
        }
    }, []);

    return (
        <div className='admin-wrapper'>
            <AdminNav />
            <BackButton />
            <Switch>
                <div className='admin-switch-container'>
                    <Route exact path={`${path}`}>
                        <AdminDashboard />
                    </Route>
                    <Route path={`${path}/entries`}>
                        <Entries />
                    </Route>
                    <Route path={`${path}/signupuser`}>
                        <SignupUser/>
                    </Route>
                    <Route path={`${path}/stores/:storeId`}>
                        <Stores />
                    </Route>
                    <Route path={`${path}/addstore`}>
                        <AddStore/>
                    </Route>
                </div>
            </Switch>
        </div>
    );
}
