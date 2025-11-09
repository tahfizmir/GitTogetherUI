import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
const Signup = () => {
  const [emailId, setEmailId] = useState(""); // initially put for testing
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("test");
  const [lastName, setLastName] = useState("test");
  const [age, setAge] = useState(20);
  const [gender, setGender] = useState("other");
  const [showToast,setShowToast]=useState(false);
  const [showError,setShowError]=useState(false);
  const [errorMessage,setErrorMessage]=useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { emailId, password , firstName,lastName, age, gender},
        { withCredentials: true }
      );

      console.log("res signup : ", res);
      setShowToast(true);
      setTimeout(()=>{
        setShowToast(false);
          navigate("/login");
      },1000);
    
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.response?.data ||
        err.message ||
        "Signup failed";
      setErrorMessage(typeof msg === "string" ? msg : JSON.stringify(msg));
      setShowError(true);
    }
  };
  return (
    <div className="flex justify-center justify-evenly mb-20">
      <div className="card w-96 bg-base-100 card-l shadow-sm my-15 border-1 shadow-2xl ">
        <div className="card-body shadow-2xl">
          <h2 className="card-title">Fill your details</h2>
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Enter your first name</legend>
              <input
                type="text"
                value={firstName}
                className="input"
                placeholder="First name"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Enter your last name</legend>
              <input
                type="text"
                value={lastName}
                className="input"
                placeholder="Last name"
                onChange={(e) => setLastName(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Enter your age</legend>
              <input
                type="number"
                value={age}
                className="input no-spinner"
                placeholder="Age"
                onChange={(e) => setAge(e.target.value)}
              />
            </fieldset>
            <fieldset>
              <legend className="fieldset-legend">Enter your gender</legend>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="input"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </fieldset>
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
            <button
              className="btn btn-primary mx-4 my-2"
              onClick={handleSignUp}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
      {showToast && <div className="toast toast-top toast-center">
        <div className="alert alert-success">
          <span>Signed up successfully.</span>
        </div>
      </div>}
    </div>
  );
};

export default Signup;
