import { React, useEffect, useState } from 'react';
import Sidebar from '../Components/Sidebar'
import Navbar from '../Components/Navbar'
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  let i=1;
  const getUsers = async() => {
    try {
            axios.interceptors.response.use(response => {
                return response;
            }, error => {
            return ;
            });
            const res = await axios.get(`http://localhost:8000/api/v1/admin/users`).then(res => {
              const a = res.data.users;
              console.log(a); 
              setUsers(a);
            });
        } catch(err) {
            console.log(err);
    }
  }

    useEffect(() => {
    getUsers();
    // setUsers(user);
    // console.log(user);
  }, []);
  return (
    <div class="d-flex" id="wrapper">

      <Sidebar />

      <div id="page-content-wrapper">
        <Navbar />
        <div class="row my-5">
    <h3 class="fs-4 mb-3">Users</h3>
    {users.length != 0 ?<div class="col">
      <table class="table bg-white rounded shadow-sm  table-hover">
        <thead>
          <tr>
            <th scope="col" width="50">#</th>
            <th scope="col">E-mail</th>
            <th scope="col">Name</th>
            <th scope="col">Options</th>
          </tr>
        </thead>
        <tbody>
          {users.slice(0, 4).map(user => {
            return <tr>
            <th scope="row">{i++}</th>
            <td>{user.email}</td>
            <td>{user.name}</td>
            <td><button class="btn btn-outline-danger border-0"><i class="fa-solid fa-trash p-2"></i></button></td>
          </tr>
          })
          }
        </tbody>
      </table>
    </div>: <h1>No User Exist</h1>}
  </div>
      </div>
    </div>
  )
}

export default Users