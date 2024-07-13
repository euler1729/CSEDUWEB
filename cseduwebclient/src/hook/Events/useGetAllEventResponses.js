import { useEffect, useState } from 'react';
import useAxiosPrivate from '../useAxiosPrivate';

export default function useGetAllEventResponses(id) {  
    const [eventResponseList, setEventResponseList] = useState([]); 
    const axios = useAxiosPrivate();
    async function getAllEventResponses() {
        try {
            const res = await axios.get(`/event/register/list/${id}`);
            setEventResponseList(res?.data?.data);
            console.log(res.data.data)
            return true;
        } catch (error) {
            console.log("Error fetching Events",error);
        }
    }
    useEffect(() => {
        getAllEventResponses();
    }, []);

    return  [eventResponseList, setEventResponseList] ;
}