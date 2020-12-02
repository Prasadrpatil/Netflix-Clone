import React, { useState, useEffect } from "react";
import "./Row.css";
import axios from "./axios";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const imgBaseUrl = "https://image.tmdb.org/t/p/original/";

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  const fetchData = async () => {
    //
    const request = await axios.get(fetchUrl);

    setMovies(request.data.results);

    return request;
  };

  useEffect(() => {
    //
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  const imgClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || "")
        .then((url) => {
          console.log(url);
          /* NOTE To extract the text after the ? in the URL 
          https://www.youtube.com/watch?v=ZKxvBsGVKR8
          */
          const urlParams = new URLSearchParams(new URL(url).search);
          console.log(urlParams.get("v")); //Getting the value of the v like v=10 in this case Url String
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="row">
      <h1> {title} </h1>

      <div className="row__posters">
        {movies.map((movie) => (
          <img
            onClick={() => {
              imgClick(movie);
            }}
            key={movie.id}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`${imgBaseUrl}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
};

export default Row;
