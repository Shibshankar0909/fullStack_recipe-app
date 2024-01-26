import React, { useState } from 'react';
import { Link,useNavigate,useLocation } from 'react-router-dom';
import './form.css';

const SignupForm = () => {
  const location = useLocation ();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [existingUserError,setExistingUserError]=useState("Already Have An Account ?");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleError=()=>{
    setExistingUserError("User Exists Log in instead");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/user/signup', {
        method: 'POST',
        credentials:'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if(response.status==400){
        handleError();
      }
      if (response.ok) {
        console.log('User signed up successfully!');
        navigate('/home');
      } else {
        console.error('Error signing up:', response.statusText);
      }
    } catch (error) {
      console.error('Network error:', error.message);
    }

    setFormData({
      name: '',
      email: '',
      password: '',
    });
  };

  return (
    <div className="form_cont">
      <form className='form' onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
      <label className='label'>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          className='input'
          placeholder='First Name'
        />
      </label>
      <br />
      <label className='label'>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          className='input'
          placeholder='Email'
        />
      </label>
      <br />
      <label className='label'>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          required
          className='input'
          placeholder='Password'
        />
      </label>
      <br />
      <button className='button' type="submit" >
        Sign Up
      </button>
      <p>{existingUserError} <Link className='link' to={'/login'} >
        Log In
      </Link></p>
      
    </form>
    </div>
  );
};

export default SignupForm;
