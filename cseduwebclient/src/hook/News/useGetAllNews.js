import { useEffect, useState } from 'react';
import useAxiosPrivate from '../useAxiosPrivate';

export default function useGetAllNews() {  
    const [newsList, setNewsList] = useState([]); 
    const axios = useAxiosPrivate();
    async function getAllNews() {
        try {
            const res = await axios.get('/news/all');
            setNewsList(res?.data?.data);
            //console.log(res.data.data)

            return true;
        } catch (error) {
            console.log("Error fetching News",error);
        }
    }
    useEffect(() => {
        getAllNews();
    }, []);


    return  [newsList,setNewsList] ;
}