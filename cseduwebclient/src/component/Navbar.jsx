import { Button } from "antd";
import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";
import NavberProfile from "./NavberProfile";
import useGetUserInfo from "../hook/useGetUserInfo";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [openSubNav, setOpenSubNav] = useState(null);
  const [user, , loading] = useGetUserInfo();
  const handleNav = () => {
    setNav(!nav);
  };

  const toggleSubNav = (id) => {
    if (openSubNav === id) {
      setOpenSubNav(null);
    } else {
      setOpenSubNav(id);
    }
  };

  const navItems = [
    { id: 1, text: "Home", path: "/" },
    { id: 2, text: "About", path: "/about" },
    { id: 3, text: "Academic", path: "/academic" },
    {
      id: 4,
      text: "People",
      path: "/people",
      subItems: [
        { id: 5, text: "Faculty", path: "/people/faculty" },
        { id: 6, text: "Staff", path: "/people/staff" },
      ],
    },
    { id: 7, text: "News", path: "/news" },
    { id: 8, text: "Events", path: "/events" },
    { id: 9, text: "Research", path: "/research" },
    { id: 11, text: "Club", path: "/club" },
    { id: 12, text: "Contact", path: "/contact" },
  ];

  return (
    <div className="bg-[#d2dde2] z-50 flex justify-between items-center h-20 mx-auto px-4 text-[#000] relative">
      {/* Logo */}
      <img
        src="https://i.ibb.co/VwJ6FWY/CSEDULogo-removebg-preview.png"
        className="w-20 h-20"
        alt="Logo"
      />
      <h1 className="w-full text-3xl font-bold text-[#000]">CSEDU</h1>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center">
        <ul className="flex space-x-4">
          {navItems.map((item) =>
            item.subItems ? (
              <li key={item.id} className="relative group mt-2">
                <span className="cursor-pointer p-2 hover:text-[#EDB516]">
                  {item.text}
                </span>
                <ul className="absolute left-0 top-full hidden bg-[#d2dde2] rounded-lg shadow-lg group-hover:block">
                  {item.subItems.map((subItem) => (
                    <li
                      key={subItem.id}
                      className="p-2 hover:bg-gray-200 rounded-lg"
                    >
                      <Link to={subItem.path}>{subItem.text}</Link>
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              <li key={item.id} className="p-2 hover:text-[#EDB516]">
                <Link to={item.path}>{item.text}</Link>
              </li>
            )
          )}
        </ul>
        {!loading && (
          <div>
            {!user ? (
              <Link to="/login" onClick={handleNav}>
                <Button>Log In</Button>
              </Link>
            ) : (
              <NavberProfile user={user} loading={loading} />
            )}
          </div>
        )}
      </div>

      {/* Mobile Navigation Icon */}
      <div onClick={handleNav} className="block md:hidden">
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`fixed md:hidden top-0 right-0 w-[60%] h-full bg-[#d2dde2] ease-in-out duration-500 transform ${
          nav ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <ul className="flex flex-col items-center justify-center h-full">
          {/* Close Button */}
          <li className="p-4 w-full text-center font-bold hover:text-[#EDB516] cursor-pointer">
            <AiOutlineClose size={20} onClick={handleNav} />
          </li>
          {navItems.map((item) =>
            item.subItems ? (
              <li key={item.id} className="bg-red-500 w-full text-center">
                <span
                  className="block font-bold hover:text-[#EDB516] cursor-pointer"
                  onClick={() => toggleSubNav(item.id)}
                >
                  {item.text}
                </span>
                {openSubNav === item.id && (
                  <ul className="mt-2">
                    {item.subItems.map((subItem) => (
                      <li
                        key={subItem.id}
                        className="py-1 hover:text-[#EDB516]"
                      >
                        <Link to={subItem.path} onClick={handleNav}>
                          {subItem.text}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ) : (
              <li
                key={item.id}
                className="p-4 w-full text-center font-bold hover:text-[#EDB516]"
              >
                <Link to={item.path} onClick={handleNav}>
                  {item.text}
                </Link>
              </li>
            )
          )}
          {!loading && (
            <div>
              {!user ? (
                <Link to="/login" onClick={handleNav}>
                  <Button>Log In</Button>
                </Link>
              ) : (
                <NavberProfile user={user} loading={loading} />
              )}
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
