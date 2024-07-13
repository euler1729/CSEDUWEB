import { useEffect, useState } from 'react';
import useAxiosPrivate from '../useAxiosPrivate';

export default function acceptResponse(responseId) {
    const axios = useAxiosPrivate();
    async function acceptResponse(responseId) {
        try {
            const res = await axios.put(`/event/register/${responseId}`);
            console.log(res);
            return true;
        } catch (error) {
            console.log("Error fetching Events",error);
        }
    }
    useEffect(() => {
        acceptResponse(responseId);
    }, []);
}