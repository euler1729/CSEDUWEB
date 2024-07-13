import { useState } from 'react';
import PropTypes from 'prop-types';
import { Menu, Dropdown, Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { GrUpdate } from 'react-icons/gr';
import handleLogout from '../hook/handleLogout';
import { useNavigate } from 'react-router-dom';

const { Item, Divider } = Menu;

const NavberProfile = ({ user,loading }) => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  
  const handleMenuClick = async (e) => {
    if (e.key === 'logout') {
      await handleLogout();
      navigate('/');
    }
    else if(e.key==='dashboard'){
      navigate('/dashboard');
    }
    else if(e.key==='profile')
      navigate('/profile')
    else navigate('/update')
    setVisible(false);
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Item key="profile">Profile</Item>
      <Divider />
      {user.role=="admin" && <><Item key="updateProfile" icon={<GrUpdate />}>
        Update Profile
      </Item>
      <Divider /></>}
      <Item key="dashboard" icon={<LogoutOutlined />}>
        Dashboard
      </Item>
      <Divider />
      <Item key="logout" icon={<LogoutOutlined />}>
        Log out
      </Item>
    </Menu>
  );

  function renderAvatar() {
    if (user.photo) {
      return <img src={user.photo} width={42} height={42} alt="avatar" className="rounded-full" />;
    } else {
      const initial = user.first_name?.charAt(0)?.toUpperCase();
      return (
        <div className={`w-10 h-10 rounded-full bg-[#216a70] flex items-center justify-center text-2xl text-white`}>
          {initial}
        </div>
      );
    }
  }

  return (
    <Dropdown
      overlay={menu}
      trigger={['click']}
      open={visible}
      onOpenChange={(flag) => setVisible(flag)}
    >
      <Button className="flex items-center border-[1px] border-[#14264c] py-6" type="text">
        {renderAvatar()}
        <div className="ml-2">
          <p className="text-sm font-semibold capitalize">{!loading ? (user.first_name + " " + user.last_name) : "        "} </p>
          <p className="text-xs text-gray-500 capitalize">{user.role}</p>
        </div>
      </Button>
    </Dropdown>
  );
};

NavberProfile.propTypes = {
  user: PropTypes.shape({
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    photo: PropTypes.string,
    role: PropTypes.string.isRequired
  }).isRequired
};

export default NavberProfile;
