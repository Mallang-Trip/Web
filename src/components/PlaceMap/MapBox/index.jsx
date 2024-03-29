import { useEffect, useRef } from "react";
import pointMarker from "../../../assets/svg/point_marker.svg";

function MapBox({ markerData, setClicked, setClickedData }) {
  const mapRef = useRef();

  const initTmap = () => {
    if (mapRef.current.firstChild)
      mapRef.current.removeChild(mapRef.current.firstChild);

    const mapWidth = Math.min(mapRef.current.offsetWidth, 900);
    const mapHeight = 600;

    const map = new Tmapv2.Map("TMapApp", {
      center: new Tmapv2.LatLng(markerData[0].lat, markerData[0].lon),
      width: mapWidth + "px",
      height: mapHeight + "px",
      zoom: 12,
      zoomControl: false,
    });

    const PTbounds = new Tmapv2.LatLngBounds();

    markerData.forEach((marker) => {
      const tmapMarker = new Tmapv2.Marker({
        position: new Tmapv2.LatLng(marker.lat, marker.lon),
        map: map,
        animation: Tmapv2.MarkerOptions.ANIMATE_BOUNCE_ONCE,
        animationLength: 500,
        title: marker.name,
        label: marker.name,
        icon: pointMarker,
      });

      PTbounds.extend(new Tmapv2.LatLng(marker.lat, marker.lon));

      tmapMarker._htmlElement.className = "cursor-pointer";
      tmapMarker.addListener("click", () => {
        setClicked(true);
        setClickedData(marker);
      });
      tmapMarker.addListener("touchend", () => {
        setClicked(true);
        setClickedData(marker);
      });
    });

    const margin = {
      left: 50,
      top: 100,
      right: 50,
      bottom: 100,
    };
    map.fitBounds(PTbounds, margin);
  };

  useEffect(() => {
    if (markerData.length === 0) return;
    initTmap();
  }, [markerData]);

  return <div id="TMapApp" className="w-full mx-auto" ref={mapRef} />;
}

export default MapBox;
