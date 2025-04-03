import {
  Dispatch,
  memo,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Destination } from "@/types";
import pointMarker from "@/assets/svg/point_marker.svg";

interface Props {
  placeData: Destination[];
  setDestinationId: Dispatch<SetStateAction<number>>;
  setShowDestinationModal: Dispatch<SetStateAction<boolean>>;
  keyword: string;
}

function PlaceMap({
  placeData,
  setDestinationId,
  setShowDestinationModal,
  keyword,
}: Props) {
  const Tmapv2 = window.Tmapv2;
  const mapRef = useRef<HTMLDivElement | null>(null);
  const touchRef = useRef({ _lat: 0, _lng: 0 });
  const [recentMap, setRecentMap] = useState();
  const [marker, setMarker] = useState<any>([]);
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

  const makeNewMap = useCallback(() => {
    if (!mapRef.current) return;
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
  }, [mapRef, Tmapv2, placeData]);

  const drawMarker = useCallback(() => {
    marker.forEach((item: any) => item.setMap(null));

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
        tmapMarker.addListener("touchstart", () => {
          const { _lat, _lng } = map.getCenter();
          touchRef.current._lat = _lat;
          touchRef.current._lng = _lng;
        });
        tmapMarker.addListener("touchend", () => {
          const { _lat, _lng } = map.getCenter();
          if (
            Math.abs(touchRef.current._lat - _lat) > 0.005 ||
            Math.abs(touchRef.current._lng - _lng) > 0.005
          )
            return;
          setDestinationId(marker.destinationId);
          setShowDestinationModal(true);
        });

        return tmapMarker;
      })
    );

    if (keyword || isInitialMap) map.fitBounds(PTbounds, margin);
    setIsInitialMap(false);
  }, [
    Tmapv2,
    marker,
    recentMap,
    makeNewMap,
    placeData,
    keyword,
    isInitialMap,
    margin,
  ]);

  useEffect(() => {
    if (placeData.length === 0) return;
    drawMarker();
  }, [placeData]);

  if (placeData.length === 0)
    return <div className="text-center mt-40">여행지 데이터가 없습니다.</div>;
  return <div id="TMapAdmin" className="w-full mx-auto" ref={mapRef} />;
}

export default memo(PlaceMap);
