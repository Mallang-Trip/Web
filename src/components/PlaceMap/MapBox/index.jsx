import { useEffect, useRef } from "react";
import { getAllMarkers } from "../../../api/destination";
import RoundBtn from "../RoundBtn";
function MapBox({ markerData, setMarkerData }) {
  const mapRef = useRef();

  const initTmap = () => {
    if (mapRef.current.firstChild)
      mapRef.current.removeChild(mapRef.current.firstChild);

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
        markerData.unshift(marker);
        initTmap();
        <RoundBtn name={""} />;
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
    if (markerData.length === 0) getMarkerData();
    else initTmap();
  }, [markerData]);

  return <div id="TMapApp" className="w-full mx-auto" ref={mapRef} />;
}

export default MapBox;
