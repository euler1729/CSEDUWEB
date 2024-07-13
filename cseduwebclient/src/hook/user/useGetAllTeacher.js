import { useEffect, useState } from 'react';
import useAxiosPrivate from '../useAxiosPrivate';

export default function useGetAllTeachers() {  
    const [userList, setUserList] = useState([]); 
    const [loading,setLoading] =useState(true);
    const axios = useAxiosPrivate();
    async function getAllUsers() {
        try {
            const res = await axios.get('/teacher/all');
            setUserList(res?.data?.data);
            setLoading(false);
            //console.log(res.data.data)
            return true;
        } catch (error) {
            console.log("Error fetching all teacher Info",error);
        }
    }
    useEffect(() => {
        getAllUsers();
    }, []);


    return  [userList,setUserList,loading] ;
}