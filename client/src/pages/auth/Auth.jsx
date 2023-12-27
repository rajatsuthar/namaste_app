import React, { useState } from "react";
import "./Auth.css";
import Logo from "../../img/logo.png";
import {useDispatch, useSelector} from 'react-redux';
import { logIn, signUp } from "../../actions/Authaction.js";


const Auth = () => {
  const dispatch =useDispatch()
  const loading = useSelector((state)=>state.authReducer.loading);
  const [isSignUp, setIsSignUp] = useState(true);
  console.log(loading);
 

  const [data,setData]=useState({firstname:"",lastname:"",username:"",password:"",confirmpass:""})
  const [confirmPass,setConfirmPass]=useState(true);


  const handleChange=(e)=>{
    setData({...data,[e.target.name]:e.target.value})
  }

  const handleSubmit=(e)=>{
    e.preventDefault();

    if(isSignUp){
      data.password ===data.confirmpass ? dispatch(signUp(data)):setConfirmPass(false);
     
    }
    else{
      dispatch(logIn(data))
    }

  }

  const resetForm=()=>{
    setConfirmPass(true);
    setData({firstname:"",lastname:"",username:"",password:"",confirmpass:""});

  }


  return (
    <div className="Auth">
      {/* -----------------left side------------------------------ */}
      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="Webname">
          <h1>Namaste</h1>
          <h6>Discover the new difference..</h6>
        </div>
      </div>
      {/* --------------------------right side---------------------- */}
      <div className="a-right">
        <form className="infoForm authForm" onSubmit={handleSubmit}>
          <h3>{isSignUp ? "Sign up" : "Log In"}</h3>

          {isSignUp && (
            <div>
              <input
                type="text"
                placeholder="First Name"
                className="infoInput"
                name="firstname"
                onChange={handleChange}
                value={data.firstname}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="infoInput"
                name="lastname"
                onChange={handleChange}
                value={data.lastname}
              />
            </div>
          )}

          <div>
            <input
              type="text"
              className="infoInput"
              name="username"
              placeholder="Usernames"
              onChange={handleChange}
              value={data.username}
            />
          </div>

          <div>
            <input
              type="password"
              className="infoInput"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={data.password}
            />
            {isSignUp && (
              <input
                type="password"
                className="infoInput"
                name="confirmpass"
                placeholder="Confirm Password"
                onChange={handleChange}
                value={data.confirmpass}
              />
            )}
          </div>
              <span style={{display:confirmPass?"none":"block", color:"Red",fontSize:"12px",alignSelf:"flex-end",marginRight:"12px"}}>
                * Confirm Password Is Not Same 
              </span>
          <div>
            <span
              style={{ fontSize: "13px", cursor: "pointer" }}
              onClick={() => {setIsSignUp((prev) => !prev); resetForm()}}
            >
              {isSignUp
                ? "Already have an account. LogIn!"
                : "Don't have an account. SignUp"}
            </span>
          </div>
          <button className="button info-button" type="submit" disabled={loading}>
            {loading?"Loading...": isSignUp ? "Signup" : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
