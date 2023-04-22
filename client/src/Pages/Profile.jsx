import {React, useState, useEffect} from 'react'
import '../css/Profile.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { Footer } from '../Components'
const Profile = () => {
     const [userId, setUserId] = useState("");
    const [details, setDetails] = useState({});
    const [img, setImg] = useState("https://i.pinimg.com/originals/b8/bf/ac/b8bfac2f45bdc9bfd3ac5d08be6e7de8.jpg");
    const navigate = useNavigate();

    useEffect(()=>{
        const id = Cookies.get("id");
        console.log(typeof(id));
        if(id.length == 0) {
            navigate("/");
        } else {
            setUserId(id);
        }
    });

    useEffect(()=>{
        getDetails();
    }, [userId]);

  const getDetails= async() => {
    try {
            axios.interceptors.response.use(response => {
                return response;
            }, error => {
            return ;
            });
            console.log(userId);
            const res = await axios.get(`http://localhost:8000/api/v1/user/${userId}`)
            if(res.data) {
              setDetails(res.data.user);
              setImg(res.data.user.profile);
            }
            else
              setDetails({});
        } catch(err) {
            console.log(err);
    } 
    }
    
    const user = "Shiva"
    return (
        <>
        <section className='profile-wrapper'>
            <div className="profile-greeting">
               <h1> Hello, {user}</h1>
            </div>
        <div className='profile-navbar'>
            <ul>
                <Link to="/profile">
                <li>Profile</li>
                </Link>
                <Link to="/history"><li>History</li></Link>
                <Link to="/bookmark">
                <li>Bookmark</li>
                </Link>
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
                    <label htmlFor="text">Password
                    <input type="text" value="password" className='login-group-input' />
                    </label>
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