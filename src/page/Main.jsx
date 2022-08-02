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
    <div className="min-w-[300px] max-w-[1200px] mx-auto w-full min-h-screen">
      <div className="h-64"></div>

      <div className="flex justify-between items-center w-full bg-pink-900 h-[60px] p-1 px-8">
        <div></div>
        <div className="text-3xl">НАЗВАНИЕ</div>
        <div>account</div>
      </div>
      <div className="flex justify-between items-center w-full bg-red-900 h-[48px]">
        <div className="flex gap-1">
          <div className="bg-blue-500 h-12 w-64 text-center text-black">
            <button onClick={() => handleTypeAndItems(movieItems)}>
              <div className="px-3 py-2 text-xl rounded-full hover:scale-[1.05]">
                MOVIE
              </div>
            </button>
          </div>
          <div className="bg-green-500 h-12 w-64 text-center text-black">
            <button onClick={() => handleTypeAndItems(!movieItems)}>
              <div className="px-3 py-2 text-xl rounded-full hover:scale-[1.05]">
                SERIES
              </div>
            </button>
          </div>
          <div className="bg-purple-500 h-12 w-64 text-center text-black">
            <button onClick={() => handleTypeAndItems(!movieItems)}>
              <div className="px-3 py-2 text-xl rounded-full hover:scale-[1.05]">
                Cartoon
              </div>
            </button>
          </div>
        </div>
        <div className="pt-1 pr-2">
          <Search setListSer={setListSer} setMovieItems={setMovieItems} />
        </div>
      </div>

      <div className=" max-w-[1600] w-full h-full bg-gray-600 mx-auto rounded-sm">
        <h2 className="text-3xl ml-6 sm:ml-12 py-6 pl-10">Popular :)))</h2>
        <div className="flex justify-center">
          <div className="relative w-full max-w-5xl h-72">
            <Swiper
              // className="relative rounded-xl w-full h-full flex max-w-5xl"\
              cssMode={true}
              spaceBetween={25}
              slidesPerView={5.2}
              keyboard={true}
              mousewheel={true}
              // navigation={true}
              modules={[Mousewheel, Keyboard, Navigation]}
            >
              {popularList.map((item, index) => (
                // <SwiperSlide key={index}>

                //   <Link Link to={`/movie/movie_${item.id}_${item.title}`}>
                //     <img
                //       src={imageCollection[index]}
                //       className="object-cover rounded-xl overflow-hidden relative top-0 "
                //       alt={item.title}
                //     />
                //     <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-transparent via-transparent to-[#111827D9]" />
                //   </Link>
                // </SwiperSlide>
                <SwiperSlide key={index}>
                  <Poster movie={item} />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className=" absolute -left-16 top-0">
              <span className="flex items-center justify-center h-[260px] w-12 bg-gray-800">
                {"<"}
              </span>
            </div>
            <div className=" absolute -right-16 top-0">
              <span className="flex items-center justify-center h-[260px] w-12 bg-gray-800">
                {">"}
              </span>
            </div>
          </div>
        </div>

        {/* <div className="max-w-xl m-auto py-4 ">
          <div className="flex justify-between">
            <button onClick={() => handleTypeAndItems(movieItems)}>
              <div className="px-3 py-2 bg-gray-600 rounded-full hover:scale-[1.05]">
                MOVIE
              </div>
            </button>
            <button onClick={() => handleTypeAndItems(!movieItems)}>
              <div className="px-3 py-2 bg-gray-600 rounded-full hover:scale-[1.05]">
                SERIES/TVshows/ANIME
              </div>
            </button>
          </div>
        </div> */}

        <div className="flex justify-between items-center w-full bg-red-900 h-[150px] my-20 relative">
          <div className="absolute -top-8 left-5">КАТЕГОРИИИИИИИИ...</div>
          {!listSer.resultsS && (
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
        </div>

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
              <ListContent
                itemContent={itemContent}
                typeContent={typeContent}
              />
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
    </div>
  );
};

export default Main;
