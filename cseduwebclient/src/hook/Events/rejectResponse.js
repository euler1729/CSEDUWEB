import { useEffect, useState } from 'react';
import useAxiosPrivate from '../useAxiosPrivate';

export default function rejectResponse(responseId) {
    const axios = useAxiosPrivate();
    async function rejectResponse(responseId) {
        try {
            const res = await axios.delete(`/event/register/${responseId}`);
            console.log(res);
            return true;
        } catch (error) {
            console.log("Error fetching Events",error);
        }
    }
    useEffect(() => {
        rejectResponse(responseId);
    }, []);
}