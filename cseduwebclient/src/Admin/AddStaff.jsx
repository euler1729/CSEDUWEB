import { useState } from "react";
import { Form, Input, Button, Upload, Select, message, Modal } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import uploadImage from "../hook/uploadImage";
import useAxiosPrivate from '../hook/useAxiosPrivate';
import { PlusOutlined } from '@ant-design/icons';
import handleAddStaff from "../hook/user/handleAddStaff";

const { Option } = Select;

const AddStaff = () => {
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

    const staffInfo = {
      user_id: id,
      about: values.about,
      designation: values.designation,
      current_status: values.current_status,
      photo: await uploadImage(fileList[0].originFileObj)
    };
    
    const res = await handleAddStaff(axios, staffInfo);
    if(res.success) {
      message.success("Staff Profile Added");
      navigate('/dashboard/users');
    } else {
      message.error("Something went wrong");
    }
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
      <h2 className="text-2xl font-bold mb-5 text-center">Staff Information Form</h2>
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
            <Option value="Manager">Manager</Option>
            <Option value="Assistant Manager">Assistant Manager</Option>
            <Option value="Team Leader">Team Leader</Option>
            <Option value="Staff">Staff</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="current_status"
          label="Current Status"
          rules={[{ required: true, message: "Please select your current status" }]}
        >
          <Select placeholder="Select your current status">
            <Option value="Active">Active</Option>
            <Option value="On Leave">On Leave</Option>
            <Option value="Resigned">Resigned</Option>
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

export default AddStaff;
