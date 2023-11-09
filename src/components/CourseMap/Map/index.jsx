import React from "react";

function Map({ courseData }) {
  const initTmap = () => {
    const mapWidth = window.screen.width > 900 ? 900 : window.screen.width;
    const mapHeight = (mapWidth * 740) / 900;

    const map = new Tmapv3.Map("TMapApp", {
      center: new Tmapv3.LatLng(courseData[0].lat, courseData[0].lon),
      width: mapWidth + "px",
      height: mapHeight + "px",
      zoom: 15,
    });
  };
  return <div id="TMapApp" className="w-full mx-auto" />;
}

export default Map;
