import React, {useState} from 'react';
import {Link} from 'react-router-dom';


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
        <div>
            <h1>Enter your Username and Password to Create your Free Account!</h1>
                    <form onSubmit={handleSubmit}>
                      <input name="username" placeholder="Enter Username" required />
                      <br></br>
                      <input name="password" placeholder = "Enter Password" type="password" required/>
                      <br></br>
                      <input name="password2" placeholder = "Confirm Password" type="password" required/>
                      <button type="submit" >Create Account</button>
                    </form>
                    <Link to="/login" >Create Account</Link>


                    {message && <p>{message}</p>}
        </div>
    );
};


export default CreateAccount;