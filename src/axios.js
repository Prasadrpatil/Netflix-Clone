import axios from "axios";

/*BASE Url to make the request to the movie data base */

const instance = axios.create({
  //
  baseURL: "https://api.themoviedb.org/3",
});
// instance.get("/foo-bar");
//https://api.themoviedb.org/3/foo-bar"

export default instance;
