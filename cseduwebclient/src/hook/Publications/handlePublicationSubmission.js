const handlePublicationSubmission = async (axios, formData) => {
    console.log(axios);
    try {
      const res = await axios.post("/research/add", formData);
      console.log(res)
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };
  
  export default handlePublicationSubmission;
  