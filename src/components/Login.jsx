import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate,Link } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
const Login = () => {
  const [emailId, setEmailId] = useState(""); // initially put for testing
  const [password, setPassword] = useState("");
  const [showError,setShowError]=useState(false);
  const [errorMessage,setErrorMessage]=useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true }
      );

      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.response?.data ||
        err.message ||
        "Login failed";
      setErrorMessage(typeof msg === "string" ? msg : JSON.stringify(msg));
      setShowError(true);
    }
  };
  return (
    <div className="flex justify-center justify-evenly">
      <div className="card w-96 bg-base-100 card-l shadow-sm my-15 border-1 shadow-2xl ">
        <div className="card-body shadow-2xl">
          <h2 className="card-title">Login to proceed</h2>
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Enter email</legend>
              <input
                type="text"
                value={emailId}
                className="input"
                placeholder="Type your email here."
                onChange={(e) => setEmailId(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Enter password</legend>
              <input
                type="password"
                className="input"
                placeholder="Type your password here."
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </fieldset>
          </div>
             {showError && (
            <div className="mt-3 px-3 py-2 text-sm text-red-700 bg-red-100 border border-red-300 rounded-lg">
              {errorMessage}
            </div>
          )}
          <div className="justify-end card-actions">
            <button className="btn btn-primary mx-4 my-2" onClick={handleLogin}>
              LOGIN
            </button>
          </div>
          <p className="mx-auto">  Not a user?<Link className="text-red-300 hover:underline" to="/signup"> Sign Up here! </Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
