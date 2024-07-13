const handleAddAlumni = async (axios, formData) => {
    console.log(axios);
    try {
      const res = await axios.post("/alumni/add", formData);
      console.log(res)
      return {success: true, data:res?.data?.data};
    } catch (err) {
      console.log(err);
      return {success:false};
    }
  };
  
  export default handleAddAlumni;