import {React, useState, useEffect} from 'react'
import '../css/Profile.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Footer } from '../Components'
const Profile = () => {
    const [userId, setUserId] = useState("");
    const [userName, setUserName] = useState("");
    const [details, setDetails] = useState({});
    const [img, setImg] = useState("https://i.pinimg.com/originals/b8/bf/ac/b8bfac2f45bdc9bfd3ac5d08be6e7de8.jpg");
    const [isUpdating, setIsUpdating] = useState(false);

    const navigate = useNavigate();

  function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + '=')) {
        return cookie.substring(name.length + 1);
      }
    }
    return undefined;
}

  useEffect(()=>{
    const id = getCookie("id");
    if(id) {
      setUserId(id);
    } else {
        navigate("/");
    }
  });


    useEffect(()=>{
        getDetails();
        console.log(details);
    }, [userId]);

  const getDetails= async() => {
    try {
            axios.interceptors.response.use(response => {
                return response;
            }, error => {
            return ;
            });
            console.log(userId);
            const res = await axios.get(`http://localhost:8000/api/v1/user/${userId}`);
            if(res.data) {
              setDetails(res.data.user);
              setUserName(res.data.user.name);
              setImg(res.data.user.profile);
            }
            else
              setDetails({});
        } catch(err) {
            console.log(err);
    } 
    }

    const changeName = async() => {
        try {
            axios.interceptors.response.use(response => {
                return response;
            }, error => {
                    alert(error.response.data.error);
            return ;
            });
            const res = await axios.post(`http://localhost:8000/api/v1/user/change/name`, {
                name: userName,
                _id: userId
            })
            return res;
        } catch(err) {
            console.log(err);
            alert("Something went wrong please try again later.")
    }   
    }

    const sumbitHandler = async(e) => {
        e.preventDefault();
        if(isUpdating) {
            if(details.name != userName) {
                const res = await changeName();
                alert(res.data.message);
            } else {
                alert("Type different Username");
            }
        }
        setIsUpdating(!isUpdating);
    }

    return (
        <>
        <section className='profile-wrapper'>
            <div className="profile-greeting">
               <h1> Hello, {details? details.name: "User"}</h1>
            </div>
        <div className='profile-navbar'>
            <ul>
                <li style={{cursor: "pointer"}}>Profile</li>
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
                    <img src={img} alt="user-image" className='user-img' />
                    {/* <div className="edit-user-profile">
                    <i class="fa-solid fa-pen"></i>
                    </div> */}
                    <div className="profile-images-modal">
                        <img src="https://i.ibb.co/sJPVdF8/2wPVNZ.jpg" alt="" />
                        <img src="https://i.ibb.co/sJPVdF8/2wPVNZ.jpg" alt="" />
                        <img src="https://i.ibb.co/sJPVdF8/2wPVNZ.jpg" alt="" />
                    </div>
                </div>
                <form action="" autoComplete='false' onSubmit={e => sumbitHandler(e)}>
                    <label htmlFor="text">Your Name</label>
                    <input type="text" value={userName} className='login-group-input' onChange={e => {isUpdating? setUserName(e.target.value): setUserName(userName)}}/>
                    {/* user cannot update email value its just here to diplay info */}
                    <label htmlFor="email">Email</label>
                    <input type="email" value={details? details.email: "user@gmail.com"} className='login-group-input' />
                    {/* <label htmlFor="text">Password
                    <input type="text" value="password" className='login-group-input' />
                    </label> */}
                    <div className='profile-btn'>
                        <button type="submit" className='profile-save'>{isUpdating? "Save": "update"}</button>
                    </div>
                </form>
            </div>
        </section>
        <Footer/>
        </>
    )
}

export default Profile