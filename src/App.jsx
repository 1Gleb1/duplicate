import React, { useEffect } from "react";
import { SkeletonTheme } from "react-loading-skeleton";
import { Route, Routes } from "react-router-dom";
import BgParticles from "./components/BgParticles";
import Main from "./page/Main";
import Movie from "./page/Movie";
import Together from "./page/room/[slug]";
import User from "./page/User";

function App() {
  return (
    <SkeletonTheme baseColor="#313131" highlightColor="#525252">
      <div
        className="w-full min-h-screen text-white bg-black "
        data-theme="night"
      >
        <BgParticles />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/movie/:slug" element={<Movie />} />
          <Route path="/user" element={<User />} />
          <Route path="/room/:slug" element={<Together />} />
        </Routes>
      </div>
    </SkeletonTheme>
  );
}

export default App;
