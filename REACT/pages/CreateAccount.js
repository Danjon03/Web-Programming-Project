import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './CSS/createAccount.css';

const CreateAccount = () => {
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();   // prevent form reloading
    const formData = new FormData(event.target);

    if (formData.get("password") === formData.get("password2")) {
      
      const url = 'http://localhost:3000/api/createAccount'
      const data = {
        "username": formData.get("username"),
        "password": formData.get("password"),
        "isOwner": "False"
      };

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();
        if (response.ok) {
          setMessage(result.message);
        } else {
          setMessage(result.message || 'Failed to create account.');
        }
      } catch (error) {
        console.error('Error:', error);
        setMessage('An error occurred. Please try again.');
      }
    } else {
      setMessage("Passwords do not match.");
    }
    
    //after everything has been completed, redirect to /posts
    window.location.href = '/';
    };

    return (
        <div class="wrapper">
            <h1>Create Account</h1>
                    <form onSubmit={handleSubmit}>
                      
                      <div class="input-box">
                      <input name="username" placeholder="Enter Username" required />
                      </div>

                      <div class="input-box">
                      <input  name="password" placeholder = "Enter Password" type="password" required/>
                      </div>

                      <div class="input-box">
                      <input  name="password2" placeholder = "Confirm Password" type="password" required/>
                      </div>

                      <button class="btn" type="submit" >Create Account</button>
                    </form>
                    <Link to="/" >Login</Link>


                    {message && <p>{message}</p>}
        </div>
    );
};


export default CreateAccount;