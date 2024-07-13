import { useState } from "react";
import {
  Form,
  Input,
  Button,
  Upload,
  message,
  DatePicker,
  TimePicker,
  Modal,
  Radio,
  Checkbox,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import uploadImage from "../hook/uploadImage";
import handleEventsPost from "../hook/Events/handleEventPost";
import useAxiosPrivate from "../hook/useAxiosPrivate";

const { TextArea } = Input;

const CreateEventForm = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [previewImage, setPreviewImage] = useState("");
  const [previewVisible, setPreviewVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [audienceType, setAudienceType] = useState("public");
  const axios = useAxiosPrivate();

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };
  const createAudienceValue = (audience_roles) => {
    let val = 0;
    if (audience_roles.includes("admin")) val |= 1; // 0001
    if (audience_roles.includes("student")) val |= 2; // 0010
    if (audience_roles.includes("alumni")) val |= 4; // 0100
    if (audience_roles.includes("teacher")) val |= 8; // 1000
    return val;
  };

  const handleCancel = () => setPreviewVisible(false);
  const handleSubmit = async (values) => {
    if (fileList.length === 0) {
      message.error("Please upload an image.");
      return;
    }
    setLoading(true);
    const newEvent = {
      photo: await uploadImage(fileList[0].originFileObj),
      date: values.date.format("YYYY-MM-DD"),
      date_and_time: values.time.format("HH:mm"),
      description: values.description,
      event_title: values.title,
      venue: values.venue,
      allowed_roles:
        audienceType === "private"
          ? createAudienceValue(values.audience_roles)
          : 0,
    };
    console.log(newEvent);
    const res = await handleEventsPost(axios, newEvent);
    if (res) {
      setFileList([]);
      form.resetFields();
      message.success("Events created successfully!");
    }
    setLoading(false);
  };

  const handleFileChange = ({ fileList }) => {
    setFileList(fileList);
    if (fileList.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(fileList[0].originFileObj);
    }
  };

  return (
    <div className="flex justify-center bg-gray-100">
      <div className="max-w-xl w-full p-6 m-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Create New Event
        </h2>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please input the title!" }]}
          >
            <Input placeholder="Event Title" />
          </Form.Item>

          <div className="flex justify-between">
            <Form.Item
              name="date"
              label="Date"
              className="w-1/2 mr-2"
              rules={[{ required: true, message: "Please select the date!" }]}
            >
              <DatePicker className="w-full" placeholder="Select Date" />
            </Form.Item>
            <Form.Item
              name="time"
              label="Time"
              className="w-1/2"
              rules={[{ required: true, message: "Please input the time!" }]}
            >
              <TimePicker
                className="w-full"
                format="HH:mm"
                placeholder="Select Time"
              />
            </Form.Item>
          </div>

          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: "Please input the description!" },
            ]}
          >
            <TextArea
              rows={4}
              placeholder="Write down the Event Description Here"
            />
          </Form.Item>

          <Form.Item
            name="venue"
            label="Venue"
            rules={[{ required: true, message: "Please input the venue!" }]}
          >
            <Input placeholder="Choose a Venue for the event" />
          </Form.Item>
          <div className="flex justify-between">
            <Form.Item
              name="audience_type"
              label="Audience Type"
              rules={[
                { required: true, message: "Please select audience type!" },
              ]}
            >
              <Radio.Group
                onChange={(e) => setAudienceType(e.target.value)}
                value={audienceType}
              >
                <Radio value="public">Public</Radio>
                <Radio value="private">Private</Radio>
              </Radio.Group>
            </Form.Item>

            {audienceType === "private" && (
              <Form.Item
                name="audience_roles"
                label="Audience Roles"
                rules={[
                  {
                    required: true,
                    message: "Please select at least one role!",
                  },
                ]}
              >
                <Checkbox.Group>
                  <Checkbox value="admin">Admin</Checkbox>
                  <Checkbox value="student">Student</Checkbox>
                  <Checkbox value="alumni">Alumni</Checkbox>
                  <Checkbox value="teacher">Teacher</Checkbox>
                </Checkbox.Group>
              </Form.Item>
            )}
            <Form.Item
              name="image"
              label="Photo"
              rules={[{ required: true, message: "Please upload an image!" }]}
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
          </div>
          <div className="flex justify-center min-w-[200px] ">
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="w-80 py-5 rounded-2xl"
              >
                Create Event
              </Button>
            </Form.Item>
          </div>
          <Modal
            open={previewVisible}
            title="Image Preview"
            footer={null}
            onCancel={handleCancel}
          >
            <img alt="preview" style={{ width: "100%" }} src={previewImage} />
          </Modal>
        </Form>
      </div>
    </div>
  );
};

export default CreateEventForm;
