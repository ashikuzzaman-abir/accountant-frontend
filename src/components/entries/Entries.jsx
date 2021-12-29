import React, { useState, useEffect } from "react";
import DashboardHeader from "../dashboardHeader/DashboardHeader";
import EntriesNav from "../entriesNav/EntriesNav";
import { Switch, useHistory, Route, useRouteMatch } from "react-router-dom";
import PendingEntries from "../pendingEntries/PendingEntries";
import AcceptedEntries from "../acceptedEntries/AcceptedEntries";
import RejectedEntries from "../rejectedEntries/RejectedEntries";

export default function Entries() {
    const {path} = useRouteMatch();
    const [navSelector, setNavSelector] = useState("pending");
    const History = useHistory();
    useEffect(() => {
        const path = window.location.pathname.split("/")[3];
        if (path === "") {
            setNavSelector("pending");
        }
        if (path === "accepted") {
            setNavSelector("accepted");
        }
        if (path === "rejected") {
            setNavSelector("rejected");
        }
    }, [History]);
    return (
        <div className='entries-container'>
            <DashboardHeader routeHeading={"Entries"} />
            <EntriesNav selected={navSelector} setSelector={setNavSelector} />

            <Switch>
                <Route exact path={`${path}`}>
                    <PendingEntries setSelector={setNavSelector} />
                </Route>
                <Route path={`${path}/accepted`}>
                    <AcceptedEntries setSelector={setNavSelector} />
                </Route>
                <Route path={`${path}/rejected`}>
                    <RejectedEntries setSelector={setNavSelector} />
                </Route>
            </Switch>
        </div>
    );
}
