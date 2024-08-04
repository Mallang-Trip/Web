import { useEffect, useMemo, useRef, useState } from "react";
import pointMarker from "../../../assets/svg/point_marker.svg";

function MapBox({
  markerData,
  setShowDestinationModal,
  setClickedData,
  isAllMarker,
  recentSearched,
}) {
  const mapRef = useRef();
  const [recentMap, setRecentMap] = useState();
  const [marker, setMarker] = useState([]);

  const margin = useMemo(
    () => ({
      left: 50,
      top: 100,
      right: 50,
      bottom: 100,
    }),
    []
  );

  const makeNewMap = () => {
    if (mapRef.current.firstChild)
      mapRef.current.removeChild(mapRef.current.firstChild);

    const mapWidth = Math.min(mapRef.current.offsetWidth, 900);
    const mapHeight = window.innerWidth > 768 ? 600 : 400;

    const map = new Tmapv2.Map("TMapApp", {
      center: new Tmapv2.LatLng(37.398195688134, 126.96313827598239),
      width: mapWidth + "px",
      height: mapHeight + "px",
      zoom: 15,
      zoomControl: false,
      scrollwheel: true,
    });
    setRecentMap(map);

    return map;
  };

  useEffect(() => {
    /** 마커 초기화 */
    marker.forEach((item) => item.setMap(null));

    if (markerData.length === 0) {
      const map = recentMap || makeNewMap();
      const marker = new Tmapv2.Marker({
        position: new Tmapv2.LatLng(37.398195688134, 126.96313827598239),
        map: map,
        title: "말랑트립",
        label: "말랑트립",
        icon: pointMarker,
      });
      setMarker([marker]);
      return;
    }

    const map = recentMap || makeNewMap();
    const PTbounds = new Tmapv2.LatLngBounds();

    setMarker(
      markerData.map((marker) => {
        const tmapMarker = new Tmapv2.Marker({
          position: new Tmapv2.LatLng(marker.lat, marker.lon),
          map: map,
          animation: Tmapv2.MarkerOptions.ANIMATE_BOUNCE_ONCE,
          animationLength: 500,
          title: marker.name,
          label: !isAllMarker && marker.name,
          icon: pointMarker,
        });

        PTbounds.extend(new Tmapv2.LatLng(marker.lat, marker.lon));

        tmapMarker._htmlElement.className = "cursor-pointer";
        tmapMarker.addListener("click", () => {
          setShowDestinationModal(true);
          setClickedData(marker);
        });
        tmapMarker.addListener("touchend", () => {
          setShowDestinationModal(true);
          setClickedData(marker);
        });

        return tmapMarker;
      })
    );

    if (!isAllMarker || recentSearched.length === 0) {
      map.fitBounds(PTbounds, margin);
    }
  }, [markerData]);

  return <div id="TMapApp" className="w-full mx-auto" ref={mapRef} />;
}

export default MapBox;
