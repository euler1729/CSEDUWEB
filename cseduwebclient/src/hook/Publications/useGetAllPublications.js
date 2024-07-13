import { useEffect, useState } from 'react';
import useAxiosPrivate from '../useAxiosPrivate';

export default function useGetAllPublications() {  
    const [list, setList] = useState([]); 
    const [loading,setLoading] =useState(true);
    const axios = useAxiosPrivate();
    async function getAll() {
        try {
            const res = await axios.get('/research/all');
            setList(res?.data?.data);
            setLoading(false);
            console.log(res.data.data)
            return true;
        } catch (error) {
            console.log("Error fetching all teacher Info",error);
        }
    }
    useEffect(() => {
        getAll();
    }, []);


    return  [list,setList,loading] ;
}