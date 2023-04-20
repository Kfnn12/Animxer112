import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from "react-router-dom";
import spinner from "../img/spinner.svg";

function OptionFetcher() {

  const [selectedOption, setSelectedOption] = useState('Action');

  const [data, setData] = useState([]);

  const [page, setPage] = useState(1);

  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [selectedOption]);


  async function fetchData() {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://api.consumet.org/meta/anilist/advanced-search?genres=["${selectedOption}"]&&page=${page}`
      );
      const responseData = await response.json();

      setData([...data, ...responseData.results]);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }


  function handleChange(event) {

    setSelectedOption(event.target.value);
    setPage(1);
    setData([]);
  }


  async function fetchMoreData() {
    try {
      setPage(page => page + 1);
      const response = await fetch(
        `https://api.consumet.org/meta/anilist/advanced-search?genres=["${selectedOption}"]&&page=${page + 1}`
      );
      const responseData = await response.json();
      setData([...data, ...responseData.results]);
    } catch (error) {
      console.error(error);
    }
  }
  

  useEffect(() => {
    setPage(1);
  }, [selectedOption]);
  

  return (
    <>
      {isLoading && (
        <div className="spinner-box">
          <div className="configure-border-1">
            <div className="configure-core"></div>
          </div>
          <div className="configure-border-2">
            <div className="configure-core"></div>
          </div>
        </div>
      )}
      <section className='movies'>
        <div className="filter-bar genre">
          <div className="filter-dropdowns">
            <select value={selectedOption} onChange={handleChange}>
              {["Action", "Adventure", "Comedy", "Drama", "Fantasy", "Horror", "Mecha", "Mystery", "Romance", "Sci-Fi", "Sports", "Supernatural", "Thriller"].map((genreItem) => {
                return (
                  <option value={genreItem} key={genreItem} >{genreItem}</option>
                )
              })}
            </select>
          </div>
          <div className="heading">
            <h2>Sort By Genre</h2>
          </div>
        </div>
        {data && (
          <InfiniteScroll
            dataLength={data.length}
            next={fetchMoreData}
            hasMore={true}
            loader={<img src={spinner} alt="spinner" className="spinner" />}
          >
            <div className='movies-grid'>
              {data.map(item => (
                <div
                  className="movie-card" key={item.id}>
                  <Link to={`/anime-details/${item.id}`}>
                    <div className="card-head">
                        <img
                          src={item.image}
                          alt={item.id}
                          className="card-img"
                        />
                      <div className="">
                        <h5 className="card-title">{item.title?.userPreferred}</h5>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </InfiniteScroll>
        )}
      </section>
    </>
  );
}


export default OptionFetcher;
