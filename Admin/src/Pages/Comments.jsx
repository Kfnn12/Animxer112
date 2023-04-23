import React from 'react'
import Sidebar from '../Components/Sidebar'
import Navbar from '../Components/Navbar'
const Comments = () => {
  return (
    <div class="d-flex" id="wrapper">

      <Sidebar />

      <div id="page-content-wrapper">
        <Navbar />
        <div class="row my-0 p-4">
          <h3 class="fs-4 mb-3">Comment</h3>
          <div class="col">
            <table class="table bg-white rounded shadow-sm  table-hover">
              <thead>
                <tr>
                  <th scope="col" width="50">#</th>
                  <th scope="col">Username</th>
                  <th scope="col">Comment</th>
                  <th scope="col">Options</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>User</td>
                  <td>Some hate comment</td>
                  <td><i class="fa-solid fa-trash p-2"></i></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Comments