import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { getPartyRegionList } from "../../api/region";
import startMarker from "../../assets/svg/start_marker.svg";
import endMarker from "../../assets/svg/end_marker.svg";
import pointMarker from "../../assets/svg/point_marker.svg";
import DestinationModal from "../PlaceMap/DestinationModal";

function CourseMap({ markerData, reload, mapName, setRegion, courseData }) {
  const mapRef = useRef();
  const [isDrawMap, setIsDrawMap] = useState(false);
  const [showDestinationModal, setShowDestinationModal] = useState(false);
  const [clickedData, setClickedData] = useState({});
  const [regionData, setRegionData] = useState([]);

  const getPartyRegionListFunc = async () => {
    try {
      const result = await getPartyRegionList();
      setRegionData(result.payload);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getPartyRegionListFunc();
  }, []);

  useEffect(() => {
    if (regionData.length > 0) console.log(markerData);
    for (let item of regionData) {
      if (item.region !== "그 외(서비스 준비 중)") {
        for (let word of item.region.split(" ")) {
          if (word !== "전남") {
            if (markerData[0].address.includes(word)) {
              setRegion(word);
              console.log(word);
              return;
            } else if (markerData[1].address.includes(word)) {
              setRegion(word);
              console.log(word);
              return;
            } else if (
              markerData.length > 2 &&
              markerData[2].address.includes(word)
            ) {
              setRegion(word);
              console.log(word);
              return;
            }
          }
        }
      }
    }
  }, [regionData, courseData]);

  const addMarker = (destinationId, name, lat, lon, tag, map) => {
    let imgURL = null;
    if (tag === 0) imgURL = startMarker;
    else if (tag === markerData.length - 1) imgURL = endMarker;
    else imgURL = pointMarker;

    let label =
      "<span style='background-color: white;color: #469EFF; font-weight: bold;padding: 0.2rem 0.5rem;border-radius: 10rem; border: 3px solid #469EFF'>" +
      `${tag + 1}` +
      "</span>";

    const tmapMarker = new Tmapv2.Marker({
      position: new Tmapv2.LatLng(lat, lon),
      map: map,
      animation: Tmapv2.MarkerOptions.ANIMATE_BOUNCE_ONCE,
      animationLength: 500,
      title: name,
      label: label,
      icon: imgURL,
    });

    tmapMarker._htmlElement.className = "cursor-pointer";
    tmapMarker.addListener("click", () => {
      setShowDestinationModal(true);
      setClickedData({ destinationId: destinationId, name: name });
    });
    tmapMarker.addListener("touchend", () => {
      setShowDestinationModal(true);
      setClickedData({ destinationId: destinationId, name: name });
    });
  };

  const drawData = (data, map) => {
    let newData = [];
    let equalData = [];
    let pointId1 = "-1234567";
    let ar_line = [];
    let new_polyLine = [];
    let pointArray = [];

    for (let i = 0; i < data.features.length; i++) {
      const feature = data.features[i];

      if (feature.geometry.type == "LineString") {
        ar_line = [];
        for (let j = 0; j < feature.geometry.coordinates.length; j++) {
          let startPt = new Tmapv2.LatLng(
            feature.geometry.coordinates[j][1],
            feature.geometry.coordinates[j][0]
          );
          ar_line.push(startPt);
          pointArray.push(feature.geometry.coordinates[j]);
        }
        const polyline = new Tmapv2.Polyline({
          path: ar_line,
          strokeColor: "#ff0000",
          strokeWeight: 6,
          map: map,
        });
        new_polyLine.push(polyline);
      }
      const pointId2 = feature.properties.viaPointId;
      if (pointId1 != pointId2) {
        equalData = [];
        equalData.push(feature);
        newData.push(equalData);
        pointId1 = pointId2;
      } else {
        equalData.push(feature);
      }
    }

    return newData;
  };

  const initTmap = async () => {
    // 지도 Dom clear
    if (mapRef.current.firstChild)
      mapRef.current.removeChild(mapRef.current.firstChild);

    // 지도
    const mapWidth = Math.min(mapRef.current.offsetWidth, 900);
    const mapHeight = 600;

    const map = new Tmapv2.Map(mapName, {
      center: new Tmapv2.LatLng(markerData[0].lat, markerData[0].lon),
      width: mapWidth + "px",
      height: mapHeight + "px",
      zoom: 12,
      zoomControl: false,
      scrollwheel: true,
    });

    // 마커
    markerData.forEach((marker, index) => {
      setTimeout(
        () =>
          addMarker(
            marker.destinationId,
            marker.name,
            marker.lat,
            marker.lon,
            index,
            map
          ),
        200 * index
      );
    });

    // 경로 탐색 API
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const startTime = `${year}${month}${day}${hours}${minutes}`;

    axios
      .post(
        markerData.length > 7
          ? "https://apis.openapi.sk.com/tmap/routes/routeSequential30?version=1&format=json"
          : "https://apis.openapi.sk.com/tmap/routes?version=1&format=json",
        {
          startName: markerData[0].name,
          startX: markerData[0].lon.toString(),
          startY: markerData[0].lat.toString(),
          startTime: startTime,
          endName: markerData[markerData.length - 1].name,
          endX: markerData[markerData.length - 1].lon.toString(),
          endY: markerData[markerData.length - 1].lat.toString(),
          viaPoints: markerData
            .slice(1, markerData.length - 1)
            .map((marker) => {
              return {
                viaPointId: marker.destinationId.toString(),
                viaPointName: marker.name,
                viaX: marker.lon.toString(),
                viaY: marker.lat.toString(),
              };
            }),
          passList: markerData
            .slice(1, markerData.length - 1)
            .map((marker) => marker.lon + "," + marker.lat)
            .join("_"),
          reqCoordType: "WGS84GEO",
          resCoordType: "WGS84GEO",
          searchOption: "0",
        },
        {
          headers: {
            appKey: "LIHlK57F95ZD6UmkA64A70kzkmyX7OP6vg9ovtdg",
          },
        }
      )
      .then((res) => {
        drawData(res.data, map);

        // 경로탐색 결과 반경만큼 지도 레벨 조정
        const PTbounds = new Tmapv2.LatLngBounds();
        markerData.forEach((marker) => {
          PTbounds.extend(new Tmapv2.LatLng(marker.lat, marker.lon));
        });
        const margin = {
          left: 50,
          top: 100,
          right: 50,
          bottom: 100,
        };
        map.fitBounds(PTbounds, margin);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    if (!reload && isDrawMap) return;

    initTmap();
    setIsDrawMap(true);
  }, [markerData]);

  return (
    <>
      <div ref={mapRef} id={mapName} className="w-full mx-auto" />{" "}
      <DestinationModal
        showModal={showDestinationModal}
        setShowModal={setShowDestinationModal}
        clickedData={clickedData}
        searchPage={true}
      />
    </>
  );
}

export default CourseMap;
