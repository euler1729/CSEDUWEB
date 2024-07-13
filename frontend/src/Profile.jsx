import { Card, Avatar } from 'antd';
import { MdEmail, MdLocationOn, MdPhone } from 'react-icons/md'; 
import useGetUserInfo from './hook/useGetUserInfo';
import { UserOutlined } from '@ant-design/icons';

const { Meta } = Card;

const Profile = () => {
  const [user] = useGetUserInfo();
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card
        className="w-full max-w-sm"
        cover={
          <img
            alt="profile"
            src={`https://via.placeholder.com/150?text=${user.first_name}+${user.last_name}`} // Placeholder image, replace with actual image URL
          />
        }
      >
        <Meta
          avatar={<Avatar icon={<UserOutlined/>} />}
          title={`${user.first_name} ${user.last_name}`}
          description={
            <div>
              <div className="flex items-center mb-2">
                <MdEmail className="text-gray-500 mr-2" />
                <p className="text-sm">{user.email}</p>
              </div>
              <div className="flex items-center mb-2">
                <MdLocationOn className="text-gray-500 mr-2" />
                <p className="text-sm">{user.address}, {user.city}, {user.state}</p>
              </div>
              <div className="flex items-center mb-2">
                <MdPhone className="text-gray-500 mr-2" />
                <p className="text-sm">{user.contact}</p>
              </div>
              <div className="flex items-center mb-2">
                <span className="text-gray-500 mr-2">Role:</span>
                <p className="text-sm">{user.role}</p>
              </div>
            </div>
          }
        />
      </Card>
    </div>
  );
};

export default Profile;
