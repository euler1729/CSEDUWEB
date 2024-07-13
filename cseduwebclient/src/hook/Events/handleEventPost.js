const handleEventsPost = async (axios, formData) => {
    try {
      const res = await axios.post("/event/add", formData);
      console.log(res)
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };
  
  export default handleEventsPost;
  