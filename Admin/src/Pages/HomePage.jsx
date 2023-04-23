import { React, useEffect } from 'react';
import 'bootstrap';
import "../App.css"
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
import ReportedComment from './ReportedComment';

const HomePage = () => {
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
                  <h3 class="fs-2">12</h3>
                  <p class="fs-5">Users</p>
                </div>

                <i class="fa-solid fa-user fs-1 primary-text border rounded-full secondary-bg p-3"></i>
              </div>
            </div>
          </div>

          <ReportedComment />

        </div>
      </div>
    </div>
  )
}
export default HomePage;