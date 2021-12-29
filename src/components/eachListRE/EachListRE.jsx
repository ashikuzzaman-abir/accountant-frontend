import React from 'react'
import dateConverter from "../../functions/dateConverter.js";

export default function EachListRE({data}) {
 const [date, time] = dateConverter(data.time);
 return (
     <div className='re-each-list'>
         <div className='re-each-td'>{data.entryId}</div>
         <div className='re-each-td'>{data.name}</div>
         <div className='re-each-td'>{data.store}</div>
         <div className='re-each-td'>{data.role}</div>
         <div className='re-each-td'>{data.amount} BDT</div>
         <div className='re-each-td'>{date}</div>
         <div className='re-each-td'>{time}</div>
     </div>
 );
}
