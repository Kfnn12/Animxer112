import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";

const ForYou = () => {
  const [forYou, setforYou] = useState([])
  const getRandom = async () => {
    try {
      const api = await fetch(`https://api.consumet.org/meta/anilist/random-anime`)
      const response = await api.json()
      setforYou(response)
      console.log(response)
    }
    catch (error) {
      console.log("Error loading recommended for you")
    }
  }
  useEffect(() => {
    getRandom();
  }, [])
  return (
    <>
      {forYou && (
        forYou?.recommendations?.map((recAnime) => {
          <section className='movies'>
            <div className='filter-bar'>
              <div className="heading">
                <h3>Recommended For you</h3>
              </div>
            </div>
            <div className="seasons-grid">
              return (
              <>
                <div
                  className="movie-card">
                  <div className="card-head">
                    <div className="bookmark-icon">
                      <i class="fa-solid fa-bookmark"></i>
                    </div>
                    <Link to={`/anime-details/${recAnime.id}`}>
                      <img
                        src={recAnime.image}
                        alt={recAnime.id}
                        className="card-img"
                      />
                    </Link>
                    <div className="card-details">
                      <div className="episode-total">
                        <span>{(recAnime.episodes)}</span>
                        <span>{(recAnime.rating / 10)}</span>
                      </div>
                      <h5 className="card-title">{(recAnime.title?.userPreferred)}</h5>
                    </div>
                  </div>
                </div>
              </>
              )

            </div>
          </section>
        })
      )}
    </>
  )
}

export default ForYou