

export default function postName(query) {


    const url = 'http://localhost:3000/api/upload'
    const data = {
        "Name": query
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