import axios from 'axios';

const axiosPublic = axios.create({
    baseURL:'http://be.cseduaa.org/'
})
const useAxiosPublic = ()=>{
    return axiosPublic;
}
export default useAxiosPublic;