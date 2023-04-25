import { Link, useNavigate } from 'react-router-dom'
import { React, useDebugValue, useEffect, useState } from 'react';
import axios from "axios";

const user = "Shiva";
function History() {
    const [streamId, setStreamId] = useState([])
    const [animeData, setAnimeData] = useState([])
    const [userId, setUserId] = useState("");
    const [history, setHistory] = useState([]);
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
    const getHistory = async () => {
        try {
            if (userId) {
                axios.interceptors.response.use(response => {
                    return response;
                }, error => {
                    alert(error.response.data.error);
                    return;
                });
                const res = await axios.get(`http://localhost:8000/api/v1/user/history/${userId}`)
                const history = res.data.history;
                console.log(history)
                if (history.length > 0) {
                    const animeIds = history.map(item => item.animeId);
                    setStreamId(animeIds)
                    console.log(animeIds)
                }
                setHistory(history);

                const animeDataArray = [];
                for (const historyItem of history) {
                    const animeRes = await axios.get(`https://api.consumet.org/meta/anilist/info/${historyItem.animeId}`);
                    const animeDataItem = animeRes.data;
                    animeDataArray.push(animeDataItem);
                }
                setAnimeData(animeDataArray);
            }
        } catch (err) {
            console.log(err);
            alert("Error loading history");
        }
    }

    const deleteHistory = async () => {
        try {
            const conf = window.confirm("Are you sure you want to delete your history?");
            if (conf) {
                axios.interceptors.response.use(
                    (response) => {
                        return response;
                    },
                    (error) => {
                        alert(error.response.data.error);
                        return;
                    }
                );
                const res = await axios.delete(
                    `localhost:8000/api/v1/user/history/${userId}`
                );
                await getHistory();
                if (res && res.data) {
                    alert(res.data.message);
                    return res;
                }
            }
        } catch (err) {
            console.log(err);
            alert("Something went wrong. Please try again later.");
        }
    };




    useEffect(() => {
        const id = getCookie("id");
        setUserId(id);
    });

    useEffect(() => {
        getHistory();
    }, [userId]);

    return (
        <>
            <section className='profile-wrapper'>
                <div className="profile-greeting">
                    {/* <h1> Hi, {user}</h1> */}
                    <h1 className='history-head'><i class="fa-solid fa-clock-rotate-left lastwatch-icon continue-icon"></i> Continue Watching</h1>
                </div>
                <div className='profile-navbar'>
                    <ul>
                        <Link to="/profile">
                            <li>Profile</li>
                        </Link>
                        <li style={{ cursor: "pointer" }}>History</li>
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
                            <div className="clear-history">
                                <button onClick={deleteHistory}>Clear all</button>
                            </div>
                            {/* <h1><i class="fa-solid fa-clock-rotate-left lastwatch-icon continue-icon"></i> Continue Watching</h1> */}
                            <div className="movies-grid">

                                {animeData?.slice(0, 18).map((animeDataHis) => {
                                    return (
                                        <div className="movie-card">
                                            <div className="lastwatch-close">

                                                <i
                                                    className="fa-solid fa-xmark"
                                                />
                                            </div>
                                            <div className="card-head">
                                                <Link to={`/anime-details/${animeDataHis.id}`}>
                                                    <img src={animeDataHis?.image} alt="its just an images" className="card-img" />
                                                </Link>
                                                <div className="card-details">
                                                    <h5 className="card-title">
                                                        {animeDataHis.title?.userPreferred || animeDataHis.title?.english || animeDataHis.romaji}
                                                    </h5>
                                                </div>
                                            </div>
                                        </div >
                                    )
                                })}
                            </div>
                            <div className="loadmore-recent">
                                <button className="loadmore">View More</button>
                            </div>
                        </div>
                    </div>
                </section >

            </div >
        </>
    );
};

export default History;
