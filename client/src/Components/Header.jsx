import React, { forwardRef, useImperativeHandle, useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {FiLogOut} from "react-icons/fi"
const Header = forwardRef((props, ref) => {
  const [togglemenu, setToggleMenu] = useState(true);

  const [searchActive, setSearchActive] = useState(false);
  const [profileActive, setProfileActive] = useState(false);
  const [userId, setUserId] = useState("");
  const [img, setImg] = useState("https://i.pinimg.com/originals/b8/bf/ac/b8bfac2f45bdc9bfd3ac5d08be6e7de8.jpg");

  let menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setSearchActive(false);
      }
    };
    document.addEventListener("mousedown", handler)

    return () => {
      document.removeEventListener("mousedown", handler)
    }
  })

  let toggleref = useRef();
  useEffect(() => {
    let handler = (e) => {
      if (!toggleref.current.contains(e.target)) {
        setToggleMenu(true);
      }
    };
    document.addEventListener("mousedown", handler)

    return () => {
      document.removeEventListener("mousedown", handler)
    }
  })

  const getUser = async () => {
    setUserId(Cookies.get("id"));
  }

  useEffect(() => {
    getUser();
    // console.log(userId);
  });

  function scroll() {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
  }
  function ProfileView(){
    setProfileActive(profileActive=>!profileActive)
  }
  const ProfileOpen = profileActive? 'active': 'gay';
  function MobileView() {
    setSearchActive(!searchActive);
    scroll()
  }
  const [inputVal, setInputVal] = useState("");
  const handelChange = (e) => {
    const val = e.target.value;
    setInputVal(val);
    props.handelChanges(val);
  };

  useImperativeHandle(ref, () => ({
    emptySearch() {
      setInputVal("");
    },
  }));

  const closeMenuWhenClickedLink = () => {
    if (window.innerWidth <= 1300) {
      setToggleMenu(!togglemenu);
    }
  };

  const logout = (e) => {
    const conf = window.confirm("Are you sure you want to logout??");
    if (conf) {
      Cookies.remove("id");
      setUserId("");
    }
  }

  const toggleButton = () => {
    if (userId == undefined || userId.length == 0) {
      return (<li className="login-tab">
        <NavLink to={"/login"}>
          <ion-icon name="log-in-outline"></ion-icon>
        </NavLink>
      </li>)
    }
    return (
      <div className="account-login" onClick={ProfileView}>
        <img src={img} alt="user-image" className='login-img' />
        <div className={`extra-options ${ProfileOpen}`}>
          <li>Profile</li>
          <li>Bookmark</li>
          <li>History</li>
        <li onClick={e => { logout(e) }}>Logout</li>
        </div>
      </div>
)
  }
  return (
    <>
      <nav className="header">
        <div className="logo">
          <a href="/">
            <span className="white">Anime</span>{" "}
            <span className="blue">Trix</span>
          </a>
        </div>

        <ul onClick={scroll} className={togglemenu ? "nav-links" : "toggle-links"} ref={toggleref}>
          <li>
            <NavLink to={"/"} onClick={() => closeMenuWhenClickedLink()}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to={"/popular"} onClick={() => closeMenuWhenClickedLink()}>
              Popular
            </NavLink>
          </li>
          <li>
            <NavLink to={"/top-airing"} onClick={() => closeMenuWhenClickedLink()}>
              Trending
            </NavLink>
          </li>
          <li>
            <NavLink to={"/movie"} onClick={() => closeMenuWhenClickedLink()}>
              Movies
            </NavLink>
          </li>
          <li>
            <NavLink to={"/genre"} onClick={() => closeMenuWhenClickedLink()}>
              Genres
            </NavLink>
          </li>
          {/*
          <li>
            <NavLink
              to={"/dub-anime"}
              onClick={() => closeMenuWhenClickedLink()}
            >
              Dub Anime
            </NavLink>
          </li> */}
          <li>
            <NavLink to={"/ai-chat"} onClick={() => closeMenuWhenClickedLink()}>
              AI Chat
            </NavLink>
          </li>
        </ul>
        <div className="search">
          <input
            type="text"
            className="navbar-form-search"
            placeholder="I am looking for...."
            value={inputVal}
            onChange={handelChange}
          />
        </div>
        {toggleButton()}

        <div className="mobile-search" ref={menuRef}>
          <div className="search-field">
            <input type="text" className={`active-search-mobile ${searchActive ? 'active' : ''}`} placeholder="I am looking for" value={inputVal} onChange={handelChange} />
            <div className="field-icon-search" onClick={MobileView}>
              <ion-icon name="search-outline"></ion-icon>
            </div>
          </div>
        </div>



        <div
          className="toggle"
          onClick={() => {
            setToggleMenu(!togglemenu);
          }}
        >
          {togglemenu ? (
            <button className="navbar-menu-btn">
              <span className="one"></span>
              <span className="two"></span>
              <span className="three"></span>
            </button>
          ) : (
            <div className="navbar-menu-btn active">
              <span className="one"></span>
              <span className="two"></span>
              <span className="three"></span>
            </div>
          )}
        </div>
      </nav>
    </>
  );
});
export default Header;