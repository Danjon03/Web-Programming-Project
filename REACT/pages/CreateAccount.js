import React from 'react';


const CreateAccount = () => {
    async function search(formData) {
      if(formData.get("password") === formData.get("password2"))
      {

        const url = 'http://localhost:3000/api/createAccount'
        const data = {
            "username": formData.get("username"),
            "password": formData.get("password")
        };
        const customHeaders = {
            "Content-Type": "application/json",
        }
        
        fetch(url, {
            method: "POST",
            headers: customHeaders,
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            });
        
      }
      else
      {
        alert("Your Passwords Do Not Match");
      }
    }

    return (
        <div>
            <h1>Enter your Username and Password to Create your Free Account!</h1>
                    <form action={search}>
                      <input name="username" placeholder="username" />
                      <br></br>
                      <input name="password" placeholder = "password" type="password"/>
                      <br></br>
                      <input name="password2" placeholder = "password" type="password"/>
                      <button type="submit" >Login</button>
                    </form>
        </div>
    );
};


export default CreateAccount;
