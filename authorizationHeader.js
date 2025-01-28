localStorage.setItem('token', token)
const token = localStorage.getItem('token');

fetch('http://127.0.0.1:3000/messages', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
})
.then((response) => response.json())
.then((data) => console.log(data))
.catch((error) => console.error(error));