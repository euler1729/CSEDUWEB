import { Link, Outlet, useLocation } from "react-router-dom";
import {
  SnippetsOutlined,
  AuditOutlined,
  AppstoreAddOutlined,
  UserOutlined,
  HomeOutlined,
  BookOutlined,
  UserAddOutlined,
  BlockOutlined,
} from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CiLogout } from "react-icons/ci";
import { Layout, Menu, theme } from "antd";
// import { useContext } from "react";
// import { AuthContest } from "./Context";
const { Header, Content, Footer, Sider } = Layout;
import { useNavigate } from "react-router-dom";
import handleLogout from "../hook/handleLogout";
import useGetUserInfo from "../hook/useGetUserInfo";

// const user ={ name:"Dipto", role:"Admin",email:"dip@gmail.com", image:"adfa"}
const itemsList = {
  "Admin": [
    {
      icon: <SnippetsOutlined></SnippetsOutlined>,
      label: "Dashboard",
      link: "/dashboard",
    },
    {
      icon: <HomeOutlined></HomeOutlined>,
      label: "Home",
      link: "/",
    },
    {
      icon: <AuditOutlined></AuditOutlined>,
      label: "Events",
      link: "/dashboard/event",
    },
    {
      icon: <AppstoreAddOutlined></AppstoreAddOutlined>,
      label: "News",
      link: "/dashboard/news",
    },
    {
      icon: <UserOutlined></UserOutlined>,
      label: "Users",
      link: "/dashboard/users",
    },
    {
      icon: <BookOutlined></BookOutlined>,
      label: "Publications",
      link: "/dashboard/publications",
    },
    {
      icon: <UserAddOutlined></UserAddOutlined>,
      label: "Add User",
      link: "/dashboard/adduser",
    },
    {
      icon: <BlockOutlined></BlockOutlined>,
      label: "Add Publications",
      link: "/dashboard/add-publication",
    },
    {
      icon: <UserAddOutlined></UserAddOutlined>,
      label: "Message",
      link: "/dashboard/message",
    }
    
  ]
};
const Dashboard = () => {
  const [ user,,loading ] = useGetUserInfo();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  function renderAvatar() {
    if (user.photo) {
      return <div> <img src={user.photo} width={42} height={42} alt="avatar" className="rounded-full" /></div>;
    } else {
      const initial = user.first_name?.charAt(0)?.toUpperCase();
      return (
        <div className={`w-10 h-10 rounded-full bg-[#216a70] flex items-center justify-center text-2xl text-white`}>
          {initial}
        </div>
      );
    }
  }
  const handleLogoutInCode = async () => {
     // console.log("fuck")
      const res = await handleLogout();
      if(res.success){
        navigate("/");
        toast.success("LogOut Successfully")
      }
      else toast.error("Something went wrong!.Try again");
  };
  return (
    <div>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce
      />
      <Layout className=" min-h-screen text-gray-100">
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <div className="flex flex-col justify-between h-full">
            <div className="p-4">
              <div className="flex items-center mb-5">
                {renderAvatar()}
                <div className="ml-2">
                  <p className="font-bold">{ !loading ? (user?.first_name +" "+ user?.last_name): ""} </p>
                  <p className=" capitalize ">{user?.role}</p>
                  {/* <p className="text-gray-600">{user.email}</p> */}
                </div>
              </div>
              <div className="demo-logo-vertical" />
              <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={[location.pathname]}
              >
                {itemsList['Admin'].map((item, index) => (
                  <Menu.Item key={index + 1} icon={item.icon}>
                    <Link to={item.link}>{item.label}</Link>
                  </Menu.Item>
                ))}
              </Menu>
            </div>
            <div className="p-4">
              <div className="flex justify-center  font-medium items-center">
                <CiLogout></CiLogout>
                <button className=" ml-2 btn" onClick={handleLogoutInCode}>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </Sider>
        <Layout>
          <Header
            style={{
              padding: "10px",
              background: colorBgContainer,
            }}
          >
            <p className=" text-gray-600 -mt-2">
              </p>
            <div className=" flex items-center justify-end mt-2 px-6 sm:py-1 lg:gap-x-2 font-bold text-xl sm:text-sm align-center w-full mb-5">
              <img
                className="w-14 h-10 -mt-2"
                src="https://i.ibb.co/tKTXhQ6/CSEDULogo.png"
              ></img>
              
            </div>
          </Header>
          <Content
            style={{
              margin: "24px 16px 0",
            }}
            className="flex"
          >
            <div
              style={{
                padding: 24,

                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
              className=" flex-grow "
            >
              <Outlet></Outlet>
            </div>
          </Content>
          <Footer
            style={{
              textAlign: "center",
            }}
          >
            ©{new Date().getFullYear()} Department of Computer Science and Engineering, University of Dhaka, Dhaka, Bangladesh
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
};

export default Dashboard;