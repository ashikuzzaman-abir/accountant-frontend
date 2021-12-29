import React, { useState, useEffect } from "react";

export default function useFetch2(url, method, body) {
    const [returnData, setReturnData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(false);
    useEffect(async () => {
        setLoading(true);
        try {
            const serverData = await fetch(url, {
                method: method || "GET",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                redirect: "follow",
                referrerPolicy: "no-referrer",
                body: body && JSON.stringify(body),
            });
            await setLoading(false);
            const data1 = await serverData.json();
            const data= await JSON.parse(data1);
            await setResponse(serverData.ok);
            await setReturnData(data);
            if (!serverData.ok) {
                setError(serverData);
            }
        } catch (e) {
            if (e) {
                setError(e);
            }
        }
    }, [url]);
    return [returnData, loading, error, response];
}
