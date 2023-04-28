import axios from "axios";
import React, { useEffect, useState, useRef, useId, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Footer } from "../Components/";
import LoadingBar from "react-top-loading-bar";
import ReplyIcon from '@mui/icons-material/Reply';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import Cookie from "js-cookie"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Hls from 'hls.js';
import Artplayer from "../Components/ArtPlayer";
import { HomeApi, ServerApi, StreamApi } from "../Components/constants";


export default function Stream(props) {
  const { episodeId } = useParams()
  const [data, setData] = useState(null);
  const [userId, setUserId] = useState("");
  const { animeId } = useParams()
  const [loading, setLoading] = useState(true)
  const [stream, setstream] = useState([])
  const [detail, setDetail] = useState({});
  const [extraDetail, setextraDetail] = useState([]);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [download, setDownload] = useState("")
  const [quality, setQuality] = useState([])
  const [external,setExternal] = useState([])
  const [displayArtPlayer, setDisplayArtPlayer] = useState(true);
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
  const getStream = useCallback(async () => {
    try {
      const Video = await axios.get(
        `${HomeApi}/anime/gogoanime/watch/${episodeId}`
      );
      setData(Video?.data?.sources[0]?.url);
      console.log("Current video URL:", Video?.data?.sources[0]?.url);
      console.log(episodeId)
      setDownload(Video?.data?.download)
      setQuality(Video?.data?.sources)
      console.log("Current episodeId:", episodeId);
      setExternal(Video?.data?.headers?.Referer)
      setLoading(false);
    }
    catch (err) {
      console.log("Error loading streaming data");
    }
  },[episodeId])
  function playM3u8(video, url, art) {
    if (Hls.isSupported()) {
      if (art.hls) art.hls.destroy();
      const hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(video);
      art.hls = hls;
      art.on('destroy', () => hls.destroy());
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = url;
    } else {
      art.notice.show = 'Unsupported playback format: m3u8';
    }
  }
  const getDetails = async () => {
    try {
      const api = await fetch(`${HomeApi}/meta/anilist/info/${animeId}`)
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
    getStream();
  }, [animeId, episodeId]);

  // reply logic
  // const [showReplyTextArea, setShowReplyTextArea] = useState(false)

  // const handleReplyClick = () => {
  //   setShowReplyTextArea(!showReplyTextArea)
  // }
  const handleInternalClick = () => {
    setDisplayArtPlayer(true);
  };

  const handleExternalClick = () => {
    setDisplayArtPlayer(false);
  };
 



  

  return (
    <>
      <ToastContainer />
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
                <span>{detail.title?.romaji}</span>
                <p>
                  New note will be added soon
                </p>
              </div>
              <div className="video-player-list">
                {/* Video Player */}
                <div className="video-player">
                  {displayArtPlayer ? <Artplayer
                    option={{
                      container: '.artplayer-app',
                      url: `${data}`,
                      title: `${episodeId}`,
                      type: 'm3u8',
                      // poster: 'https://artworks.thetvdb.com/banners/v4/episode/9734759/screencap/6444c0490de38.jpg',
                      volume: 1,
                      controlBar: true,
                      isLive: false,
                      muted: false,
                      autoplay: false,
                      pip: true,
                      autoSize: true,
                      autoMini: true,
                      screenshot: true,
                      setting: true,
                      loop: true,
                      flip: false,
                      playbackRate: true,
                      aspectRatio: true,
                      fullscreen: true,
                      fullscreenWeb: true,
                      subtitleOffset: false,
                      miniProgressBar: true,
                      mutex: true,
                      backdrop: true,
                      playsInline: true,
                      autoPlayback: true,
                      airplay: true,
                      theme: '#2196F3',
                      customType: {
                        m3u8: playM3u8,
                      },
                      lang: navigator.language.toLowerCase(),
                      whitelist: ['*'],
                      moreVideoAttr: {
                        crossOrigin: 'anonymous',
                      },
                      quality: quality.map((q) => ({
                        html: `${q.quality}`,
                        url: `${q.url}`,
                      })),
                      controls: [
                        {
                          position: 'right',
                          html: '<i class="fa-solid fa-download"></i>',
                          index: 1,
                          tooltip: 'Download',
                          style: {
                            marginRight: '10px',
                          },
                          click: function () {
                            window.open(download)
                          },
                        },
                      ],

                    }}
                    style={{
                      width: '600px',
                      height: '400px',
                      margin: '60px auto 0',
                    }}
                  // getInstance={(art) => console.info(art)}
                  /> : <iframe
                    src={external}
                    scrolling="no"
                    frameBorder="0"
                    allowFullScreen="allowfullscreen"
                    webkitallowfullscreen="true"
                    title={episodeId}
                  />}
                </div>


                {/* Episode List */}
                <div className="list-box">
                  <div className="episode-list">
                    {detail?.episodes?.map((ep) => (
                      <>
                        <Link to={`/watch/${ep.id}/${animeId}`} onClick={() => getStream(ep.id)}>
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
                  <div className="loadmore-recent">
                    <button className="loadmore" onClick={handleInternalClick}>Internel Player</button>
                    <button className="loadmore" onClick={handleExternalClick}>External Player</button>
                  </div>
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
                  <div className="previous-seasons">
                    {detail?.relations?.map((relatedSeason) => {
                      return (
                        <div className="related-seasons">
                          <Link to={`/anime-details/${relatedSeason?.id}`}>
                            <img src={relatedSeason.image} alt="" className="image-related" />
                          </Link>
                          <div className="title-and-type">
                            <h1>{relatedSeason?.title?.userPreferred}...</h1>
                            <span>{relatedSeason?.type}</span>
                          </div>
                        </div>
                      )

                    })}
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
          </div>
          <Footer />
        </>
      )}
    </>
  );
}