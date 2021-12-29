import React, {useEffect , useState} from "react";
import { Link, useRouteMatch } from "react-router-dom";

export default function EntriesNav({selected, setSelector}) {
    const { url } = useRouteMatch();
    return (
        <div className='entries-nav-container'>
            <ul>
                <li>
                    <Link
                        to={`${url}`}
                        className={
                            selected === "pending"
                                ? "entnav-button entnav-pending entnav-pending-active"
                                : "entnav-button entnav-pending"
                        }
                        onClick={() => setSelector("pending")}
                    >
                        Pending
                    </Link>
                </li>
                <li>
                    <Link
                        to={`${url}/accepted`}
                        className={
                            selected === "accepted"
                                ? "entnav-button entnav-accepted entnav-accepted-active"
                                : "entnav-button entnav-accepted"
                        }
                        onClick={() => setSelector("accepted")}
                    >
                        Accepted
                    </Link>
                </li>
                <li>
                    <Link
                        to={`${url}/rejected`}
                        className={
                            selected === "rejected"
                                ? "entnav-button entnav-rejected entnav-rejected-active"
                                : "entnav-button entnav-rejected"
                        }
                        onClick={() => setSelector("rejected")}
                    >
                        Rejected
                    </Link>
                </li>
            </ul>
        </div>
    );
}
