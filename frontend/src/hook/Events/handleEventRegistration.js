const handleEventRegistation = async (axios, id, formData) => {
    try {
      const res = await axios.post(`/event/register/private/${id}`, formData);
      console.log(res)
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };
  
  export default handleEventRegistation;
  