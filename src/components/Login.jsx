import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [emailId, setEmailId] = useState("elon@rocky.co"); // initially put for testing
  const [password, setPassword] = useState("Elon@1234");

  const handleLogin=async()=>{
    try{
      const res=await axios.post("http://localhost:3000/login",{
        emailId,password
      },{withCredentials:true});   // to set cookies etc
      console.log(res);
    }catch(err){
      console.log(err.message);
    }
  }
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
          <div className="justify-end card-actions">
            <button className="btn btn-primary mx-4 my-2" onClick={handleLogin}>LOGIN</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
