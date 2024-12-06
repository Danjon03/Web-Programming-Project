import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import './CSS/login.css';

const Login = () => {

  //the first thing the application does is access all user data for login
        const [data, setData] = useState([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);
      
        useEffect(() => {
          const fetchData = async () => {
            try {
              const response = await fetch('http://localhost:3000/api/getUsers');
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              const jsonData = await response.json();
              console.log(jsonData);
              setData(jsonData);
            } catch (error) {
              setError(error.message);
            } finally {
              setLoading(false);
            }
          };
      
          fetchData();
        }, []);
      
        if (loading) {
          return <div>Loading...</div>;
        }
      
        if (error) {
          return <div>Error: {error}</div>;
        }
        
        //validates that the login is correct and sets the correct cookies 
        function ValidateLogin(formData)
        {
            function validate(x)
            {
              if(x.username === formData.get("username") && x.password === formData.get("password"))
              {
                document.cookie = "loggedInUser=" + formData.get("username") + "; path=/";
                document.cookie = "isOwner=" + x.isOwner + "; path=/";
                window.location.href = '/posts';
              }
            }

            data.map(validate);

        return("Hello World!");

    }

    return (
        <div class="wrapper">
            <h1>Login</h1>
            
            <form action={ValidateLogin}>

              <div class="input-box">
                <input name="username" placeholder="Username" />
              </div>
                
              <div class="input-box">
                <input name="password" placeholder = "Password" type="password"/>
              </div>

                <button type="submit" class="btn" >Login</button>
            </form>

            <div class="register-link">
              <p>Don't have an account?
              <Link to="/createAccount" > Register</Link></p>
            </div>

        </div>
    );

};

export default Login;
            
