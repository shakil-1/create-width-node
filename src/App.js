import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [users, setUser] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUser(data));
  }, [])

  const formSub = event => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    console.log(name, email);
    const user = { name, email };

    //post data to server
    fetch('http://localhost:5000/user', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(response => response.json())
      .then(data => {

        const newUser = [...users, data]
        setUser(newUser);
        console.log('Success:', data);
      })
  }
  return (
    <div className="App">
      <h1>My Own data {users.length}</h1>
      <form onSubmit={formSub}>
        <input type="text" name="name" placeholder='your name' id="" required /><br />
        <input type="email" name="email" placeholder='your email' id="" required /><br />
        <button>Add User</button>
      </form>
      <ul>
        {
          users.map(user => <li key={user.id}> id : {user.id} Youser Name: {user.name} Youser Email: {user.email}</li>)
        }
      </ul>
    </div>
  );
}

export default App;
