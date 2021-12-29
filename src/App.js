import { useState, useEffect } from "react";
import "./app.css";
import Admin from "./pages/admin/Admin";
import Login from "./pages/login/Login";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    useHistory,
    useRouteMatch,
} from "react-router-dom";
import User from "./pages/user/User";
import Error404 from "./pages/404/Error404";

function App() {
    const { path } = useRouteMatch();
    const [isLogin, setIsLogin] = useState(false);
    const [userRole, setUserRole] = useState("");

    return (
        <Switch>
            <Route exact path={["/", "/login"]}>
                <Login />
            </Route>
            <Route path='/admin'>
                <Admin />
            </Route>
            <Route path='/user'>
                <User />
            </Route>
        </Switch>
    );
}

export default App;
