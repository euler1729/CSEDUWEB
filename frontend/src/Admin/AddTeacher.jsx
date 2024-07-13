import { useState } from "react";
import { Form, Input, Button, Upload, Select, message, Modal } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import uploadImage from "../hook/uploadImage";
import useAxiosPrivate from '../hook/useAxiosPrivate';
import {  PlusOutlined } from '@ant-design/icons';
import handleAddTeacher from "../hook/user/handleAddTeacher";

const { Option } = Select;

const AddTeacher = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const { id } = useParams();
  const axios = useAxiosPrivate();
  const navigate = useNavigate();

  const handleFinish = async (values) => {
    if (fileList.length === 0) {
      message.error('Please upload an image.');
      return;
    }

    const teacherInfo = {
      user_id: id,
      about: values.about,
      designation: values.designation,
      current_status: values.current_status,
      photo: await uploadImage(fileList[0].originFileObj)
    };
    const res = await handleAddTeacher(axios,teacherInfo);
    if(res.success)
    {
      message.success("Teacher Profile Added");
      navigate('/dashboard/users')
    }
    else message.error("something went wrong")
  };

  const handleFileChange = ({ fileList }) => setFileList(fileList);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
  };

  const handleCancel = () => setPreviewVisible(false);

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-5 border border-gray-300 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-5 text-center">Teacher Information Form</h2>
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          name="about"
          label="About"
          initialValue="Doing Nothing!"
          rules={[{ required: true, message: "Please enter about" }]}
        >
          <Input.TextArea placeholder="Tell us about yourself" />
        </Form.Item>

        <Form.Item
          name="designation"
          label="Designation"
          rules={[{ required: true, message: "Please select your designation" }]}
        >
          <Select placeholder="Select your designation">
            <Option value="PROFESSOR & CHAIRMAN">PROFESSOR & CHAIRMAN</Option>
            <Option value="PROFESSOR">PROFESSOR</Option>
            <Option value="ASSOCIATE PROFESSOR">ASSOCIATE PROFESSOR</Option>
            <Option value="ASSISTANT PROFESSOR">ASSISTANT PROFESSOR</Option>
            <Option value="LECTURER">LECTURER</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="current_status"
          label="Current Status"
          rules={[{ required: true, message: "Please select your current status" }]}
        >
          <Select placeholder="Select your current status">
            <Option value="LEAVE">LEAVE</Option>
            <Option value="STUDY LEAVE">STUDY LEAVE</Option>
            <Option value="ONJOB">ONJOB</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="photo"
          label="Photo"
          rules={[{ required: true, message: "Please upload your photo" }]}
        >
          <Upload
          listType="picture-card"
          fileList={fileList}
          beforeUpload={() => false}
          onChange={handleFileChange}
          onPreview={handlePreview}
        >
          {fileList.length >= 1 ? null : (
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          )}
        </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Submit
          </Button>
        </Form.Item>
        <Modal
        open={previewVisible}
        title="Image Preview"
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="preview" style={{ width: '100%' }} src={previewImage} />
      </Modal>
      </Form>
    </div>
  );
};

export default AddTeacher;
