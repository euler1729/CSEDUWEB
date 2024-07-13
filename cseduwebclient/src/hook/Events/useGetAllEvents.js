import { useEffect, useState } from 'react';
import useAxiosPrivate from '../useAxiosPrivate';

export default function useGetAllEvents() {  
    const [eventsList, setEventsList] = useState([]); 
    const axios = useAxiosPrivate();
    async function getAllEvents() {
        try {
            const res = await axios.get('/event/all');
            setEventsList(res?.data?.data);
            //console.log(res.data.data)
            return true;
        } catch (error) {
            console.log("Error fetching Events",error);
        }
    }
    useEffect(() => {
        getAllEvents();
    }, []);


    return  [eventsList,setEventsList] ;
}