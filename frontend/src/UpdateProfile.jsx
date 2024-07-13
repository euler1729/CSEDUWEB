import { Form, Input, Button, Card, Spin, Upload, Avatar } from 'antd';
import { UserOutlined, UploadOutlined } from '@ant-design/icons';
import useGetUserInfo from './hook/useGetUserInfo';

const UpdateProfile = () => {
  const [user, setUser, loading] = useGetUserInfo();
  
  const onFinish = (values) => {
    // Update user information with the new values
    const updatedUser = { ...user, ...values };
    setUser(updatedUser);
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className='flex justify-center shadow-lg bg-gray-200'>
      <div className="grid items-center rounded-lg my-10 max-w-[500px]">
        <Card className="w-full">
          <Form
            name="profileUpdate"
            initialValues={{
              first_name: user.first_name,
              last_name: user.last_name,
              email: user.email,
              address: user.address,
              contact: user.contact,
              city: user.city,
              state: user.state,
              role: user.role,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
          >
            <Form.Item className="text-center">
              <Avatar size={100} icon={<UserOutlined />} src={user.profilePicture} />
            </Form.Item>

            <div className="grid grid-cols-2 gap-x-4">
              <Form.Item
                label="First Name"
                name="first_name"
                rules={[{ required: true, message: 'Please input your first name!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Last Name"
                name="last_name"
                rules={[{ required: true, message: 'Please input your last name!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
              >
                <Input readOnly />
              </Form.Item>

              <Form.Item
                label="Address"
                name="address"
                rules={[{ required: true, message: 'Please input your address!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Contact"
                name="contact"
                rules={[{ required: true, message: 'Please input your contact number!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="City"
                name="city"
                rules={[{ required: true, message: 'Please input your city!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="State"
                name="state"
                rules={[{ required: true, message: 'Please input your state!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Role"
                name="role"
              >
                <Input readOnly />
              </Form.Item>
            </div>

            <Form.Item
              label="Profile Picture"
              name="profilePicture"
            >
              <Upload
                listType="picture"
                maxCount={1}
                beforeUpload={() => false} 
              >
                <Button icon={<UploadOutlined />}>Upload Profile Picture</Button>
              </Upload>
            </Form.Item>

            <Form.Item className="text-center">
              <Button type="primary" htmlType="submit">
                Update Profile
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default UpdateProfile;
