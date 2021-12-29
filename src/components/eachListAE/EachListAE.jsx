import React from 'react'
import dateConverter from "../../functions/dateConverter.js";

export default function EachListAE({data}) {
    const [date, time] = dateConverter(data.time);

 return (
     <div className='ae-each-list'>
         <div className='ae-each-td'>{data.entryId}</div>
         <div className='ae-each-td'>{data.name}</div>
         <div className='ae-each-td'>{data.store}</div>
         <div className='ae-each-td'>{data.role}</div>
         <div className='ae-each-td'>{data.amount} BDT</div>
         <div className='ae-each-td'>{date}</div>
         <div className='ae-each-td'>{time}</div>
     </div>
 );
}
