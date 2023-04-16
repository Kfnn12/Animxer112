import React, { useEffect, useState } from 'react'
import '../css/Profile.css'
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import axios from "axios";
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
        <section className='login'>
            <div className="login-container">
                <div className="user-picture">
                    <img src={img} alt="user-image" className='user-img' />
                    <input type="file" className='edit-profile' accept='image/png, image/jpeg, image/jpg' />
                </div>
                <h1>Hello {details.name? details.name: user} </h1>
                <form action="">
                    <input type="text" value={details.name? details.name: user} className='login-group-input' />
                    <input type="email" value={details.email? details.email: "user@gmail.com"} className='login-group-input' />
                    <div className='login-btn' style={{
                        display: "flex",
                        flexDirection: "column"
                    }}>
                        <button className='login-sign-in' style={{
                            marginTop: "30px",
                        }}>Update</button>
                        <button className='login-sign-in' style={{
                            marginTop: "10px"
                        }}>Logout</button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Profile