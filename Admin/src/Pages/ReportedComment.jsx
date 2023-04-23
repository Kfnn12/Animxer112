import React from 'react'

const ReportedComment = () => {
  return (
    <div class="row my-5">
    <h3 class="fs-4 mb-3">Reported Comments</h3>
    <div class="col">
      <table class="table bg-white rounded shadow-sm  table-hover">
        <thead>
          <tr>
            <th scope="col" width="50">#</th>
            <th scope="col">Username</th>
            <th scope="col">Reason</th>
            <th scope="col">Options</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>User</td>
            <td>Some hate comment</td>
            <td><i class="fa-solid fa-trash p-2"></i> <i class="fa-solid fa-ban"></i></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  )
}

export default ReportedComment