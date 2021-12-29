import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import DashboardHeader from "../dashboardHeader/DashboardHeader";
import useFetch from "../../hooks/useFetch";
import "./styles.css";
import dateConverter from "../../functions/dateConverter";

export default function Stores() {
    const { storeId } = useParams();
    const [dateNTime, setDateNTime] = useState([]);
    const [data, loading, error, ok] = useFetch(
        `/admin/store/${storeId}`,
        "GET"
    );
    const [employees, empLoading, empError, empOk] = useFetch(
        `/admin/store/${storeId}/employees`,
        "GET"
    );
    useEffect(() => {
        if (data.regDate) {
            setDateNTime(dateConverter(data.regDate));
        }
    }, [data]);
    // console.log(employees);
    return (
        <div className={"stores-container"}>
            <DashboardHeader
                routeHeading={
                    loading
                        ? `Loading...`
                        : ok
                        ? data.storeName
                        : `Invalid Store`
                }
            />
            <div className='store-body-wrapper'>
                <div className='store-body-left'>
                    <div className='store-data-container'>
                        <div className='store-data-heading'>
                            Store Information
                        </div>
                        <div className='store-data-el'>
                            <div className='store-data-el-left'>Store ID</div>
                            <div className='store-data-el-right'>
                                {data.storeId}
                            </div>
                        </div>
                        <div className='store-data-el'>
                            <div className='store-data-el-left'>Store Name</div>
                            <div className='store-data-el-right'>
                                {data.storeName}
                            </div>
                        </div>
                        <div className='store-data-el'>
                            <div className='store-data-el-left'>Address</div>
                            <div className='store-data-el-right'>
                                {data.address}
                            </div>
                        </div>
                        <div className='store-data-el'>
                            <div className='store-data-el-left'>
                                Registared In
                            </div>
                            <div className='store-data-el-right'>
                                {dateNTime[0]
                                    ? `${dateNTime[1]}, ${dateNTime[0]}`
                                    : ""}
                            </div>
                        </div>
                        <div className='store-data-el'>
                            <div className='store-data-el-left'>Type</div>
                            <div className='store-data-el-right'>
                                {data.type}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='store-body-right'>
                    <h1>Employees</h1>
                    <div className='store-emplst-container'>
                        {employees.message ? "Currently there are no employees assigned" : employees.map((emp, i) => {
                            return (
                                <div key={i} className='each-emplst'>
                                    <div className='emplst-firstline'>
                                        <h2>{emp.name}</h2>
                                        <p>{emp.userName}</p>
                                    </div>
                                    <div className="emplst-lastline">
                                        <p>{emp.role}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
