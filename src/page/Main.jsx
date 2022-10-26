import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Filter from "../components/main/Filter";
import Pagination from "../components/main/Pagination";
import Poster from "../components/Poster";
import Search from "../components/main/Search";
import tmdbApi from "../api/tmdbApi";
import apiConfig from "../api/apiConfig";
import ListContent from "../components/main/ListContent";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Mousewheel, Keyboard } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import MenuType from "../components/main/MenuType";

import { Helmet } from "react-helmet";

const Main = () => {
  const [activeGenre, setActiveGenre] = useState([]);
  const [listSearch, setListSearch] = useState({});
  const [movieItems, setMovieItems] = useState([]);
  const [pageEx, setPageEx] = useState(1);
  const [popularList, setPopularList] = useState([]);
  const [tvPopularList, setTvPopularList] = useState([]); // сериалы тут
  const [itemContent, setItemContent] = useState([]);
  const [typeContent, setTypeContent] = useState("");
  const imageCollection = [];

  popularList.forEach((item) => {
    const image = apiConfig.originalImage(item.backdrop_path);
    imageCollection.push(image);
  });

  const handleTypeAndItems = (movie) => {
    if (movie) {
      setListSearch("");
      setItemContent(movieItems);
      setTypeContent("movie");
    } else {
      setListSearch("");
      setItemContent(tvPopularList);
      setTypeContent("tv");
    }
  };

  useEffect(() => {
    const getMoviesWithGeter = async () => {
      const params = { page: pageEx };
      const popular = { page: 1 };

      const response = await tmdbApi.getMovieByCategory(activeGenre, {
        params,
      });
      const result = await tmdbApi.getMovieByCategory({ popular });
      const tvPopular = await tmdbApi.getTvPopular(pageEx); // СЕРИАЛЫ ТУТ
      setMovieItems(response.results);
      setPopularList(result.results);
      setTvPopularList(tvPopular.results); // СЕРИАЛЫ ТУТ
      ////////////////////////////  ИЗНАЧАЛЬНОЕ ЗАПОЛНЕНИЕ СТАЛО РЕШЕНИЕМ, НО ЧЕРЕЗ ФУНКЦИЮ В КОТОРУЮ ЗАНЕСЕНЫ ЭТИ ДВА ДЕЙСТВИЯ ЭТО НЕ ВЫХОДИЛО, НО ТУТ ДАННЫЕ ПЕРЕДАЮТСЯ НАПРЯМУЮ
      setItemContent(response.results);
      setTypeContent("movie");
      console.log(itemContent);
      ////////////////////////////
    };
    getMoviesWithGeter();
  }, [activeGenre, pageEx, listSearch, setItemContent]);

  return (
    <div>
      <Helmet>
        <title>Movie Together</title>
      </Helmet>
      <div className="min-w-[300px] max-w-[1000px] mx-auto w-full min-h-screen ">
        <MenuType
          movieItems={movieItems}
          handleTypeAndItems={handleTypeAndItems}
          setListSearch={setListSearch}
          setMovieItems={setMovieItems}
        />
        {/* <div>
        <div className="flex justify-between items-center bg-[#0e1921] h-[38px] w-[1000px] mx-auto">
          <div className="flex gap-1">
            <div className="bg-[#3a5162] h-9 w-56 text-center text-white">
              <Link to={"/"}>
                <a>
                  <button onClick={() => handleTypeAndItems(movieItems)}>
                    <div className="px-3 py-2 text-base rounded-full hover:scale-[1.05]">
                      MOVIE
                    </div>
                  </button>
                </a>
              </Link>
            </div>
            <div className="bg-[#3a5162] h-9 w-56 text-center text-white">
              <Link to={"/"}>
                <a>
                  <button onClick={() => handleTypeAndItems(!movieItems)}>
                    <div className="px-3 py-2 text-base rounded-full hover:scale-[1.05]">
                      SERIES
                    </div>
                  </button>
                </a>
              </Link>
            </div>
          </div>
          <div className=" pr-2">
            <Search setListSer={setListSerch} setMovieItems={setMovieItems} />
          </div>
        </div>
      </div> */}
        {/* {movieItems.length && ( */}
        <div className=" max-w-[1600] w-full h-full bg-[#0f2c41] mx-auto rounded-sm">
          {!listSearch.results ? (
            <div>
              <h2 className="text-2xl py-2 ml-16 pt-4">Popular:</h2>
              <div className="flex justify-center">
                <div className="relative max-w-[900px] w-full px-4">
                  <Swiper
                    cssMode={true}
                    // spaceBetween={25}
                    // slidesPerView={5.8}
                    keyboard={true}
                    mousewheel={true}
                    // navigation={true}
                    modules={[Mousewheel, Keyboard, Navigation]}
                    breakpoints={{
                      320: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                      },
                      480: {
                        slidesPerView: 3.3,
                        spaceBetween: 30,
                      },
                      640: {
                        slidesPerView: 5,
                        spaceBetween: 30,
                      },
                      780: {
                        slidesPerView: 5.8,
                        spaceBetween: 30,
                      },
                    }}
                    className="py-12"
                  >
                    {popularList.map((item, index) => (
                      <SwiperSlide className="py-4" key={index}>
                        <Link to={`/movie/movie_${item.id}_${item.title}`}>
                          <Poster movie={item} />
                        </Link>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  {/* <div className=" absolute -left-10 top-4">
                <span className="flex items-center justify-center h-[200px] w-8 bg-[#0e1921]">
                  {"<"}
                </span>
              </div>
              <div className=" absolute -right-10 top-4">
                <span className="flex items-center justify-center h-[200px] w-8 bg-[#0e1921]">
                  {">"}
                </span>
              </div> */}
                </div>
              </div>
            </div>
          ) : (
            <div className="pl-24 flex items-center">
              <div className="h-24 text-2xl flex items-center">Search:</div>
              {/* <br /> */}
            </div>
          )}
          <div className="flex justify-between items-center w-full bg-[#0e1921]  relative ">
            {!listSearch.results && (
              <div className="py-2">
                <div className="absolute -top-12 left-16 text-2xl">
                  Category
                </div>
                <div className="">
                  <Filter
                    setPageEx={setPageEx}
                    setActiveGenre={setActiveGenre}
                    activeGenre={activeGenre}
                    handleTypeAndItems={handleTypeAndItems}
                    movieItems={movieItems}
                    setMovieItems={setMovieItems}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="m-auto pt-6 px-6 rounded-lg max-w-[1100px] ">
            <div className="flex flex-wrap gap-8 justify-center py-8">
              {/* For Serch List */}
              {listSearch.results &&
                listSearch.results.map((movie, index) => (
                  <div key={index}>
                    {movie && (
                      <Link
                        to={`/movie/${movie.title ? "movie" : "tv"}_${
                          movie.id
                        }_${movie.title ? movie.title : movie.name}`}
                      >
                        {movie.poster_path && <Poster movie={movie} />}
                      </Link>
                    )}
                  </div>
                ))}
              {/* For All List */}
              {!listSearch.results && (
                <ListContent
                  itemContent={itemContent}
                  typeContent={typeContent} // в зависимости от типа будут создаваться ссылки или фильм или сериал
                />
              )}
            </div>
          </div>
          {typeContent && (
            <div className="pt-8 pb-12 max-w-2xl m-auto">
              <Pagination
                listSer={listSearch}
                pageEx={pageEx}
                setPageEx={setPageEx}
                handleTypeAndItems={handleTypeAndItems}
                movieItems={movieItems}
              />
            </div>
          )}
        </div>
        {/* )} */}
      </div>
    </div>
  );
};

export default Main;
