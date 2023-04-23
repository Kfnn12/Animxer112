import React, { useState } from 'react';
import { Link } from "react-router-dom";

export default function Card(props) {
  const [isBookmark, setIsBookmark] = useState(false);
  //bookmark
   function handleIconClick() {
     setIsBookmark(!isBookmark);
  }
  return (
   
    <>
      <div
        className="movie-card" onClick={() => props.handelClick()}>
        <div className="card-head">
          
          <div className="bookmark-icon" onClick={handleIconClick}>
            
            <i class={isBookmark ? "fa-regular fa-bookmark" : "fa-solid fa-bookmark"} ></i>
          </div>
          <Link to={`/anime-details/${props.rec.id}`}>
            <img
              src={props.rec.image}
              alt={props.rec.id}
              className="card-img"
            />
          </Link>
          <div className="card-details">
            <div className="episode-total">
              <span>{(props.rec.totalEpisodes)}</span>
              <span>{(props.rec.rating/10)}</span>
            </div>
            <h5 className="card-title">{props.rec.title.userPreferred||props.rec.title.english||props.rec.romaji}</h5>
          </div>
        </div>
      </div>
    </>
  );
}
