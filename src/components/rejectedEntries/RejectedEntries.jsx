import React, { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import EachListRE from "../eachListRE/EachListRE";
import './rejectedEntries.css'


export default function RejectedEntries({ setSelector }) {
    const [data, loading, error] = useFetch("/admin/entry/rejected", "GET");
    useEffect(() => {
        setSelector("rejected");
    }, []);
    return (
        <div className='re-list-container'>
            {error && `${error}`}
            <div className='re-list-table'>
                <div className='re-list-headings'>
                    <div className='re-each-th'>EntryID</div>
                    <div className='re-each-th'>Name</div>
                    <div className='re-each-th'>Store Name</div>
                    <div className='re-each-th'>Role</div>
                    <div className='re-each-th'>Amount</div>
                    <div className='re-each-th'>Date</div>
                    <div className='re-each-th'>Time</div>
                </div>
                {loading && "loading..."}
                {data.message
                    ? data.message
                    : data.map((item, idx) => {
                          return <EachListRE key={idx} data={item} />;
                      })}
            </div>
        </div>
    );
}
