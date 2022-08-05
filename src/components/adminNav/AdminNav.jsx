import React, { useState, useEffect, useRef } from "react";
import { useRouteMatch, Link, useHistory } from "react-router-dom";
import myFetch from "../../functions/myFetch";
import AdminNavStoresItem from "../adminNavStoresItem/AdminNavStoresItem";

import { MdDashboard, MdPointOfSale, MdLogout } from "react-icons/md";
import { ImMan } from "react-icons/im";
import {
    RiAdminFill,
    RiArrowDropDownLine,
    RiArrowDropUpLine,
} from "react-icons/ri";
import { GrAddCircle } from "react-icons/gr";
import {BiStoreAlt} from 'react-icons/bi';
import { AiFillFolderAdd } from "react-icons/ai";

export default function AdminNav() {
    const ddref = useRef();
    const History = useHistory();
    const [stores, setStores] = useState([]);
    const [dropDown, setDropDown] = useState({
        storesDropDown: false,
    });
    const { url, path } = useRouteMatch();
    const autoHideDd = () => {
        return setDropDown( {...dropDown, storesDropDown: false});
    }

    useEffect(async () => {
        const response = await fetch("/admin/store", {
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
        });
        const data = await response.json();
        const parseData = await JSON.parse(data);

        setStores(parseData);
    }, []);

    const storeDdHandler = () => {
        setDropDown({
            ...dropDown,
            storesDropDown: !dropDown.storesDropDown,
        });
    };
    useEffect(() => {
        ddref.current.addEventListener("click", storeDdHandler);
        return () => ddref.current.removeEventListener("click", storeDdHandler);
    }, [dropDown]);

    return (
        <div className='admin-nav-container'>
            <ul>
                <li onClick={autoHideDd}>
                    <Link to={`${url}`}>
                        <MdDashboard className='admin-nav-icons' />
                        <span>Dashboard</span>
                    </Link>
                </li>
                <li onClick={autoHideDd}>
                    <Link to={`${url}/entries`}>
                        <MdPointOfSale className='admin-nav-icons' />
                        <span>Entries</span>
                    </Link>
                </li>
                <li>
                    <div ref={ddref} className='admin-nav-drop-down-head'>
                        <BiStoreAlt className='admin-nav-icons' />
                        <span>Stores</span>
                        {dropDown.storesDropDown ? (
                            <RiArrowDropUpLine className='dd-icon' />
                        ) : (
                            <RiArrowDropDownLine className='dd-icon' />
                        )}
                    </div>
                    <div
                        className={
                            dropDown.storesDropDown
                                ? "admin-nav-ddmenu"
                                : "admin-nav-ddmenu dd-hide"
                        }
                    >
                        {stores.map((store, index) => {
                            return (
                                <AdminNavStoresItem
                                    key={store.storeId}
                                    {...store}
                                />
                            );
                        })}
                    </div>
                </li>
                <li onClick={autoHideDd}>
                    <Link to={`${url}/addstore`}>
                        <AiFillFolderAdd className='admin-nav-icons' />
                        Add Store
                    </Link>
                </li>
                <li onClick={autoHideDd}>
                    <Link to={`${url}/signupuser`}>
                        <ImMan className='admin-nav-icons' />
                        Signup User
                    </Link>
                </li>
                <li onClick={autoHideDd}>
                    <Link to={`${url}/edituser`}>
                        <ImMan className='admin-nav-icons' />
                        Edit User
                    </Link>
                </li>

                <li onClick={autoHideDd}>
                    <div
                        className='admin-logout-portion'
                        onClick={() => {
                            localStorage.removeItem("token");
                            localStorage.removeItem("userData");
                            History.push("/");
                        }}
                    >
                        <MdLogout className='admin-nav-icons' />
                        Log out
                    </div>
                </li>
            </ul>
        </div>
    );
}
