import React, { useState, useRef, useEffect } from "react";

import { Card, Lastwatch, Slider, AiringSchedule, ForYou, Footer, UpcomingSeason } from "../Components"
import { NewSeason } from "../Pages"
import { Link } from "react-router-dom";
import { useFetchInitialData } from "../utils/hooks";
import { HomeApi } from "../Components/constants";
// import History from "../Components/History";
const RecentAnime = (props) => {
  const renderAfterCalled = useRef(false);
  const [isBookmark, setIsBookmark] = useState(false);
  const [airingList, setairingList] = useState([])
  const getAiring = async () => {
    try {
      const api = await fetch(`${HomeApi}/meta/anilist/airing-schedule?notYetAired=true`)
      const response = await api.json()
      setairingList(response.results)
    }
    catch (error) {
      console.log("Error loading top airing list")
    }
  }

  //bookmark
  function handleIconClick() {
    setIsBookmark(!isBookmark);
  }

  useEffect(() => {
    if (!renderAfterCalled.current) {
      getAiring()
    }
    renderAfterCalled.current = true;
  }, []);
  const ref = useRef(null);

  const handelClick = () => {
    props.handelClick();
  };
  function scroll() {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
  }

  const { loading, recent, loadMoreRecent } = props;

  useFetchInitialData(loading, recent, loadMoreRecent, ref, window)

  return (
    <>
      <Slider />
      {Object.keys(props.recent).length === 0 ? (
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
          {/* <History/> */}
          <br /><br />
          <section className="movies">
            <div className="filter-bar">
              <div className="heading">
                <h3>Recent Anime</h3>
              </div>
            </div>
            <div className="seasons-grid">
              {props.recent &&
                props.recent.map((rec) => (
                  <Card rec={rec} key={rec.id} handelClick={handelClick}/>
                ))}
            </div>
            <div className="loadmore-recent">
              <Link to="/recent-anime" onClick={scroll}>
                <button className="loadmore">View More</button>
              </Link>
            </div>
          </section>

          <section className="movies">
            <div className="filter-bar">
              <div className="heading">
                <h3>Popular</h3>
              </div>
            </div>
            <div className="seasons-grid">
              {props.popular.map((rec) => (
                <Card
                  rec={rec}
                  key={rec.id} handelClick={handelClick}
                />
              ))}
            </div>
            <div className="loadmore-recent">
              <Link to="/popular" onClick={scroll}>
                <button className="loadmore">View More</button>
              </Link>
            </div>
          </section>
          <ForYou />
          <br /><br />
          <UpcomingSeason />
          <br /><br />
          <AiringSchedule airingList={airingList} ref={ref} />
          <Footer />
        </>
      )}
    </>
  );
};
export default RecentAnime;
