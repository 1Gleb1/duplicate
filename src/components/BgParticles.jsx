import React from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import particleConfig from "../api/particleConfig";

const BgParticles = () => {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const particlesLoaded = (container) => {
    // console.log(container);
  };
  return (
    <Particles
      className="hidden xl:block"
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={particleConfig}
    />
  );
};

export default BgParticles;
