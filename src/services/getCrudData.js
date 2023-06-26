import { getCrudUrl } from "./api/getCrudUrl";
import { setProjects } from "../state/redux/projects/projectSlice";

export const getCrudData = (src) => (dispatch) => {
    let loading = true
    let errorGet = null
    const abortController = new AbortController();

    fetch( getCrudUrl(src), {
        method: 'GET',
        signal: abortController.signal,
        headers: {
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
            console.log("Request cancelled");
        } else {
            errorGet = error
            console.log(error)
        }
    })
    .finally(() => loading = false)
    
    //in test, this function cancels the request
    const handleCancelRequest = () => {
        if(abortController){
            abortController.abort();
            errorGet = "Request cancelled";
        }
    }
    return { loading, errorGet, handleCancelRequest }
}