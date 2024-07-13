import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
export const AuthContest = createContext(null);

const Context = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/logout",
        null,
        {
          withCredentials: true,
        }
      );
      localStorage.removeItem("user");
      console.log(response.data);
      //window.location.href = "/";
      setUser(null); // Assuming the server responds with some data
    } catch (error) {
      console.error("Error logging out:", error);
      //window.location.href = "/";
    }
  };
  const logOut = () => {
    return handleLogout();
  };
  const authInfo = {
    user,
    setUser,
    loading,
    logOut,
  };
  useEffect(() => {
    const checkUser = () => {
      setLoading(true);
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      }
    };
    checkUser();
    if (!user && localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
    setLoading(false);
  }, [user, setUser]);
  if (loading) return <p></p>;
  return (
    <AuthContest.Provider value={authInfo}>{children}</AuthContest.Provider>
  );
};
Context.propTypes = {
  children: PropTypes.object,
};
export default Context;
