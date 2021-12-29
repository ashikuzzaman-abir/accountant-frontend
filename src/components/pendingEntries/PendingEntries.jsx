import React, { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import EachListPE from "../eachListPE/EachListPE";
import './pendingEntries.css';

export default function PendingEntries({ setSelector }) {
    const [data, loading, error] = useFetch("/admin/entry/", "GET");

    useEffect(() => {
        setSelector("pending");
    }, []);


    return (
        <div className='pe-list-container'>
            {error && `${error}`}
            <div className='pe-list-table'>
                <div className='pe-list-headings'>
                    <div className='pe-each-th'>EntryID</div>
                    <div className='pe-each-th'>Name</div>
                    <div className='pe-each-th'>Store Name</div>
                    <div className='pe-each-th'>Role</div>
                    <div className='pe-each-th'>Amount</div>
                    <div className='pe-each-th'>Date</div>
                    <div className='pe-each-th'>Time</div>
                    <div className='pe-each-th'>Accept / Reject</div>
                </div>
                {loading && "loading..."}
                {data.message
                    ? data.message
                    : data.map((item, idx) => {
                          return <EachListPE key={idx} data={item} />;
                      })}
            </div>
        </div>
    );
}
