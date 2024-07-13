import { Outlet } from "react-router-dom";
import Footer from "./component/Footer";
import Navbar from "./component/Navbar";
import { ToastContainer } from "react-toastify";

const Body = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce
      ></ToastContainer>
    </div>
  );
};

export default Body;
