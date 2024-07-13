import { useState } from "react";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaClock,
} from "react-icons/fa";
import { Button, Form, Input, notification, Spin } from "antd";
import useAxiosPrivate from "./hook/useAxiosPrivate";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const axios = useAxiosPrivate()
  const handleSubmit = async (values) => {
    setLoading(true);
    console.log("Form values", values);
    const res = await axios.post("http://localhost:8000/message/add",values);
    setLoading(false);
    if (res.ok) {
      notification.success({
        message: "Message Sent",
        description: "Your message has been sent successfully.",
      });
    }
  };

  return (
    <div className="mx-20 py-10 space-y-10 ">
      <div className="flex justify-between p-6">
        <div>
          <span className="text-xl font-semibold">GET IN TOUCH</span>
          <h2 className="text-2xl mt-2 mb-4">
            Visit Our Locations or Contact Us Today
          </h2>
          <h3 className="text-xl mb-2">Office</h3>
          <ul>
            <li className="flex items-center mb-2">
              <FaMapMarkerAlt className="mr-2" />
              <p>Science Complex University of Dhaka, Dhaka-1000</p>
            </li>
            <li className="flex items-center mb-2">
              <FaEnvelope className="mr-2" />
              <p>sample@gmail.com</p>
            </li>
            <li className="flex items-center mb-2">
              <FaPhoneAlt className="mr-2" />
              <p>+880 2 9670734</p>
            </li>
            <li className="flex items-center mb-2">
              <FaClock className="mr-2" />
              <p>Monday to Saturday: 9.00 to 16:00</p>
            </li>
          </ul>
        </div>
        <div className="mt-6 w-2/5">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.522542962631!2d90.39650797529066!3d23.728738578685192!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8ef3976bbbd%3A0x1b3140066a1d7bb8!2sDepartment%20of%20Computer%20Science%20and%20Engineering%2C%20University%20of%20Dhaka!5e0!3m2!1sen!2sbd!4v1682705931558!5m2!1sen!2sbd"
            width="100%"
            height="300"
            style={{ border: 0 }}
            className="rounded-lg"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      <div className=" p-6 bg-gray-100 rounded-lg mt-6 lg:mt-0">
        <div className="ml-20">
          <span className="text-xl font-semibold">LEAVE A MESSAGE</span>
          <h2 className="text-2xl mt-2 mb-4">We love to hear from you</h2>
        </div>
        <div className="flex justify-evenly ">
          <Form
            className="w-3/5 space-y-4"
            onFinish={handleSubmit}
            layout="vertical"
          >
            <Form.Item
              name="name"
              label="Your Name"
              rules={[{ required: true, message: "Please enter your name" }]}
            >
              <Input placeholder="Your Name" />
            </Form.Item>
            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input placeholder="E-mail" />
            </Form.Item>
            <Form.Item
              name="subject"
              label="Subject"
              rules={[{ required: true, message: "Please enter a subject" }]}
            >
              <Input placeholder="Subject" />
            </Form.Item>
            <Form.Item
              name="message"
              label="Your Message"
              rules={[{ required: true, message: "Please enter your message" }]}
            >
              <Input.TextArea rows={8} placeholder="Your Message" />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full flex justify-center items-center"
                disabled={loading}
              >
                {loading ? <Spin /> : "Submit"}
              </Button>
            </Form.Item>
          </Form>
          <div className=" space-y-4 ">
            <div className="flex items-center space-x-4  border-2  py-4 px-5 bg-white rounded-lg">
              <img
                src="/Img/razaak.jpeg"
                alt="President"
                className="w-16 h-16 rounded-full"
              />
              <p>
                <span className="font-semibold"></span>
                <br />
                Charimain of CSEDU
                <br />
                Email: charimain@cse.du.ac.bd
              </p>
            </div>
            <div className="flex items-center space-x-4  border-2 bg-white rounded-lg  py-4 px-5">
              <img
                src="/Img/tanvir.jpeg"
                alt="Student Advisior"
                className="w-16 h-16 rounded-full"
              />
              <p>
                <span className="font-semibold">Md. Tanvir Alam</span>
                <br />
                Student Advisior
                <br />
                Email: tanvir@cse.du.ac.bd
              </p>
            </div>
            <div className="flex items-center space-x-4  border-2 bg-white rounded-lg px-5 py-4">
              <img
                src="/Img/profile.jpg"
                alt="Secretary"
                className="w-16 h-16 rounded-full"
              />
              <p>
                <span className="font-semibold">Dipto Shaha</span>
                <br />
                Student Reprentative
                <br />
                Phone: 01770891974
                <br />
                Email: diptoshaha2635@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
