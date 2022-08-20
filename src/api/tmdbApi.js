import apiConfig from "./apiConfig";
import axiosClient from "./axiosClient";

const ru = "ru-Ru";
const eng = "en-En";
const language = (language) => {
  if (language) {
    return language;
  } else {
    return eng;
  }
};
const tmdbApi = {
  getMovie: (id) => {
    const url = `movie/${id}?api_key=${
      apiConfig.apiKey
    }&language=${language()}`;
    return axiosClient.get(url);
  },
  getMoviesListBySearch: (movie) => {
    const url = `${apiConfig.baseUrl}search/movie?api_key=${
      apiConfig.apiKey
    }&language=${language()}&query=${movie}`;
    return axiosClient.get(url);
  },
  getMovieByCategory: (genres, params) => {
    const url = `${apiConfig.baseUrl}discover/movie?api_key=${
      apiConfig.apiKey
    }&language=${language()}&with_genres=${genres}`;
    return axiosClient.get(url, params);
  },
  getCollection: (id) => {
    const url = `${apiConfig.baseUrl}collection/${id}?api_key=${
      apiConfig.apiKey
    }&language=${language()}`;
    return axiosClient.get(url);
  },
  getTv: (id) => {
    const url = `tv/${id}?api_key=${apiConfig.apiKey}&language=${language()}`;
    return axiosClient.get(url);
  },
  getTvPopular: (page) => {
    const url = `tv/popular?api_key=${
      apiConfig.apiKey
    }&language=${language()}&page=${page}`;
    return axiosClient.get(url);
  },
  getTvBySearch: (tv) => {
    const url = `${apiConfig.baseUrl}search/tv?api_key=${
      apiConfig.apiKey
    }&language=${language()}&query=${tv}`;
    return axiosClient.get(url);
  },

  // названия на русском для плеера
  getTvTitleBySearch: (tv) => {
    const url = `${apiConfig.baseUrl}search/tv?api_key=${apiConfig.apiKey}&language=ru-RU&query=${tv}`;
    return axiosClient.get(url.title);
  },
};

export default tmdbApi;
