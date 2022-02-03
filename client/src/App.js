import React, { useEffect, useState } from "react";
import "./App.css";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ALL_USERS } from "./query/user";
import { CREATE_USER } from "./mutation/user";

function App() {
  const { data, loading, error, refetch } = useQuery(GET_ALL_USERS);
  const [newUser] = useMutation(CREATE_USER);
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [age, setAge] = useState(0);
  console.log(data, "data");
  useEffect(() => {
    if (!loading) {
      setUsers(data.getAllUsers);
    }
    if (loading) {
      return <h1>Failed loading data</h1>;
    }
  }, [data]);

  const addUser = (e) => {
    e.preventDefault();
    newUser({
      variables: {
        input: {
          username,
          age,
        },
      },
    }).then(({ data }) => {
      console.log(data);
      setUsername("");
      setAge(0);
    });
  };

  return (
    <div className='App'>
      <form>
        <input
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type='number'
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <div>
          <button onClick={(e) => addUser(e)}>Create</button>
          <button>Get</button>
        </div>
      </form>
      <div>
        {users.map((user) => (
          <div key={user.id} className='user'>
            {user.id}. {user.username} {user.age}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
