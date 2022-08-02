import { BiMoviePlay } from "react-icons/bi";
import {
  GiTreasureMap,
  GiHandcuffs,
  GiMusicalNotes,
  GiBattleTank,
  GiGhost,
  GiMushroomCloud,
  GiAllSeeingEye,
  GiBookmarklet,
  GiBloodyStash,
  GiDramaMasks,
  GiPlagueDoctorProfile,
  GiCharm,
  GiBackup,
  GiBalloons,
  GiFallingBlob,
  GiWesternHat,
} from "react-icons/gi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";

const Filter = ({
  activeGenre,
  setActiveGenre,
  setPageEx,
  handleTypeAndItems,
}) => {
  const genres = [
    {
      name: "All",
      icon: <BiMoviePlay className="text-6xl text-white" />,
      code: null,
      bgColor: "bg-indigo-800",
    },
    {
      name: "Action",
      icon: <GiMushroomCloud className="text-6xl text-yellow-700" />,
      code: "28",
      bgColor: "bg-yellow-900",
    },
    {
      name: "Adventure",
      icon: <GiTreasureMap className="text-6xl text-amber-700" />,
      code: "12",
      bgColor: "bg-amber-800",
    },
    // {
    //   name: "Animation",
    //   icon: <GiBalloons className="text-6xl text-yellow-500" />,
    //   code: "35",
    //   bgColor: "bg-yellow-700",
    // },
    {
      name: "Crime",
      icon: <GiHandcuffs className="text-6xl text-gray-500" />,
      code: "80",
      bgColor: "bg-gray-700",
    },
    {
      name: "Documentary",
      icon: <GiPlagueDoctorProfile className="text-6xl text-lime-600" />,
      code: "99",
      bgColor: "bg-lime-800",
    },
    {
      name: "Drama",
      icon: <GiDramaMasks className="text-6xl text-zinc-600" />,
      code: "18",
      bgColor: "bg-zinc-800",
    },
    {
      name: "Family",
      icon: <GiBackup className="text-6xl text-rose-600" />,
      code: "10751",
      bgColor: "bg-rose-800",
    },
    {
      name: "History",
      icon: <GiBookmarklet className="text-6xl text-cyan-600" />,
      code: "36",
      bgColor: "bg-cyan-800",
    },
    {
      name: "Horror",
      icon: <GiBloodyStash className="text-6xl text-red-600" />,
      code: "27",
      bgColor: "bg-red-800",
    },
    {
      name: "Music",
      icon: <GiMusicalNotes className="text-6xl text-gray-600" />,
      code: "10402",
      bgColor: "bg-gray-800",
    },
    {
      name: "Mystery",
      icon: <GiAllSeeingEye className="text-6xl text-emerald-600" />,
      code: "9648",
      bgColor: "bg-emerald-800",
    },
    // {
    //   name: "Romance",
    //   icon: <GiCharm className="text-6xl text-pink-600" />,
    //   code: "10749",
    //   bgColor: "bg-pink-800",
    // },
    {
      name: "Science Fiction",
      icon: <GiFallingBlob className="text-6xl text-orange-600" />,
      code: "878",
      bgColor: "bg-orange-800",
    },
    {
      name: "Thriller",
      icon: <GiGhost className="text-6xl text-slate-600" />,
      code: "53",
      bgColor: "bg-slate-800",
    },
    {
      name: "War",
      icon: <GiBattleTank className="text-6xl text-green-600" />,
      code: "10752",
      bgColor: "bg-green-800",
    },
    {
      name: "Western",
      icon: <GiWesternHat className="text-6xl text-yellow-600" />,
      code: "37",
      bgColor: "bg-yellow-800",
    },
  ];

  const handleGeter = (value) => {
    const temp = [];
    const found = activeGenre.findIndex((genre) => genre === value);
    if (found != -1) {
      temp.push(...activeGenre);
      temp.splice(found, 1);
      setActiveGenre(temp);
    } else {
      temp.push(...activeGenre, value);
      setActiveGenre(temp);
    }

    if (value == null) {
      temp.length = 0;
      setActiveGenre(temp);
    }

    setPageEx(1);
    handleTypeAndItems(temp);
    console.log(temp);
  };

  return (
    <div className="grid grid-cols-5 gap-2 w-[1200px]">
      {genres.map((item, index) => (
        <div key={index} className=" text-base px-12">
          <button
            onClick={() => handleGeter(item.code)}
            className={`hover:underline bg-gray-900 bg-opacity-30 px-2 py-1 rounded-sm ${
              activeGenre.some((genre) => genre == item.code)
                ? "text-indigo-800 font-bold"
                : " text-opacity-50"
            } 
            `}
          >
            {item.name}
          </button>
        </div>
      ))}
    </div>
    // <div className=" text-sm m-auto max-w-5xl">
    //   <Swiper
    //     spaceBetween={10}
    //     breakpoints={{
    //       320: {
    //         slidesPerView: 2.5,
    //       },
    //       640: {
    //         slidesPerView: 4,
    //       },
    //       768: {
    //         slidesPerView: 6,
    //       },
    //       1000: {
    //         slidesPerView: 7.5,
    //       },
    //     }}
    //     className=" mx-auto"
    //   >
    //     {genres.map((item, index) => (
    //       <SwiperSlide key={index}>
    //         <button
    //           onClick={() => handleGeter(item.code)}
    //           className={`${
    //             activeGenre.some((genre) => genre == item.code)
    //               ? "bg-indigo-800"
    //               : " bg-opacity-50"
    //           } w-32 h-28 flex flex-col gap-2 justify-center items-center px-6 py-2 bg-gray-800 rounded-lg border-2 border-indigo-900
    //             `}
    //         >
    //           {item.icon}
    //           {item.name}
    //         </button>
    //       </SwiperSlide>
    //     ))}
    //   </Swiper>
    // </div>
  );
};

export default Filter;
