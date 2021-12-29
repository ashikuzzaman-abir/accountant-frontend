import React from "react";
import dateConverter from "../../functions/dateConverter.js";
import { ImCheckmark, ImCross } from "react-icons/im";

export default function EachListPE({ data }) {
    const [date, time] = dateConverter(data.time);
    const acceptHandler = async () => {
        try {
            const serverData = await fetch(
                `/admin/entry/${data.entryId}/accept`,
                {
                    method: "PUT",
                    mode: "cors",
                    cache: "no-cache",
                    credentials: "same-origin",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                    redirect: "follow",
                    referrerPolicy: "no-referrer",
                    body: "",
                }
            );
            if (!serverData.ok) {
                return alert("Failed to Accept");
            }
            return window.location.reload();
        } catch (error) {
            if (error) console.log(error);
        }
    };
    const rejectHandler = async () => {
        try {
            const serverData = await fetch(
                `/admin/entry/${data.entryId}/reject`,
                {
                    method: "PUT",
                    mode: "cors",
                    cache: "no-cache",
                    credentials: "same-origin",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                    redirect: "follow",
                    referrerPolicy: "no-referrer",
                    body: "",
                }
            );
            if (!serverData.ok) {
                return alert("Failed to Reject");
            }
            return window.location.reload();
        } catch (error) {
            if (error) console.log(error);
        }
    };
    return (
        <div className='pe-each-list'>
            <div className='pe-each-td'>{data.entryId}</div>
            <div className='pe-each-td'>{data.name}</div>
            <div className='pe-each-td'>{data.store}</div>
            <div className='pe-each-td'>{data.role}</div>
            <div className='pe-each-td'>{data.amount} BDT</div>
            <div className='pe-each-td'>{date}</div>
            <div className='pe-each-td'>{time}</div>
            <div className='pe-each-td pe-option-td'>
                <ImCheckmark
                    onClick={acceptHandler}
                    className='green-checkmark'
                />
                <ImCross 
                onClick={rejectHandler}
                className='red-cross' />
            </div>
        </div>
    );
}
