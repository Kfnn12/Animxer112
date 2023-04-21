import React from 'react'
import { Link } from 'react-router-dom'
const Bookmark = () => {
  const user = "Shiva";
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
            <div className="lastwatch active">
                <section className="movies">
                    <div className="lastwatch-bar">
                        <div className="lastwatch-heading">
                            <h1><i class="fa-solid fa-bookmark continue-icon"></i> Bookmarks</h1>
                            <div className="lastwatch-grid">
                            <div className="lastwatch-card">
                                <div className="lastwatch-close">

                                    <i
                                        className="fa-solid fa-bookmark"
                                    />
                                </div>
                                <div className="lastwatch-head">

                                    <img src="https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx20665-CnzR2zVpdxtR.png" className="lastwatch-img" />
                                    <div className="lastwatch-details">
                                        <h5 className="lastwatch-title">
                                        Shigatsu wa Kimi no Uso
                                        </h5>
                                    </div>
                                </div>

                                
                            </div>

                            <div className="lastwatch-card">
                                <div className="lastwatch-close">

                                    <i
                                        className="fa-solid fa-bookmark"
                                    />
                                </div>
                                <div className="lastwatch-head">

                                    <img src="https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/nx21-tXMN3Y20PIL9.jpg" alt="its just an images" className="lastwatch-img" />
                                    <div className="lastwatch-details">
                                        <h5 className="lastwatch-title">
                                            One Piece
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
  )
}

export default Bookmark