import { useEffect, useMemo, useRef, useState } from "react";
import pointMarker from "../../../../../assets/svg/point_marker.svg";

function PlaceMap({
  placeData,
  setDestinationId,
  setShowDestinationModal,
  keyword,
}) {
  const mapRef = useRef();
  const [recentMap, setRecentMap] = useState();
  const [marker, setMarker] = useState([]);
  const [isInitialMap, setIsInitialMap] = useState(true);

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

    const mapWidth = mapRef.current.offsetWidth;
    const mapHeight = screen.height - 450;

    const map = new Tmapv2.Map("TMapAdmin", {
      center: new Tmapv2.LatLng(placeData[0].lat, placeData[0].lon),
      width: mapWidth + "px",
      height: mapHeight + "px",
      zoom: 12,
      zoomControl: false,
      scrollwheel: true,
    });
    setRecentMap(map);

    return map;
  };

  const drawMarker = () => {
    marker.forEach((item) => item.setMap(null));

    const map = recentMap || makeNewMap();
    const PTbounds = new Tmapv2.LatLngBounds();

    setMarker(
      placeData.map((marker) => {
        const tmapMarker = new Tmapv2.Marker({
          position: new Tmapv2.LatLng(marker.lat, marker.lon),
          map: map,
          animation: Tmapv2.MarkerOptions.ANIMATE_BOUNCE_ONCE,
          animationLength: 500,
          title: marker.name,
          icon: pointMarker,
        });

        PTbounds.extend(new Tmapv2.LatLng(marker.lat, marker.lon));

        tmapMarker._htmlElement.className = "cursor-pointer";
        tmapMarker.addListener("click", () => {
          setDestinationId(marker.destinationId);
          setShowDestinationModal(true);
        });
        tmapMarker.addListener("touchend", () => {
          setDestinationId(marker.destinationId);
          setShowDestinationModal(true);
        });

        return tmapMarker;
      })
    );

    if (keyword || isInitialMap) map.fitBounds(PTbounds, margin);
    setIsInitialMap(false);
  };

  useEffect(() => {
    if (placeData.length === 0) return;
    drawMarker();
  }, [placeData]);

  if (placeData.length === 0)
    return <div className="text-center mt-40">여행지 데이터가 없습니다.</div>;
  return <div id="TMapAdmin" className="w-full mx-auto" ref={mapRef} />;
}

export default PlaceMap;
