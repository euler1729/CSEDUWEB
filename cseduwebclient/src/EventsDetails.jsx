import  { useState } from "react";
import { useParams } from "react-router-dom";
import useGetSingleEvents from "./hook/Events/useGetSingleEvents";
import { FaLocationDot } from "react-icons/fa6";
import { Button, Modal, Form, Input } from "antd";
import useGetUserInfo from "./hook/useGetUserInfo";
import { toast } from "react-toastify";
import useAxiosPrivate from "./hook/useAxiosPrivate";
import handleEventRegistation from "./hook/Events/handleEventRegistration";

const EventsDetails = () => {
  const { id } = useParams();
  const [events] = useGetSingleEvents(id);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [user,]= useGetUserInfo();
  const showModal = () => {
    if(!user) 
    {
        toast.error("You have to login to register");
        return;
    }
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const axios = useAxiosPrivate();

  const onFinish = async(values) => {
    console.log('Form values: ', values);
    const registerData ={
        "amount": values.amount,
        "comment": values.comment,
        "email": values.email,
        "event_id": id,
        "name": values.first_name+" "+values.last_name,
        "phone": values.contact,
        "status": "pending",
        "trxId": values.trxId,
        "user_id": user.id
    }
    const res = await handleEventRegistation(axios,id,registerData);
    if(res){
      toast.success("Success, You will get a confirmation maill");
    }
    else toast.error("Somthing went wrong");
    setIsModalVisible(false);
  };

  return (
    <>
      <div className="px-5 py-2 shadow-lg w-full">
        <div className="pr-4">
          <img
            src={events?.photo}
            className="rounded-lg w-full max-h-[500px]"
            alt="Events Photo"
          />
        </div>
        <div className="p-2 mx-10">
          <p>{events.date}</p>
          <p className="text-2xl font-semibold">{events.event_title}</p>
          <p>{events.description}</p>
          <p>Time: {events.date_and_time}</p>
          <p className="flex items-center space-x-4">
            <FaLocationDot /> {events.venue}
          </p>
          <Button onClick={showModal}>Register</Button>
        </div>
      </div>
      <Modal
        title="Event Registration"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            label="Email"
            initialValue={user?.email}
            rules={[{ required: true, message: 'Please input your email!' }, { type: 'email', message: 'Please enter a valid email!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="name"
            label="Name"
            initialValue={user?.first_name+" "+ user?.last_name}
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            initialValue={user?.contact}
            rules={[{ required: true, message: 'Please input your phone number!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="trxId"
            label="Transaction ID"
            initialValue="123456"
            rules={[{ required: true, message: 'Please input the transaction ID!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="amount"
            label="Amount"
            initialValue={1000}
            rules={[{ required: true, message: 'Please input the amount!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="comment"
            label="Comment"
            rules={[{ required: false, message: 'Please input your comment!' }]}
          >
            <Input placeholder="Write your comment"/>
         </Form.Item>
         <Form.Item>
            <Button type="primary" htmlType="submit">Submit</Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EventsDetails;
