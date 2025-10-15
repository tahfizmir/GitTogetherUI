import Footer from "./Footer";
import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { addUser } from "../utils/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = useSelector((store) => store.user);

 

  const fetchUser = async () => {
    if (userData) return;
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      if (err.response.status === 401) {
        navigate("/login");
      }
       navigate("/login");
      console.error(err);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
