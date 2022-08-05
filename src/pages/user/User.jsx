import React, {useEffect} from 'react'
import { Route, Switch, useRouteMatch, useHistory } from "react-router-dom";
import './user.css';

export default function User() {
    const History = useHistory();
    useEffect(() => {
		//route security
		if (!localStorage.getItem("token")) {
			return History.push("/login");
		}
		if (!localStorage.getItem("userData")) {
			return History.push("/login");
		}
		if (localStorage.getItem("userData")) {
			if (JSON.parse(localStorage.getItem("userData")).role === "admin") {
				localStorage.removeItem("token");
				localStorage.removeItem("userData");
				return History.push("/login");
			}
			if (
				JSON.parse(localStorage.getItem("userData")).exp <
				Date.now().valueOf() / 1000
			) {
				localStorage.removeItem("token");
				localStorage.removeItem("userData");
				return History.push("/login");
			}
		}
	}, []);

 return (
  <div>
   Users
  </div>
 )
}
