import { useState } from "react";
import { Form, Input, Button, Select, message } from "antd";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from '../hook/useAxiosPrivate';
import handleAddAlumni from "../hook/user/handleAddAlumni";

const { Option } = Select;

const AddAlumni = () => {
  const [form] = Form.useForm();
  const axios = useAxiosPrivate();
  const navigate = useNavigate();

  const handleFinish = async (values) => {
    const alumniInfo = {
      student_id: values.student_id,
      industry: values.industry,
      current_position: values.current_position,
      company: values.company,
      experience: values.experience,
      linkedin: values.linkedin,
      achievements: values.achievements,
      skills: values.skills,
    };

    const res = await handleAddAlumni(axios, alumniInfo);
    if (res.success) {
      message.success("Alumni Profile Added");
      navigate('/dashboard/users');
    } else {
      message.error("Something went wrong");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-5 border border-gray-300 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-5 text-center">Alumni Information Form</h2>
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          name="student_id"
          label="Student ID"
          rules={[{ required: true, message: "Please enter the student ID" }]}
        >
          <Input placeholder="Enter student ID" />
        </Form.Item>

        <Form.Item
          name="industry"
          label="Industry"
          rules={[{ required: true, message: "Please enter the industry" }]}
        >
          <Input placeholder="Enter industry" />
        </Form.Item>

        <Form.Item
          name="current_position"
          label="Current Position"
          rules={[{ required: true, message: "Please enter the current position" }]}
        >
          <Input placeholder="Enter current position" />
        </Form.Item>

        <Form.Item
          name="company"
          label="Company"
          rules={[{ required: true, message: "Please enter the company" }]}
        >
          <Input placeholder="Enter company" />
        </Form.Item>

        <Form.Item
          name="experience"
          label="Experience"
          rules={[{ required: true, message: "Please enter the experience in years" }]}
        >
          <Input type="number" placeholder="Enter experience in years" />
        </Form.Item>

        <Form.Item
          name="linkedin"
          label="LinkedIn"
          rules={[{ required: true, message: "Please enter the LinkedIn profile" }]}
        >
          <Input placeholder="Enter LinkedIn profile URL" />
        </Form.Item>

        <Form.Item
          name="achievements"
          label="Achievements"
          rules={[{ required: true, message: "Please enter achievements" }]}
        >
          <Select mode="tags" placeholder="Enter achievements">
            <Option value="Award1">Award1</Option>
            <Option value="Award2">Award2</Option>
            {/* Add more options as needed */}
          </Select>
        </Form.Item>

        <Form.Item
          name="skills"
          label="Skills"
          rules={[{ required: true, message: "Please enter skills" }]}
        >
          <Select mode="tags" placeholder="Enter skills">
            <Option value="Skill1">Skill1</Option>
            <Option value="Skill2">Skill2</Option>
            {/* Add more options as needed */}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddAlumni;
