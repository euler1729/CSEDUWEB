import useAxiosPublic from "./useAxiosPublic";

const useHandleLogin = async ( formData) => {
    try {
       const axios = useAxiosPublic();
      const res = await axios.post("/auth/login", formData);
    //console.log(res.data);
      localStorage.setItem("access_token",res?.data?.access_token)
      localStorage.setItem("id",res?.data?.id)
      //console.log("User Logged in Successfully",res?.data?.access_token);
      return { success: true, data: res.data };
    } catch (err) {
      console.log(err);
      return { success: false, error: err };
    }
  };
  
  export default useHandleLogin;
  