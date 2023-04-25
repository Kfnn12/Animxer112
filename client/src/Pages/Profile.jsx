import { React, useState, useEffect } from 'react'
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
  const [changeAvatar, setChangeAvatar] = useState(false);
  const [userImg, setUserImg] = useState("");
  const [comp, setComp] = useState(1);

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

  useEffect(() => {
    const id = getCookie("id");
    if (id) {
      setUserId(id);
    } else {
      navigate("/");
    }
  });


  useEffect(() => {
    getDetails();
    console.log(details);
  }, [userId]);

  const getDetails = async () => {

    // profile images
    try {
      axios.interceptors.response.use(response => {
        return response;
      }, error => {
        return;
      });
      console.log(userId);
      const res = await axios.get(`http://localhost:8000/api/v1/user/${userId}`);
      if (res.data) {
        setDetails(res.data.user);
        setUserName(res.data.user.name);
        setImg(res.data.user.profile);
      }
      else
        setDetails({});
    } catch (err) {
      console.log(err);
    }
  }

  const changeName = async () => {
    try {
      axios.interceptors.response.use(response => {
        return response;
      }, error => {
        alert(error.response.data.error);
        return;
      });
      const res = await axios.post(`http://localhost:8000/api/v1/user/change/name`, {
        name: userName,
        _id: userId
      })
      return res;
    } catch (err) {
      console.log(err);
      alert("Something went wrong please try again later.")
    }
  }

  const sumbitHandler = async (e) => {
    e.preventDefault();
    if (isUpdating) {
      if (details.name != userName) {
        const res = await changeName();
        alert(res.data.message);
      } else {
        alert("Type different Username");
      }
    }
    setIsUpdating(!isUpdating);
  }

  const profileImages = [
    {
      id: 1,
      imgUrl:
        "https://i.ibb.co/56w2WWV/images-q-tbn-ANd9-Gc-Qo-Wng-A9o-rk-TEZWKg-T3zgh-QCmh-DR-Q2-KFm-Q3dt-Pw-W0-Co-Hio-B-m-VFQ44rdxd9-FQM4.jpg",
    },

    {
      id: 2,
      imgUrl:
        "https://i.ibb.co/HG41T5g/images-q-tbn-ANd9-Gc-SIZBPpit-WVw-Vv-OWR3yn-Ki-Kg-HEYEm-Q2-Zm487w-usqp-CAU.jpg",
    },

    {
      id: 3,
      imgUrl:
        "https://i.ibb.co/Lg0Wv8y/images-q-tbn-ANd9-Gc-Sspe4-Sy-j-XWf-Fw-QIp-Qpr-FPav-DGK5-SKArfhrw-usqp-CAU.jpg",
    },

    {
      id: 4,
      imgUrl: "https://i.ibb.co/sJPVdF8/2wPVNZ.jpg",
    },

    {
      id: 5,
      imgUrl: "https://i.ibb.co/QH8H6g5/wp10142858.jpg",
    },
  ];

  const setImageHandler = (url) => {
    setUserImg(url);
    setChangeAvatar(!changeAvatar)
  };
  return (
    <>
      <section className='profile-wrapper'>
        <div className="profile-greeting">
          <h1> Hello, {details ? details.name : "User"}</h1>
        </div>
        <div className='profile-navbar'>
          <ul>
            <li style={{ cursor: "pointer" }}>Profile</li>
            <Link to="/history"><li>History</li></Link>
            <Link to="/bookmark">
              <li>Bookmark</li>
            </Link>
          </ul>
        </div>
      </section>
      <section className='profile-user-info'>
        <div className="login-container">
          <div className="user-picture"  onClick={() => setChangeAvatar(!changeAvatar)}>
            <img src={img} alt="user-image" className='user-img' />
            <div className={changeAvatar ? "image-list" : "hide-image-list"}>
              {profileImages.map((profileImg) => {
                return (
                  <div
                    className="single-img"
                    key={profileImg.id}
                    onClick={() => setImageHandler(profileImg.imgUrl)}
                  >
                    <img src={profileImg.imgUrl} alt="" />
                  </div>
                );
              })}
            </div>
            </div>
            <form action="" autoComplete='false' onSubmit={e => sumbitHandler(e)}>
              <label htmlFor="text">Your Name</label>
              <input type="text" value={userName} className='login-group-input' onChange={e => { isUpdating ? setUserName(e.target.value) : setUserName(userName) }} />
              {/* user cannot update email value its just here to diplay info */}
              <label htmlFor="email">Email</label>
              <input type="email" value={details ? details.email : "user@gmail.com"} className='login-group-input' />
              {/* <label htmlFor="text">Password
                    <input type="text" value="password" className='login-group-input' />
                    </label> */}
              <div className='profile-btn'>
                <button type="submit" className='profile-save'>{isUpdating ? "Save" : "update"}</button>
              </div>
            </form>
          </div>
      </section>
      <Footer />
    </>
  )
}

export default Profile