import { useState } from "react";
import { Form, Input, Button, Select, message, DatePicker } from "antd";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from '../hook/useAxiosPrivate';
import handleAddStudent from "../hook/user/handleAddStudent";

const { Option } = Select;

const AddStudent = () => {
  const [form] = Form.useForm();
  const axios = useAxiosPrivate();
  const navigate = useNavigate();

  const handleFinish = async (values) => {
    const studentInfo = {
      user_id: values.user_id,
      student_id: values.student_id,
      enrollment_year: values.enrollment_year.year(),
      graduation_year: values.graduation_year.year(),
      major: values.major,
      minor: values.minor,
      courses: values.courses,
      gpa: values.gpa,
      advisor: values.advisor,
    };

    const res = await handleAddStudent(axios, studentInfo);
    if (res.success) {
      message.success("Student Profile Added");
      navigate('/dashboard/users');
    } else {
      message.error("Something went wrong");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-5 border border-gray-300 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-5 text-center">Student Information Form</h2>
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          name="user_id"
          label="User ID"
          rules={[{ required: true, message: "Please enter the user ID" }]}
        >
          <Input placeholder="Enter user ID" />
        </Form.Item>

        <Form.Item
          name="student_id"
          label="Student ID"
          rules={[{ required: true, message: "Please enter the student ID" }]}
        >
          <Input placeholder="Enter student ID" />
        </Form.Item>

        <Form.Item
          name="enrollment_year"
          label="Enrollment Year"
          rules={[{ required: true, message: "Please select the enrollment year" }]}
        >
          <DatePicker picker="year" placeholder="Select enrollment year" />
        </Form.Item>

        <Form.Item
          name="graduation_year"
          label="Graduation Year"
          rules={[{ required: true, message: "Please select the graduation year" }]}
        >
          <DatePicker picker="year" placeholder="Select graduation year" />
        </Form.Item>

        <Form.Item
          name="major"
          label="Major"
          rules={[{ required: true, message: "Please enter the major" }]}
        >
          <Input placeholder="Enter major" />
        </Form.Item>

        <Form.Item
          name="minor"
          label="Minor"
        >
          <Input placeholder="Enter minor" />
        </Form.Item>

        <Form.Item
          name="courses"
          label="Courses"
          rules={[{ required: true, message: "Please enter the courses" }]}
        >
          <Select mode="tags" placeholder="Enter courses">
            <Option value="CS101">CS101</Option>
            <Option value="MATH203">MATH203</Option>
            <Option value="PHYS101">PHYS101</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="gpa"
          label="GPA"
          rules={[{ required: true, message: "Please enter the GPA" }]}
        >
          <Input placeholder="Enter GPA" />
        </Form.Item>

        <Form.Item
          name="advisor"
          label="Advisor"
          rules={[{ required: true, message: "Please enter the advisor" }]}
        >
          <Input placeholder="Enter advisor" />
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

export default AddStudent;
