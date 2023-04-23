import { Link, useNavigate } from 'react-router-dom'
import {React, useEffect} from 'react';


const user = "Shiva";
const History = () => {
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

  const navigate = useNavigate();

    useEffect(()=>{
        const id = getCookie("id");
        if(!id) {
        navigate("/");
        }
    });

    return (
        <>
            <section className='profile-wrapper'>
                <div className="profile-greeting">
                    {/* <h1> Hi, {user}</h1> */}
                    <h1><i class="fa-solid fa-clock-rotate-left lastwatch-icon continue-icon"></i> Continue Watching</h1>
                </div>
                <div className='profile-navbar'>
                    <ul>
                        <Link to="/profile">
                            <li>Profile</li>
                        </Link>
                        <li style={{cursor: "pointer"}}>History</li>
                        <Link to="/bookmark">
                            <li>Bookmark</li>
                        </Link>
                    </ul>
                </div>
            </section>
            <div className="lastwatch active">
                <section className="movies">
                    <div className="lastwatch-bar">
                        <div className="lastwatch-heading">
                            {/* <h1><i class="fa-solid fa-clock-rotate-left lastwatch-icon continue-icon"></i> Continue Watching</h1> */}
                            <div className="lastwatch-grid">
                            <div className="lastwatch-card">
                                <div className="lastwatch-close">

                                    <i
                                        className="fa-solid fa-xmark"
                                    />
                                </div>
                                <div className="lastwatch-head">

                                    <img src="https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/nx20605-fmnHdfurM7m6.jpg" alt="its just an images" className="lastwatch-img" />
                                    <div className="lastwatch-details">
                                        <h5 className="lastwatch-title">
                                            Tokyo Ghoul
                                            <br />
                                            <span className="last-ep">Episode:- 12</span>
                                        </h5>
                                    </div>
                                </div>

                                
                            </div>

                            <div className="lastwatch-card">
                                <div className="lastwatch-close">

                                    <i
                                        className="fa-solid fa-xmark"
                                    />
                                </div>
                                <div className="lastwatch-head">

                                    <img src="https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx136430-f8Iza5GEynRW.jpg" alt="its just an images" className="lastwatch-img" />
                                    <div className="lastwatch-details">
                                        <h5 className="lastwatch-title">
                                            Vinland Saga
                                            <br />
                                            <span className="last-ep">Episode:- 3</span>
                                        </h5>
                                    </div>
                                </div>

                                
                            </div>



          
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </>
    );
};

export default History;
