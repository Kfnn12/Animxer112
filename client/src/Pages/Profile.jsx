import { React, useState, useEffect, useRef } from "react";
import "../css/Profile.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Footer } from "../Components";

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

const Profile = () => {
  const [userId, setUserId] = useState("");
  const [details, setDetails] = useState({});
  const [img, setImg] = useState(
    "https://i.pinimg.com/originals/b8/bf/ac/b8bfac2f45bdc9bfd3ac5d08be6e7de8.jpg"
  );
  const navigate = useNavigate();

  useEffect(() => {
    const id = Cookies.get("id");
    console.log(typeof id);
    if (id.length == 0) {
      navigate("/");
    } else {
      setUserId(id);
    }
  });

  useEffect(() => {
    getDetails();
  }, [userId]);

  const getDetails = async () => {
    try {
      axios.interceptors.response.use(
        (response) => {
          return response;
        },
        (error) => {
          return;
        }
      );
      console.log(userId);
      const res = await axios.get(
        `http://localhost:8000/api/v1/user/${userId}`
      );
      if (res.data) {
        setDetails(res.data.user);
        setImg(res.data.user.profile);
      } else setDetails({});
    } catch (err) {
      console.log(err);
    }
  };

  const user = "Shiva";

  // Set User Avatar
  const [changeAvatar, setChangeAvatar] = useState(false);
  const [userImg, setUserImg] = useState("");
  const [comp, setComp] = useState(1);

  const setImageHandler = (url) => {
    setUserImg(url);
    setChangeAvatar(!changeAvatar)
  };

  return (
    <section className="user-profile">
      <div className="profile-top">
        <img src={userImg} alt="" />

        <h3>{user}</h3>
        <button onClick={() => setChangeAvatar(!changeAvatar)}>
          Change Avatar
        </button>
      </div>

      <div className="profile-nav">
        <ul>
          <li onClick={() => setComp(1)}>Edit Profile</li>
          <li onClick={() => setComp(2)}>Bookmark</li>
          <li onClick={() => setComp(3)}>History</li>
        </ul>
      </div>

      <div className={comp === 1 ? "edit-profile" : "hide-profile"}>
        <form>
          <div className="edit-profile-form-group">
            <label htmlFor="username">Username</label>
            <input id="username" type="text" placeholder="username..." />
          </div>

          <div className="edit-profile-form-group">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" placeholder="email..." />
          </div>

          <div className="edit-profile-form-group">
            <label htmlFor="password">Change Password</label>
            <input id="password" type="text" placeholder="Change Password..." />
          </div>

          <button>Save Changes</button>
        </form>
      </div>

      <div className={comp === 2 ? "bookmark" : "hide-bookmark"}>Bookmark</div>

      <div className={comp === 3 ? "history" : "hide-history"}>History</div>

      <Footer />

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
    </section>
  );
};

export default Profile;
