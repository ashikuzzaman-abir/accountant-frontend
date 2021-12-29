import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

export default function AdminNavStoresItem(props) {
    const { path, url } = useRouteMatch();
    return (
        <div className='dd-menu-childs'>
            <Link to={`${url}/stores/${props.storeId}`}>{props.storeName}</Link>
        </div>
    );
}
