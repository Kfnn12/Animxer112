import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Footer } from "../Components/";
import LoadingBar from "react-top-loading-bar";
import ReplyIcon from '@mui/icons-material/Reply';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import Cookie from "js-cookie"

export default function Stream(props) {
  const { episodeId } = useParams()
  const [data, setData] = useState([]);
  const { animeId } = useParams()
  const [loading, setLoading] = useState(true)
  const [stream, setstream] = useState([])
  const [detail, setDetail] = useState({});
  const [extraDetail, setextraDetail] = useState([]);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  const navigate = useNavigate();
  const containerRef = useRef(null);
  let isMouseDown = false;
  let startX;
  let scrollLeft;

  const handleMouseDown = (event) => {
    isMouseDown = true;
    startX = event.pageX - containerRef.current.offsetLeft;
    scrollLeft = containerRef.current.scrollLeft;
  };

  const handleMouseMove = (event) => {
    if (!isMouseDown) return;
    event.preventDefault();
    const x = event.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    isMouseDown = false;
  };
  // Local Storage Key
  const LOCAL_STORAGE_KEY = "animetrix-vercel-app";

  const getComments = async () => {
    try {
      axios.interceptors.response.use(response => {
        return response;
      }, error => {
        alert(error.response.data.error);
        return;
      });
      const res = await axios.get(`http://localhost:8000/api/v1/discussion/comments/${episodeId}`)
      if (res.data.comments)
        setComments(res.data.comments);
      else
        setComments([]);
    } catch (err) {
      console.log(err);
      alert("Something went wrong please try again later.A")
    }
  }
  const getStream = async () => {
    try {
      const Video = await axios.get(
        `https://animetrix-api.onrender.com/vidcdn/watch/${episodeId}`
      );
      setData(Video.data.Referer);
      setLoading(false);
    }
    catch (err) {
      console.log("Error loading streaming data")
    }
  }

  const getDetails = async () => {
    try {
      const api = await fetch(`https://api.consumet.org/meta/anilist/info/${animeId}`)
      const response = await api.json()
      setDetail(response);
      const responseArray = [response];
      setextraDetail(responseArray)
    }
    catch (err) {
      console.log("Error loading details")
    }
  }
  useEffect(() => {
    getDetails();
    getStream();
    getComments();

  }, [animeId, episodeId]);

  // reply logic
  const [showReplyTextArea, setShowReplyTextArea] = useState(false)

  const handleReplyClick = () => {
    setShowReplyTextArea(!showReplyTextArea)
  }

  const addComment = async (e) => {
    e.preventDefault();
    try {
      const id = Cookie.get("id");
      if (id) {
        axios.interceptors.response.use(response => {
          return response;
        }, error => {
          alert(error.response.data.error);
          return;
        });
        const res = await axios.post(`http://localhost:8000/api/v1/discussion/comment`, {
          sender: id,
          _id: episodeId,
          comment: comment
        })
        getComments();
        return res;
      }
      alert("Login First");
    } catch (err) {
      console.log(err);
      alert("Something went wrong please try again later.B")
    }
  }

  const printComments = () => {
    console.log(comments);
    if (comments.length != 0) {
      return (
        <>
          {comments.map(comment => {
            return (
              <div className="user-comment">
                <div className="user-img">
                  <img src={comment.sender.profile ? comment.sender.profile : ""} alt="user-img" />
                </div>
                <div className="user-name-time-text">
                  <div className="user-name-time">
                    <span className="user-name">{comment.sender.name}</span>
                    <span>{String(comment.createdAt).substring(11, 16)}</span>
                  </div>
                  <div className="user-text">
                    <p>
                      {comment.comment}
                    </p>
                  </div>
                  <div className="reply-like-replies">
                    {/* <button><ThumbUpIcon /></button>
                          <button><ThumbDownIcon /></button> */}
                  </div>
                </div>
              </div>
            )
          })}
        </>)
    } else {
      return (<h1>No Comments Posted</h1>)
    }
  }
  return (
    <>
      <LoadingBar
        color='#0000FF'
        progress={100}
        height={5}
        shadow='true'
      />
      {loading ? (
        <div className="spinner-box">
          <div className="configure-border-1">
            <div className="configure-core"></div>
          </div>
          <div className="configure-border-2">
            <div className="configure-core"></div>
          </div>
        </div>

      ) : (
        <>
          <div className="stream" key={episodeId}>
            <div className="stream-container">
              <div className="video-title">
                <span>{detail.title.romaji}</span>
                <p>
                Note :- Refresh the page if the player doesnt load (server
                  except Vidstreaming might contain ads use an adblocker to
                  block ads)
                </p>
              </div>
              <div className="video-player-list">
                {/* Video Player */}
                <div className="video-player">
                  <iframe
                    src={data}
                    scrolling="no"
                    frameBorder="0"
                    allowFullScreen="allowfullscreen"
                    webkitallowfullscreen="true"
                    title={episodeId}
                  />
                </div>

                {/* Episode List */}
                <div className="list-box">
                  <div className="episode-list">
                    {detail.episodes.map((ep) => (
                      <>
                        <Link to={`/watch/${ep.id}/${animeId}`}>
                          {ep.id === episodeId ? (
                            <button className="active">
                              {ep.number}
                            </button>
                          ) : ep.number % 2 === 0 ? (
                            <button>{ep.number}</button>
                          ) : (
                            <button>{ep.number}</button>
                          )}
                        </Link>
                      </>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {extraDetail.map((extra) => {
              return (
                <>
                  <div className="airing-extra-info">
                    {extra.nextAiringEpisode == undefined ? (
                      <h1></h1>
                    ) : (
                      <h2>
                        Episode {extra.nextAiringEpisode.episode} will air at{" "}
                        {new Date(
                          extra.nextAiringEpisode.airingTime * 1000
                        ).toLocaleString()}
                      </h2>
                    )}
                  </div>
                  <div className="characters-container">
                    <div className="characters-heading">
                      <h2>Characters</h2>
                    </div>
                    <div className="characters" onMouseDown={handleMouseDown}
                      onMouseMove={handleMouseMove}
                      onMouseUp={handleMouseUp} ref={containerRef}>
                      {
                        extra.characters.map((character) => {
                          console.log(character)
                          return <div className="character">
                            <img src={character.image} alt="" />
                            <p>{character.name.full}</p>
                          </div>
                        })
                      }
                    </div>
                    </div>
                </>
              )
            })}
            {/* discussion */}
            <div className="comments">
              <div className="comments-header">
                <h3>Comments</h3>
              </div>

              <div className="comment-section">
                <div className="send-comment">
                  <textarea
                    name=""
                    id=""
                    placeholder="Leave a comment"
                    onChange={e => { setComment(e.target.value) }}
                  ></textarea>
                  <button onClick={e => { addComment(e) }}>Comment</button>
                </div>

                <div className="comment-field">

                  {printComments()}
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
}