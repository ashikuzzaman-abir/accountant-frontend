import React, { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import EachListAE from "../eachListAE/EachListAE";
import './acceptedEntries.css';

export default function AcceptedEntries({ setSelector }) {
    const [data, loading, error] = useFetch("/admin/entry/accepted", "GET");
    useEffect(() => {
        setSelector("accepted");
    }, []);
    return (
        <div className='ae-list-container'>
            {error && `${error}`}
            <div className='ae-list-table'>
                <div className='ae-list-headings'>
                    <div className='ae-each-th'>EntryID</div>
                    <div className='ae-each-th'>Name</div>
                    <div className='ae-each-th'>Store Name</div>
                    <div className='ae-each-th'>Role</div>
                    <div className='ae-each-th'>Amount</div>
                    <div className='ae-each-th'>Date</div>
                    <div className='ae-each-th'>Time</div>
                </div>
                {loading && "loading..."}
                {data.message
                    ? data.message
                    : data.map((item, idx) => {
                          return <EachListAE key={idx} data={item} />;
                      })}
            </div>
        </div>
    );
}
