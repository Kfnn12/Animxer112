import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from "react-router-dom";
import spinner from "../img/spinner.svg";
import { Card } from '../Components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function OptionFetcher() {

  const [selectedOption, setSelectedOption] = useState('Action');

  const [data, setData] = useState([]);

  const [page, setPage] = useState(1);

  const [isLoading, setIsLoading] = useState(false);
const [isBookmark, setIsBookmark] = useState(false);
  //bookmark
  function handleIconClick() {
     setIsBookmark(!isBookmark);
  }

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
        `https://animetrix-api.vercel.app/meta/anilist/advanced-search?genres=["${selectedOption}"]&&page=${page}`
      );
      const responseData = await response.json();
      console.log(responseData)
      setData([...data, ...responseData.results]);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("Error loading genre", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        rtl: false,
        pauseOnFocusLoss: true,
        draggable: true,
        pauseOnHover: true,
        theme: "dark",
      });
      
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
        `https://animetrix-api.vercel.app/meta/anilist/advanced-search?genres=["${selectedOption}"]&&page=${page + 1}`
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
           <ToastContainer/>
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
              {data.map(rec => (
                <Card rec={rec} key={rec.id}/>
              ))}
            </div>
          </InfiniteScroll>
        )}
      </section>
    </>
  );
}


export default OptionFetcher;
