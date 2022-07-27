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
import { Pagination as SwiperPagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

const Main = () => {
  const [activeGenre, setActiveGenre] = useState([]);
  const [listSer, setListSer] = useState({});
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
      setItemContent(movieItems);
      setTypeContent("movie");
    } else {
      setItemContent(tvPopularList);
      setTypeContent("tv");
    }
  };

  useEffect(() => {
    const getMoviesWithGeter = async () => {
      const params = { page: pageEx };
      const popular = { page: 1 };
      try {
        const response = await tmdbApi.getMovieByCategory(activeGenre, {
          params,
        });
        const result = await tmdbApi.getMovieByCategory({ popular });
        const tvPopular = await tmdbApi.getTvPopular(pageEx);
        setMovieItems(response.results);
        setPopularList(result.results);
        setTvPopularList(tvPopular.results); // СЕРИАЛЫ ТУТ
      } catch {
        console.log("error");
      }
    };
    getMoviesWithGeter();
  }, [activeGenre, pageEx, listSer]);

  const handleHome = () => {
    setListSer({});
  };

  return (
    <div className="min-w-[300px] max-w-[1200px] mx-auto w-full min-h-screen ">
      {/* <h2 className='text-3xl font-bold ml-6 sm:ml-12 pb-4'>Popular</h2> */}
      {/* <div className="py-2 mx-auto">
        <Swiper
          modules={[SwiperPagination]}
          pagination={{ clickable: true }}
          loop={true}
          autoplay={{ delay: 50 }}
          className="relative rounded-xl w-full h-full "
        >
          {popularList.map((item, index) => (
            <SwiperSlide key={index}>
              <Link Link to={`/movie/movie_${item.id}_${item.title}`}>
                <img
                  src={imageCollection[index]}
                  className="object-cover rounded-xl overflow-hidden relative top-0 "
                  alt={item.title}
                />
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-transparent via-transparent to-[#111827D9]" />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div> */}
      <div className="flex justify-center items-center pt-4">
        {listSer.results && (
          <button
            onClick={handleHome}
            className={"text-xl font-bold text-center bg-red-500 w-8 h-8"}
          >
            Х
          </button>
        )}
        <Search setListSer={setListSer} setMovieItems={setMovieItems} />
      </div>
      <div className="w-full flex py-4">
        <button
          className=" w-1/2 item-center"
          onClick={() => handleTypeAndItems(movieItems)}
        >
          MOVIE
        </button>
        <button
          className=" w-1/2 item-center"
          onClick={() => handleTypeAndItems(!movieItems)}
        >
          SERIES/TVshows/ANIME
        </button>
      </div>
      {!listSer.results && typeContent == "movie" && (
        <div className="py-2">
          <Filter
            setPageEx={setPageEx}
            setActiveGenre={setActiveGenre}
            activeGenre={activeGenre}
            handleTypeAndItems={handleTypeAndItems}
            movieItems={movieItems}
            setMovieItems={setMovieItems}
          />
        </div>
      )}

      <div className="m-auto pt-6 px-6 rounded-lg max-w-[1100px]">
        <div className="flex flex-wrap gap-8 justify-center py-8">
          {/* For Serch List */}
          {listSer.results &&
            listSer.results.map((movie, index) => (
              <div key={index}>
                {movie && (
                  <Link
                    to={`/movie/${movie.title ? "movie" : "tv"}_${movie.id}_${
                      movie.title ? movie.title : movie.name
                    }`}
                  >
                    {movie.poster_path && <Poster movie={movie} />}
                  </Link>
                )}
              </div>
            ))}
          {/* For All List */}
          {!listSer.results && (
            <ListContent itemContent={itemContent} typeContent={typeContent} />
          )}
        </div>
      </div>
      {typeContent && (
        <div className="pt-8 pb-12 max-w-2xl m-auto">
          <Pagination
            listSer={listSer}
            pageEx={pageEx}
            setPageEx={setPageEx}
            handleTypeAndItems={handleTypeAndItems}
            movieItems={movieItems}
          />
        </div>
      )}
    </div>
  );
};

export default Main;
