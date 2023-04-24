import React from 'react'
import { Link } from "react-router-dom"
const Sidebar = () => {
    return (
        <div class="bg-white" id="sidebar-wrapper">
            <div className="sidebar-heading text-center py-4 primary-text fs-4 fw-bold text-uppercase border-bottom">
                <i className="fas fa-user-secret me-2"></i>
                <a href="http://localhost:3000" className='text-decoration-none'>
                AnimeTrix
                </a>
            </div>
            <div class="list-group list-group-flush my-3">
                <div class="list-group-item list-group-item-action bg-transparent second-text active"><i
                    class="fas fa-tachometer-alt me-2"></i>
                      <Link to="/" className='text-decoration-none'>
                    Dashboard
                    </Link></div>

                <div class="list-group-item list-group-item-action bg-transparent second-text active"><i
                    class="fa-solid fa-user me-2"></i>
                      <Link to="/user" className='text-decoration-none'>
                    Users
                    </Link></div>
                <div class="list-group-item list-group-item-action bg-transparent second-text active">
                    <i
                        class="fa-solid fa-comment me-2"></i>
                          <Link to="/comment" className='text-decoration-none'>Comments
                          </Link></div>
            </div>
        </div>
    )
}

export default Sidebar