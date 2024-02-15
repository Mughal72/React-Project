import React, { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

function Register() {
      useEffect(()=>{
        if(localStorage.getItem("user_info")){
          navigate("/add");
        }
      })

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function signUp() {
    let item = { name, email, password };
    // console.warn(item);

    let result = await fetch("http://localhost:8000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(item),
    });
    result = await result.json();
    console.warn("result", result);
    localStorage.setItem("user_info", JSON.stringify(result));
    navigate("/add");
  }


  return (
    <>
    <Header />
    <div className="col-sm-6 offset-sm-3">
     
      <h1>User Sign Up </h1>
      <input
        type="text"
        value={name}
        placeholder="Enter Your Name"
        onChange={(e) => setName(e.target.value)}
        className="form-control"
      />
      <br />
      <input
        type="text"
        value={email}
        placeholder="Enter Your Email"
        onChange={(e) => setEmail(e.target.value)}
        className="form-control"
      />
      <br />
      <input
        type="password"
        value={password}
        placeholder="Enter Password"
        onChange={(e) => setPassword(e.target.value)}
        className="form-control"
      />
      <br />
      <button onClick={signUp} className="btn btn-primary">
        {" "}
        Sign Up{" "}
      </button>
    </div>
    </>
  );
}
export default Register;
