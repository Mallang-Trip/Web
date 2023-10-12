import { useEffect, useState } from "react";
import { getAllMarkers } from "../../../api/destination";

function MapBox() {
  const [markerData, setMarkerData] = useState([]);

  const initTmap = () => {
    const map = new Tmapv3.Map("TMapApp", {
      center: new Tmapv3.LatLng(markerData[0].lat, markerData[0].lon),
      width: "900px",
      height: "740px",
      zoom: 15,
    });
    markerData.forEach((marker) => {
      const tmapMarker = new Tmapv3.Marker({
        position: new Tmapv3.LatLng(marker.lat, marker.lon),
        map: map,
      });

      tmapMarker.on("click", function (evt) {
        console.log(marker);
        
      });

      //tmapMarker.style.cursor = "pointer";
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
    getMarkerData();
  }, []);

  useEffect(() => {
    if (markerData.length === 0) return;
    initTmap();
  }, [markerData]);

  return <div id="TMapApp" className="w-full mx-auto" />;
}

export default MapBox;
