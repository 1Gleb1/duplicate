import apiConfig from "./apiConfig";
import axiosClient from "./axiosClient";

const tmdbApi = {
  getMovie: (id) => {
    const url = `movie/${id}?api_key=${apiConfig.apiKey}&language=en-US`;
    return axiosClient.get(url);
  },
  getMoviesListBySearch: (movie) => {
    const url = `${apiConfig.baseUrl}search/movie?api_key=${apiConfig.apiKey}&language=en-US&query=${movie}`;
    return axiosClient.get(url);
  },
  getMovieByCategory: (genres, params) => {
    const url = `${apiConfig.baseUrl}discover/movie?api_key=${apiConfig.apiKey}&language=en-US&with_genres=${genres}`;
    return axiosClient.get(url, params);
  },
  getCollection: (id) => {
    const url = `${apiConfig.baseUrl}collection/${id}?api_key=${apiConfig.apiKey}&language=en-US`;
    return axiosClient.get(url);
  },
  getTv: (id) => {
    const url = `tv/${id}?api_key=${apiConfig.apiKey}&language=en-US`;
    return axiosClient.get(url);
  },
  getTvPopular: (page) => {
    const url = `tv/popular?api_key=${apiConfig.apiKey}&language=en-US&page=${page}`;
    return axiosClient.get(url);
  },
  getTvBySearch: (tv) => {
    const url = `${apiConfig.baseUrl}search/tv?api_key=${apiConfig.apiKey}&language=en-US&query=${tv}`;
    return axiosClient.get(url);
  },
};

export default tmdbApi;
