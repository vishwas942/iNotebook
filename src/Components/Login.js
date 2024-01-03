import React, { useState } from "react";

import { useNavigate } from "react-router-dom";


const Login = () => {
  
  
  
 let Navigate = useNavigate();

const [credentials, setcredentials] = useState({Email:"", password:""})
 
const onChange = (e)=>{
  setcredentials({...credentials, [e.target.name]: e.target.value})
}

const handleSubmit = async (e)=> {
      e.preventDefault();
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({Email: credentials.Email, password: credentials.password}), 
});
const json = await response.json();
console.log(json);
if(json.success){

  //redirect  
  localStorage.setItem('token', json.authtoken);
  Navigate("/");
} else{
  alert("invalid credentials");
}
}



  return (
    <div className="container w-50 mt-5">
      <form  onSubmit={handleSubmit} >
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input type="email" className="form-control"
            id="email"
            onChange={onChange}
            value={credentials.Email}
            name="Email"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            onChange={onChange}
            className="form-control"
            value={credentials.password}
            name="password"
            id="password"
          />
        </div>
        <button type="submit" className="btn btn-primary" >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
