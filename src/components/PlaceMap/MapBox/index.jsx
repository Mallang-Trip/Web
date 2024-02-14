import { useEffect, useRef } from "react";

function MapBox({ markerData, setMarkerData, setClicked, setClickedData }) {
  const mapRef = useRef();

  const initTmap = () => {
    if (mapRef.current.firstChild)
      mapRef.current.removeChild(mapRef.current.firstChild);

    const mapWidth = Math.min(mapRef.current.offsetWidth, 900);
    const mapHeight = 600;

    const map = new Tmapv3.Map("TMapApp", {
      center: new Tmapv3.LatLng(markerData[0].lat, markerData[0].lon),
      width: mapWidth + "px",
      height: mapHeight + "px",
      zoom: 11,
    });

    markerData.forEach((marker) => {
      const tmapMarker = new Tmapv3.Marker({
        position: new Tmapv3.LatLng(marker.lat, marker.lon),
        map: map,
      });

      tmapMarker.on("click", (e) => {
        map.setZoom(13);
        map.setCenter(new Tmapv3.LatLng(marker.lat, marker.lon));
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

  useEffect(() => {
    if (markerData.length === 0) {
      setMarkerData([
        {
          destinationId: -1,
          lat: 37.283192168869,
          lon: 127.044128202435,
        },
      ]);

      navigator.geolocation.getCurrentPosition((position) => {
        setMarkerData([
          {
            destinationId: -1,
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          },
        ]);
      });
    } else initTmap();
  }, [markerData]);

  return <div id="TMapApp" className="w-full mx-auto" ref={mapRef} />;
}

export default MapBox;
