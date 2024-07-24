import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
//להוסיף ENUM למקצוע ---
const Signup = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    // password: "",
    name: "",
    subject:"",
    age:"", 
    phone:"" 
  });
  const { email, name,subject ,age,phone} = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };
  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-right",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log( e.preventDefault());
    console.log(inputValue);
    try {
        console.log(inputValue);

      const { data } = await axios.post(
        
        "http://localhost:5000/students/add",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
    setInputValue({
      ...inputValue,
      email: "",
     name: "",
      subject:"",
      age:"", 
      phone:"" 
    });
  };

  return (
    <div className="form_container">
      <h2>Signup Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="email">name</label>
          <input
            type="text"
            name="name"
            value={name}
            placeholder="Enter your name"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="phone">phone</label>
          <input
            type="password"
            name="phone"
            value={phone}
            placeholder="Enter your phone"
            onChange={handleOnChange}
          />
        </div>

        
          <div>
          <label htmlFor="subject">subject</label>
          <input
            type="subject"
            name="subject"
            value={subject}
            placeholder="Enter your subject"
            onChange={handleOnChange}
          />
        </div>

          <div>
          <label htmlFor="age">age</label>
          <input
            type="age"
            name="age"
            value={age}
            placeholder="Enter your age"
            onChange={handleOnChange}
          />
        </div>
        <button type="submit">Submit</button>
        <span>
          Already have an account? <Link to={"/login"}>Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Signup;
