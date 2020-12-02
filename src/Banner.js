import React, { useState, useEffect } from "react";
import requests from "./request";
import instance from "./axios";
import "./Banner.css";

const Banner = ({ title }) => {
  const [movie, setMovie] = useState([]);

  const fetchData = async () => {
    const request = await instance.get(requests.fetchNetflixOrignals);

    setMovie(
      request.data.results[
        Math.floor(Math.random() * request.data.results.length - 1)
      ]
    );
  };
  console.log("MVI>>>", movie);
  useEffect(() => {
    fetchData();
  }, []);

  const turncate = (str, n) => {
    return str?.lenght > n ? str.substr(0, n - 1) + "..." : str;
  };

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "banner__cover",
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie?.backdrop_path}`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        <h1 className="banner__description">
          {" "}
          {turncate(movie.overview, 150)}{" "}
        </h1>
      </div>
      <div className="banner__fadebottom"></div>
    </header>
  );
};

export default Banner;
