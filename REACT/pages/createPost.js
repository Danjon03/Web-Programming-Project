import React from 'react';

const CreateAccount = () => {
    async function createPost(formData) {
      

        const url = 'http://localhost:3000/api/createPost'
        const data = {
            "title": formData.get("title"),
            "body": formData.get("body"),
            "uploadUserId": "0"
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
    return (
        <div>
            <h1>Do The Following to create your post</h1>
                    <form action={createPost}>
                      <input name="title" placeholder="Post Title" />
                      <br></br>
                      <input name="body" placeholder = "body"/>
                      <button type="submit" >Create Post</button>
                    </form>
        </div>
    );


};
export default CreateAccount;
