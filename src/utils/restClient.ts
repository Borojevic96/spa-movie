import axios from "axios";

const restClient = axios.create({
  baseURL: "https://api.themoviedb.org/",
});

export default restClient;
