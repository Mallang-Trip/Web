import { useEffect, useRef } from "react";
import { getAllMarkers } from "../../../api/destination";

function MapBox({ markerData, setMarkerData, setClicked, setClickedData }) {
  const mapRef = useRef();

  const initTmap = () => {
    if (mapRef.current.firstChild)
      mapRef.current.removeChild(mapRef.current.firstChild);

    const mapWidth = window.screen.width > 900 ? 900 : window.screen.width;
    const mapHeight = (mapWidth * 740) / 900;

    const map = new Tmapv3.Map("TMapApp", {
      center: new Tmapv3.LatLng(markerData[0].lat, markerData[0].lon),
      width: mapWidth + "px",
      height: mapHeight + "px",
      zoom: 15,
    });

    markerData.forEach((marker) => {
      const tmapMarker = new Tmapv3.Marker({
        position: new Tmapv3.LatLng(marker.lat, marker.lon),
        map: map,
      });

      tmapMarker.on("click", function (evt) {
        console.log(marker);
        markerData.unshift(marker);
        initTmap();
        setClicked(true);
        setClickedData(marker);
      });
    });

    document.querySelectorAll(".vsm-marker").forEach((item) => {
      item.addEventListener("mouseenter", () =>
        item.classList.add("cursor-pointer")
      );
    });
  };

  const getMarkerData = async () => {
    try {
      const result = await getAllMarkers();
      setMarkerData(result.payload);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (markerData.length === 0) getMarkerData();
    else initTmap();
  }, [markerData]);

  return <div id="TMapApp" className="w-full mx-auto" ref={mapRef} />;
}

export default MapBox;
