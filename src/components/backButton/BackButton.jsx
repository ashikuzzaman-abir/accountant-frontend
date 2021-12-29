import React from "react";
import { useHistory } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

export default function BackButton() {
    const History = useHistory();
    return (
        <div
            className='backbutton-container'
            onClick={(e) => {
                History.goBack();
            }}
        >
            <BiArrowBack />
        </div>
    );
}
