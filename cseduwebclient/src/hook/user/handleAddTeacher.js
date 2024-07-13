const handleAddTeacher = async (axios, formData) => {
    try {
      const res = await axios.post("/teacher/add", formData);
      console.log(res)
      return {success: true, data:res?.data?.data};
    } catch (err) {
      console.log(err);
      return {success:false};
    }
  };
  
  export default handleAddTeacher;
  