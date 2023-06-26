import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setProjects } from "../../state/redux/projects/projectSlice";
import { getCrudUrl } from "../api/getCrudUrl";


export function useFetchProjects() {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [controller, setController] = useState(null)

    const dispatch = useDispatch();

    useEffect(() => {
        const abortController = new AbortController();
        setController(abortController);
        setLoading(true);
        fetch( getCrudUrl('Projects/list'), {
            method: 'GET',
            signal: abortController.signal,
            headers: {
                Accept: 'application/json',
                // 'accept': 'application/json',
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${token}`
            }
            // body: JSON.stringify({})
        })
            .then( response => response.json())
            .then( data => dispatch(setProjects(data)))
            .catch( error => {
                if(error.name === "AbortError") {
                    console.log("Request finished or cancelled");
                } else {
                    setError(error)
                }
            })
            .finally(() => setLoading(false))

        return () => abortController.abort();
    }, [])

    const handleCancelRequest = () => {
        if(controller){
            controller.abort();
            setError("Request cancelled");
        }
    }
    return { loading, error, handleCancelRequest }
}