import { useEffect, useState } from 'react';
import useAxiosPrivate from '../useAxiosPrivate';

export default function useGetSingleEvents(id) {  
    const [events, setEventsList] = useState({}); 
    const axios = useAxiosPrivate();
    async function getSingleEvents(id) {
        try {
            const res = await axios.get(`/event/${id}`);
            setEventsList(res?.data?.data);
            console.log(res)
            return true;
        } catch (error) {
            console.log("Error fetching Evetns",error);
        }
    }
    useEffect(() => {
        getSingleEvents(id);
    }, []);


    return  [events,setEventsList] ;
}