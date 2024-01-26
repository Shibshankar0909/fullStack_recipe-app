import React, { useState } from 'react';
import { Link,useNavigate,useLocation } from 'react-router-dom';
import './form.css';

const LoginForm = () => {
  const location = useLocation ();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const[pswdErr,setPswdErr]=useState("");
  const[emailErr,setEmailErr]=useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/user/login', {
        method: 'POST',
        credentials:'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      console.log(response)
      if(response.status==400){
        setPswdErr("Wrong PassWord!!");
      }else{
        setPswdErr("");
      }
      if(response.status==404){
        setEmailErr("User Doesnt Exists!!");
      }else{
        setEmailErr("");
      }
      if (response.ok) {
        console.log('User logged in successfully!');
        navigate('/home');
      } else {
        console.error('Error logging in:', response.statusText);
      }
    } catch (error) {
      console.error('Network error:', error.message);
    }

    setFormData({
      email: '',
      password: '',
    });
  };

  return (
    <div className="form_cont">
      <form className='form' onSubmit={handleSubmit} >
      <h2>Log In</h2>
      <label className='label' >
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          placeholder='Email'
          className='input'
        />
      </label>
      <p style={{color:'red'}}>{emailErr}</p>
      <br />
      <label className='label' >
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          required
          placeholder='Password'
          className='input'
        />
      </label>
      <p style={{color:'red'}}>{pswdErr}</p>
      <br />
      <button className='button' type="submit" >
        Log In
      </button>
      <p>Dont Have an Account? <Link className='link' to={'/'} >
        Sign Up
      </Link></p>
      
    </form>
    </div>
  );
};

export default LoginForm;
