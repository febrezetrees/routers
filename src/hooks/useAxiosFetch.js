import { useState, useEffect } from "react";
import axios from 'axios';

const useAxiosFetch = (dataUrl) => {
    const [data, setData] = useState([]);
    const [fetchError, setFetchError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const controller = new AbortController();//sets a source to the original request for the returned Axios promise. The source can be referred back if the Axios reqeust for a promise is cancelled, to avoid memory leaks
        
        const fetchData = async (url) => { //using 'url' in defintion of this function expression, Cf. dataUrl which is the actual parameter used
            setIsLoading(true);
            try {
                const response = await axios.get(url, {
                    signal: controller.signal
                })
                if (response) {
                    setData(response.data);
                    setFetchError(null);
                }
            } catch (err) {
                setData([]);
                setFetchError(err.message);
                
            } finally {
                //finally - either way of outcome, see if Component is mounted. If so, set setIsLoading to false, with built-in time out to see change
                setIsLoading(false); //to ensure it's not in a perpetual loading state   
            }
        }

        fetchData(dataUrl);

        //useEffect cleanup function - will cancel a request if Component unmounts during the request
        return () => controller.abort();

    }, [dataUrl]);

    return { data, fetchError, isLoading };
}

export default useAxiosFetch