//import useAxiosPublic from "./useAxiosPublic";


const handleLogout = async ( ) => {
    try {
      //const axios = useAxiosPublic();
      // const res = await axios.post("/auth/login",);
      // console.log(res.data);
      localStorage.clear();
      console.log("User Logged Out Successfully");
      return { success: true};
      
    } catch (err) {
      console.log(err);
      return { success: false };
    }
  };
  
  export default handleLogout;
  