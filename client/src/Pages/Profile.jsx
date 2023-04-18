import React from 'react'
import '../css/Profile.css'
import { Footer } from '../Components'
const Profile = () => {
    const user = "Shiva"
    return (
        <>
        <section className='profile-wrapper'>
        <div className='top-navbar'>
            <ul>
                <li>Profile</li>
                <li>History</li>
                <li>Bookmark</li>
            </ul>
        </div>
        </section>
        <section className='login profile'>
            <div className="login-container">
                <div className="user-picture">
                    <img src="https://i.pinimg.com/originals/b8/bf/ac/b8bfac2f45bdc9bfd3ac5d08be6e7de8.jpg" alt="user-image" className='user-img' />
                    <input type="file" className='edit-profile' accept='image/png, image/jpeg, image/jpg' />
                </div>
                <h1>Hello {user} </h1>
                <form action="">
                    <input type="text" value={user} className='login-group-input' />
                    <input type="email" value="user@gmail.com" className='login-group-input' />
                    <div className='login-btn'>
                        <button className='login-sign-in' >Save</button>
                    </div>
                </form>
            </div>
        </section>
        <Footer/>
        </>
    )
}

export default Profile