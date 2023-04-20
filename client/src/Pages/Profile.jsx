import React from 'react'
import '../css/Profile.css'
import { Link } from 'react-router-dom'
import { Footer } from '../Components'
const Profile = () => {
    const user = "Shiva"
    return (
        <>
        <section className='profile-wrapper'>
            <div className="profile-greeting">
               <h1> Hi, {user}</h1>
            </div>
        <div className='profile-navbar'>
            <ul>
                <Link to="/profile">
                <li>Profile</li>
                </Link>
                <Link to="/history"><li>History</li></Link>
                <li>Bookmark</li>
            </ul>
        </div>
        </section>
        <section className='profile-user-info'>
            <div className="login-container">
                <div className="user-picture">
                    <img src="https://i.ibb.co/56w2WWV/images-q-tbn-ANd9-Gc-Qo-Wng-A9o-rk-TEZWKg-T3zgh-QCmh-DR-Q2-KFm-Q3dt-Pw-W0-Co-Hio-B-m-VFQ44rdxd9-FQM4.jpg" alt="user-image" className='user-img' />
                    {/* <div className="edit-user-profile">
                    <i class="fa-solid fa-pen"></i>
                    </div> */}
                    <div className="profile-images-modal">
                        <img src="https://i.ibb.co/sJPVdF8/2wPVNZ.jpg" alt="" />
                        <img src="https://i.ibb.co/sJPVdF8/2wPVNZ.jpg" alt="" />
                        <img src="https://i.ibb.co/sJPVdF8/2wPVNZ.jpg" alt="" />
                    </div>
                </div>
                <form action="" autoComplete='false'>
                    <label htmlFor="text">Your Name</label>
                    <input type="text" value={user} className='login-group-input' />
                    {/* user cannot update email value its just here to diplay info */}
                    <label htmlFor="email">Email</label>
                    <input type="email" value="user@gmail.com" className='login-group-input' />
                    <label htmlFor="text">Password</label>
                    <input type="text" value="1234" className='login-group-input' />
                    <div className='profile-btn'>
                        <button className='profile-save' >Save</button>
                    </div>
                </form>
            </div>
        </section>
        <Footer/>
        </>
    )
}

export default Profile