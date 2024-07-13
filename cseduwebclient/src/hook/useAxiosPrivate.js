import axios from "axios";
import { useNavigate } from "react-router-dom";


const axiosPrivate = axios.create({
    baseURL:'http://localhost:8000'
})
const useAxiosPrivate = () => {
    const navigate = useNavigate();

    axiosPrivate.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access_token')
        //console.log('request stopped by interceptors', token)
        config.headers.authorization = `Bearer ${token}`;
        return config;
    }, function (error) {
        return Promise.reject(error);
    });


    axiosPrivate.interceptors.response.use(function (response) {
        return response;
    }, async (error) => {
        const status = error?.response?.status;
         //console.log('status error in the interceptor', status);
        if (status === 401 || status === 403) {
            navigate('/login');
        }
        return Promise.reject(error);
    })


    return axiosPrivate;
};

export default useAxiosPrivate;

