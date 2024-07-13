import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="mt-auto margin-bottom: 0 bg-gray-900 text-gray-300 py-6 px-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
        {/* Column 1 */}
        <div className="">
          <img
            src="https://i.ibb.co/tKTXhQ6/CSEDULogo.png"
            className="w-24 mb-4 rounded-lg"
            alt="Logo"
          />
          <h4 className="text-xl mb-2">Contact</h4>
          <p>Department of Computer Science and Engineering</p>
          <p>
            <strong>Address:</strong> Science Complex University of Dhaka,
            Dhaka-1000
          </p>
          <p>
            <strong>Phone:</strong> +880 2 9670734
          </p>
          <p>
            <strong>Hours:</strong> 10:00-18:00, Mon - Sat
          </p>
        </div>

        {/* Column 2 */}
        <div>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.522542962631!2d90.39650797529066!3d23.728738578685192!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8ef3976bbbd%3A0x1b3140066a1d7bb8!2sDepartment%20of%20Computer%20Science%20and%20Engineering%2C%20University%20of%20Dhaka!5e0!3m2!1sen!2sbd!4v1682705931558!5m2!1sen!2sbd"
              className="w-full h-full"
              style={{ border: "0" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="mt-4">
            <h4 className="text-xl mb-2">Follow us</h4>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/Dept.CSE.DU/" target="_blank" rel="noopener noreferrer">
                <FaFacebookF />
              </a>
              <a href="https://x.com/lrtajvirsingh?mx=2" target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </a>
              <a href="https://www.instagram.com/explore/locations/422219917/department-of-computer-science-engineering-university-of-dhaka---csedu/" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
              <a href="https://www.youtube.com/watch?v=FhWrTOKBNNE&ab_channel=AbdullahArean" target="_blank" rel="noopener noreferrer">
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>

        {/* Column 3 */}
        <div className="flex flex-col">
          <h4 className="text-xl mb-2">About</h4>
          <a href="./#">About us</a>
          <a href="./#">Privacy Policy</a>
          <a href="./#">Term & Conditions</a>
          <a href="./#">Contact Us</a>
          <a href="./#">Help</a>
        </div>

        {/* Column 4 */}
        <div className="install">
          <h4 className="text-xl mb-2">Install App</h4>
          <p>From App Store or Google Play</p>
          <div className="flex space-x-4 items-center mt-4">
            <img src="/Img/play.jpg" className="w-16" alt="Play Store" />
            <img src="/Img/app.jpg" className="w-16" alt="App Store" />
          </div>
          <p className="mt-4">Secured Payment Gateways</p>
          <img
            src="/Img/pay.png"
            className="w-32 mt-2"
            alt="Payment Gateways"
          />
        </div>
      </div>

      <div className="text-center mt-8">
        <p>
          @{new Date().getFullYear()} Department of Computer Science and Engineering, University of
          Dhaka, Dhaka, Bangladesh
        </p>
      </div>
    </footer>
  );
};

export default Footer;
