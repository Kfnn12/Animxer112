import { React, useEffect, useState } from 'react';
import Sidebar from '../Components/Sidebar'
import Navbar from '../Components/Navbar'
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Comments = () => {
  const [comments, setComments] = useState([]);
  let i = 1;
  useEffect(() => {
    getComments();
    // console.log(user);
  }, []);

  const getComments = async () => {
    try {
      axios.interceptors.response.use(response => {
        return response;
      }, error => {
        return;
      });
      const res = await axios.get(`http://localhost:8000/api/v1/admin/comments`).then(res => {
        const b = res.data.comments;
        console.log(b);
        setComments(b);
      });
    } catch (err) {
      console.log(err);
    }
  }

  const deleteComment = async (comment) => {
    const prompt = window.prompt("Enter master key");
    try {
      if (prompt) {
        const conf = window.confirm("Are you Sure??");
        if (conf) {
          axios.interceptors.response.use(response => {
            return response;
          }, error => {
            toast.error(error.response.data.error, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });

            return;
          });
          const res = await axios.delete(`http://localhost:8000/api/v1/admin/comment/${prompt}/${comment._id}`);
          await getComments();
          toast.error(res.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          return res;
        }
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }

  return (
    <div class="d-flex" id="wrapper">
      <ToastContainer/>
      <Sidebar />

      <div id="page-content-wrapper">
        <Navbar />
        <div class="row my-5">
          <h3 class="fs-4 mb-3">Reported Comments</h3>
          {comments.length != 0 ? <div class="col">
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
                {comments.map(comment => {
                  return <tr>
                    <th scope="row">{i++}</th>
                    <td>{comment.sender ? comment.sender.email : "User"}</td>
                    <td>{comment.comment}</td>
                    <td>{comment.reports.length}</td>
                    <td><button onClick={ev => deleteComment(comment)} class="btn btn-outline-danger border-0"><i class="fa-solid fa-trash p-2"></i></button></td>
                  </tr>
                })
                }
              </tbody>
            </table>
          </div> : <h1>No reported comments</h1>}
        </div>
      </div>
    </div>
  )
}

export default Comments