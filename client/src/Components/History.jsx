import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
const user = "Shiva"
const History = () => {

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
                            <h1><i class="fa-solid fa-clock-rotate-left lastwatch-icon continue-icon"></i> Continue Watching</h1>
                            <div className="seasons-grid">
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
                                            Title of the anime
                                            <br />
                                            <span className="last-ep">Episode:- 69</span>
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

                                    <img src="https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/nx20605-fmnHdfurM7m6.jpg" alt="its just an images" className="lastwatch-img" />
                                    <div className="lastwatch-details">
                                        <h5 className="lastwatch-title">
                                            Title of the anime
                                            <br />
                                            <span className="last-ep">Episode:- 69</span>
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

                                    <img src="https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/nx20605-fmnHdfurM7m6.jpg" alt="its just an images" className="lastwatch-img" />
                                    <div className="lastwatch-details">
                                        <h5 className="lastwatch-title">
                                            Title of the anime
                                            <br />
                                            <span className="last-ep">Episode:- 69</span>
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

                                    <img src="https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/nx20605-fmnHdfurM7m6.jpg" alt="its just an images" className="lastwatch-img" />
                                    <div className="lastwatch-details">
                                        <h5 className="lastwatch-title">
                                            Title of the anime
                                            <br />
                                            <span className="last-ep">Episode:- 69</span>
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

                                    <img src="https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/nx20605-fmnHdfurM7m6.jpg" alt="its just an images" className="lastwatch-img" />
                                    <div className="lastwatch-details">
                                        <h5 className="lastwatch-title">
                                            Title of the anime
                                            <br />
                                            <span className="last-ep">Episode:- 69</span>
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

                                    <img src="https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/nx20605-fmnHdfurM7m6.jpg" alt="its just an images" className="lastwatch-img" />
                                    <div className="lastwatch-details">
                                        <h5 className="lastwatch-title">
                                            Title of the anime
                                            <br />
                                            <span className="last-ep">Episode:- 69</span>
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
