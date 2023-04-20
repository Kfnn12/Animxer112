import React, { useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import spinner from "../img/spinner.svg";
import Card from "../Components/Card";

import { useFetchInitialData } from "../utils/hooks";
import { Link } from "react-router-dom";
const Movie = (props) => {
  const ref = useRef(null);

  const handelClick = () => {
    props.handelClick();
  };
  const loadMore = () => {
    props.loadMoreMovies();
  };

  const { loading, movie, loadMoreMovies } = props;

  useFetchInitialData(loading, movie, loadMoreMovies, ref, window)

  return (
    <>
      {Object.keys(props.recent).length === 0 ? (
        <div class="spinner-box">
          <div class="configure-border-1">
            <div class="configure-core"></div>
          </div>
          <div class="configure-border-2">
            <div class="configure-core"></div>
          </div>
        </div>
      ) : (
        <>
          <section className="movies">
            <div className="filter-bar">
              <div className="heading">
                <h3>Anime Movies</h3>
              </div>
            </div>
            <div className="movies-grid" ref={ref}>
              {props.recent.map((rec) => (
                <div
                  className="movie-card" onClick={() => props.handelClick()} key={rec.id}>
                  <div className="card-head">
                    <div className="bookmark-icon">
                      <i class="fa-solid fa-bookmark"></i>
                    </div>
                    <Link to={`/anime-details/${rec.id}`}>
                      <img
                        src={rec.image}
                        alt={rec.title?.romanji}
                        className="card-img"
                      />
                    </Link>
                    <div className="card-details">
                      <div className="episode-total">
                        <span>{(rec.releaseDate)}</span>
                        <span>{(rec.rating/10)}</span>
                      </div>
                      <h5 className="card-title">{(rec.title?.userPreferred)}</h5>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <InfiniteScroll
              dataLength={props.recent.length}
              next={loadMore}
              hasMore={true}
              loader={<img src={spinner} alt="spinner" className="spinner" />}
            ></InfiniteScroll>
          </section>
        </>
      )}
    </>
  );
};

export default Movie;
