import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {

  let Navigate = useNavigate();
  const [credentials, setcredentials] = useState({Name:"", Email:"", password:"", Confirmpassword:""})

  const onChange = (e)=>{
    setcredentials({...credentials, [e.target.name]: e.target.value})
  }
  
  const handleSubmit = async (e)=> {
    const {Name, Email, password} = credentials
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
          method: "POST", 
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({Name, Email, password}), 
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
    <div>
     <form onSubmit={handleSubmit}>
     <div className="mb-3 my-3">
    <label htmlFor="Name" className="form-label">Name</label>
    <input type="text" onChange={onChange} name='Name' className="form-control" id="Name" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="Email" className="form-label">Email address</label>
    <input type="email" className="form-control" name='Email' onChange={onChange} id="Email" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" onChange={onChange} name='password' className="form-control" id="new-password"/>
  </div>
  <div className="mb-3">
    <label htmlFor="Confirmpassword" className="form-label">Confirm Password</label>
    <input type="password" onChange={onChange} name='Confirmpassword' className="form-control" id="Confirmpassword"/>
  </div>

  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Signup
