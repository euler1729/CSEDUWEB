import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "./hook/useAxiosPublic";
import { Input } from "antd";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [showOTPBox, setShowOTPBox] = useState(false);
  const [otp, setOTP] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();
  const axios = useAxiosPublic();
  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/reset-password-init", {
        email,
      });
      console.log(res);
    } catch (error) {
      if (error.response.status == 400) {
        toast.error("Invalid Email Address");
        return;
      }
    }
    setShowOTPBox(true);
    setErrorMessage("");
  };

  const handleSubmitOTP = async (e) => {
    e.preventDefault();
    if (otp.length !== 4 || !/^\d+$/.test(otp)) {
      toast.error("Please enter a valid 4-digit OTP.");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("Password Should be 6 length");
      return;
    }
    try {
      const response = await axios.post("/auth/reset-password-confirm", {
        email,
        enteredOTP: otp,
        newPassword,
      });
      console.log(response);
      if (response.data.message == "Invalid OTP") {
        toast.error("Invalid OTP");
        return;
      }
      toast.success("Password Changed Successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }

    setErrorMessage("");
    setEmail("");
    setOTP("");
    setShowOTPBox(false);
  };

  return (
    <div
      className="h-screen flex items-center justify-center"
      style={{
        backgroundImage:
          "url('/Img/buidings.jpg')", 
        backgroundRepeat:"no-repeat",
        backgroundSize:"cover"
      }}
    >
      <div className="wrapper flex backdrop-blur-lg border items-center justify-between w-full max-w-screen-md px-12 py-16 rounded-xl shadow-xl  mx-auto">
        {/* <img src="/src/assets/forgot_password.svg" alt="forgot_image" /> */}
        <div className=" w-1/2 flex items-center flex-col">
          <img
            src="https://i.ibb.co/VwJ6FWY/CSEDULogo-removebg-preview.png"
            alt=""
            className="h-60 w-52"
          />
          <p className="text-center text-white -mt-2">
            Department of <br></br>
            Computer Science & Engineering
            <br></br>
            <span className="text-[#14264c] text-xl font-bold" >Univeristy of Dhaka</span>
          </p>
        </div>
        <div>
        <form
          onSubmit={showOTPBox ? handleSubmitOTP : handleSubmitEmail}
          className="w-full"
        >
          <h2 className="text-white text-4xl uppercase font-bold mb-4">
            <span className="text-[#14264c]">recover</span> account
          </h2>
          {!showOTPBox && (
            <div className="mb-4">
              <input
                type="email"
                className="w-full bg-transparent placeholder:text-gray-200 border px-4 py-2 rounded focus:outline-none focus:border-blue-500 text-white"
                value={email}
                placeholder="example@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
                disabled={showOTPBox}
                required
              />
            </div>
          )}
          {showOTPBox && (
            <>
              <div className="mb-4">
                <label className="block mb-2">Enter OTP:</label>
                <input
                  type="text"
                  maxLength={4}
                  className="w-full bg-transparent placeholder:text-gray-200 border px-4 py-2 rounded focus:outline-none focus:border-blue-500 text-white "
                  value={otp}
                  onChange={(e) => setOTP(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">New Password:</label>
                <Input.Password
                  type="password"
                  className="w-full bg-transparent placeholder:text-gray-200 border px-4 py-2 rounded focus:outline-none focus:border-blue-500 text-white 
                  "
                  value={newPassword}
                  placeholder="**********"
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
            </>
          )}
          {errorMessage && (
            <div className="text-red-600 mb-4">{errorMessage}</div>
          )}
          <button
            type="submit"
            className="px-5 bg-transparent border  text-white py-2 rounded hover:bg-[#14264c]"
          >
            {showOTPBox ? "Submit OTP" : "Send OTP"}
          </button>
        </form>
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default ForgetPassword;