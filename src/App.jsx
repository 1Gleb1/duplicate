import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import BgParticles from "./components/BgParticles";
import Main from "./page/Main";
import Movie from "./page/Movie";
import Together from "./page/room/[slug]";
import User from "./page/User";

function App() {
  function useScript(url) {
    useEffect(() => {
      const script = document.createElement("script");
      script.src = url;
      script.async = true;
      document.body.appendChild(script);
      return () => {
        document.body.removeChild(script);
      };
    }, [url]);
  }

  function PlayNewVideo() {
    if (window.pljssglobal.length > 0) {
      window.pljssglobal[0].api("play", "https://plrjs.com/new.mp4");
    }
  }
  useScript("https://site.com/playerjs.js");
  return (
    <div className="w-full min-h-screen text-white bg-black" data-theme="night">
      <BgParticles />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/movie/:slug" element={<Movie />} />
        <Route path="/user" element={<User />} />
        <Route path="/room/:slug/:slug" element={<Together />} />
      </Routes>
    </div>
  );
}

export default App;
