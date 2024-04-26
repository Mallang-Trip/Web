import { useEffect, useRef } from "react";
import pointMarker from "../../../../assets/svg/point_marker.svg";

function PlaceMap({ placeData, setDestinationId, setShowDestinationModal }) {
  const mapRef = useRef();

  const initTmap = () => {
    if (mapRef.current.firstChild)
      mapRef.current.removeChild(mapRef.current.firstChild);

    const mapWidth = mapRef.current.offsetWidth;
    const mapHeight = screen.height - 450;

    const map = new Tmapv2.Map("TMapAdmin", {
      center: new Tmapv2.LatLng(placeData[0].lat, placeData[0].lon),
      width: mapWidth + "px",
      height: mapHeight + "px",
      zoom: 12,
      zoomControl: true,
      scrollwheel: /Mobi/.test(navigator.userAgent),
    });

    const PTbounds = new Tmapv2.LatLngBounds();

    placeData.forEach((marker) => {
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
        setDestinationId(marker.destinationId);
        setShowDestinationModal(true);
      });
      tmapMarker.addListener("touchend", () => {
        setDestinationId(marker.destinationId);
        setShowDestinationModal(true);
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
    if (placeData.length === 0) return;
    initTmap();
  }, [placeData]);

  return <div id="TMapAdmin" className="w-full mx-auto" ref={mapRef} />;
}

export default PlaceMap;
