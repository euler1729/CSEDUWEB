import { Form, Input, Button, Select } from "antd";
import { useState } from "react";
import handleAddUser from "../hook/user/handleAddUser";
import useAxiosPrivate from '../hook/useAxiosPrivate';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const AddUser = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const axios = useAxiosPrivate();
  const navigate = useNavigate();
  const onFinish = async(values) => {
    setLoading(true);
    const res = await handleAddUser(axios,values);
    if(res.success) {
       toast.success("User Added Successfully");
       if(values.role=="teacher")
          navigate(`/dashboard/add-teacher/${res.data.id}`);
        else if(values.role=="student")
          navigate(`/dashboard/add-student/${res.data.id}`);
        else if(values.role=="alumni")
          navigate(`/dashboard/add-alumni/${res.data.id}`);
        else if(values.role=="staff")
          navigate(`/dashboard/add-staff/${res.data.id}`);
        else
          navigate('/dashboard/users');
    }
    setLoading(false);

  };

  // Custom validator function to check if confirm password matches password
  const validateConfirmPassword = ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue("password") === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error("The two passwords do not match"));
    },
  });

  return (
    <><Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        role: "admin", // Default role
      }}
    >
      <div className="grid grid-cols-2 gap-x-3 gap-y-2 ">
        <Form.Item
          label="First Name"
          name="first_name"
          rules={[{ required: true, message: "Please enter first name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="last_name"
          rules={[{ required: true, message: "Please enter last name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Contact"
          name="contact"
          rules={[{ required: true, message: "Please enter contact number" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please enter password" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          rules={[
            { required: true, message: "Please enter confirm password" },
            validateConfirmPassword,
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: "Please enter address" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="City"
          name="city"
          rules={[{ required: true, message: "Please enter city" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="State"
          name="state"
          rules={[{ required: true, message: "Please enter state" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Role"
          name="role"
          rules={[{ required: true, message: "Please select a role" }]}
        >
          <Select  placeholder="Select a Role">
            <Option value="admin">Admin</Option>
            <Option value="alumni">Alumni</Option>
            <Option value="teacher">Teacher</Option>
            <Option value="student">Student</Option>
            <Option value="staff">Staff</Option>
          </Select>
        </Form.Item>
      </div>
      <div className="items-center flex justify-center mt-10">
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="w-80 py-5 rounded-2xl"
          >
            Create User
          </Button>
        </Form.Item>
      </div>
    </Form>
     
    </>

  );
};

export default AddUser;
