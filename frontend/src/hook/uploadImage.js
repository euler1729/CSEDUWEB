import axios from "axios";

const imageAPI = "1c658c0527b51dfd2286d93927f83d92";

const uploadImage = async (image) => {
    try {
      const imageFile = { image };
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imageAPI}`,
        imageFile,
        { headers: { "content-type": "multipart/form-data" } }
      );
      //console.log(res)
      return res.data.data.display_url;
    } catch (error) {
      throw new Error("Image upload failed");
    }
};
export default uploadImage;
