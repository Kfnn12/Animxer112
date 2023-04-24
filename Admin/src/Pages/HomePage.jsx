import { React, useEffect, useState } from 'react';
import 'bootstrap';
import "../App.css"
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
import axios from "axios";

const HomePage = () => {
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
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
  const getComments = async() => {
    try {
            axios.interceptors.response.use(response => {
                return response;
            }, error => {
            return ;
            });
            const res = await axios.get(`http://localhost:8000/api/v1/admin/comments`).then(res => {
              const b = res.data.comments;
              console.log(b);
              setComments(b);
            });
        } catch(err) {
            console.log(err);
    }
  }

  const deleteUser = async(user) => {
    const prompt = window.prompt("Enter master key");
    try {
      if (prompt) {
        const conf = window.confirm("Are you Sure??");
        if (conf) {
          axios.interceptors.response.use(response => {
            return response;
          }, error => {
            alert(error.response.data.error);
            return;
          });
          const res = await axios.delete(`http://localhost:8000/api/v1/admin/user/${prompt}/${user._id}`);
          await getUsers();
          alert(res.data.message);
          return res;
        }
      }
    } catch (err) {
      console.log(err);
      alert("Something went wrong please try again later.")
    }
  }

  const deleteComment = async(comment) => {
    const prompt = window.prompt("Enter master key");
    try {
      if (prompt) {
        const conf = window.confirm("Are you Sure??");
        if (conf) {
          axios.interceptors.response.use(response => {
            return response;
          }, error => {
            alert(error.response.data.error);
            return;
          });
          const res = await axios.delete(`http://localhost:8000/api/v1/admin/comment/${prompt}/${comment._id}`);
          await getComments();
          alert(res.data.message);
          return res;
        }
      }
    } catch (err) {
      console.log(err);
      alert("Something went wrong please try again later.")
    }
  }

  useEffect(() => {
    getUsers();
    // setUsers(user);
    getComments();
    console.log(comments);
  }, []);
  useEffect(() => {
    const el = document.getElementById('wrapper');
    const toggleButton = document.getElementById('menu-toggle');
    const toggleSidebar = () => {
      el.classList.toggle('toggled');
    };

    toggleButton.addEventListener('click', toggleSidebar);

    return () => {
      toggleButton.removeEventListener('click', toggleSidebar);
    };
  }, []);
  return (
    <div class="d-flex" id="wrapper">

      <Sidebar />

      <div id="page-content-wrapper">
        <Navbar />

        <div class="container-fluid px-4">
          <div class="row g-3 my-2">
            <div class="col-md-3">
              <div class="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                <div>
                  <h3 class="fs-2">{users.length}</h3>
                  <p class="fs-5">Users</p>
                </div>
                <i class="fa-solid fa-user fs-1 primary-text border rounded-full secondary-bg p-3"></i>
              </div>
            </div>
            <div class="col-md-3">
              <div class="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                <div>
                  <h3 class="fs-2">{comments.length}</h3>
                  <p class="fs-5">Reported Comments</p>
                </div>
                <i class="fa-solid fa-user fs-1 primary-text border rounded-full secondary-bg p-3"></i>
              </div>
            </div>
          </div>
          <div class="row my-5">
    <h3 class="fs-4 mb-3">Reported Comments</h3>
    {comments.length !=0 ?<div class="col">
      <table class="table bg-white rounded shadow-sm  table-hover">
        <thead>
          <tr>
            <th scope="col" width="50">#</th>
            <th scope="col">Sender E-mail</th>
            <th scope="col">Comment</th>
            <th scope="col">Report Count</th>
            <th scope="col">Options</th>
          </tr>
        </thead>
        <tbody>
          {comments.slice(0, 4).map(comment => {
            return <tr>
            <th scope="row">1</th>
            <td>{comment.sender ? comment.sender.email: "User"}</td>
            <td>{comment.comment}</td>
            <td>{comment.reports.length}</td>
            <td><button onClick={e => deleteComment(comment)} class="btn btn-outline-danger border-0"><i class="fa-solid fa-trash p-2"></i></button></td>
          </tr>
          })
          }
        </tbody>
      </table>
    </div>: <h1>No reported comments</h1>}
  </div>
  <div class="row my-5">
    <h3 class="fs-4 mb-3">Users</h3>
    {users.length != 0 ?<div class="col">
      <table class="table bg-white rounded shadow-sm  table-hover">
        <thead>
          <tr>
            <th scope="col" width="50">#</th>
            <th scope="col">E-mail</th>
            <th scope="col">Name</th>
            <th scope="col">Profile</th>
            <th scope="col">Options</th>
          </tr>
        </thead>
        <tbody>
          {users.slice(0, 4).map(user => {
            return <tr>
            <th scope="row">1</th>
            <td>{user.email}</td>
            <td>{user.name}</td>
            <td>{user.profile}</td>
            <td><button onClick={e => deleteUser(user)} class="btn btn-outline-danger border-0"><i class="fa-solid fa-trash p-2"></i></button></td>
          </tr>
          })
          }
        </tbody>
      </table>
    </div>: <h1>No User Exist</h1>}
  </div>
        </div>
      </div>
    </div>
  )
}
export default HomePage;