import React, { useEffect, useRef } from "react";
import axios from "axios";
import startMarker from "../../../assets/images/start_marker.png";
import endMarker from "../../../assets/images/end_marker.png";

function Map({ markerData }) {
  const mapRef = useRef();

  const addMarker = (lat, lon, tag, map) => {
    let imgURL = null;
    if (tag === 0) imgURL = startMarker;
    else if (tag === markerData.length - 1) imgURL = endMarker;

    new Tmapv3.Marker({
      position: new Tmapv3.LatLng(lat, lon),
      icon: imgURL && imgURL,
      map: map,
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
          let startPt = new Tmapv3.LatLng(
            feature.geometry.coordinates[j][1],
            feature.geometry.coordinates[j][0]
          );
          ar_line.push(startPt);
          pointArray.push(feature.geometry.coordinates[j]);
        }
        const polyline = new Tmapv3.Polyline({
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
    const mapWidth = window.screen.width > 900 ? 900 : window.screen.width;
    const mapHeight = (mapWidth * 740) / 900;

    const map = new Tmapv3.Map("TMapApp", {
      center: new Tmapv3.LatLng(markerData[0].lat, markerData[0].lon),
      width: mapWidth + "px",
      height: mapHeight + "px",
      zoom: 15,
      zoomControl: true,
      scrollwheel: true,
    });

    // 마커
    markerData.forEach((marker, index) => {
      addMarker(marker.lat, marker.lon, index, map);
    });

    // 경로 탐색 API
    let passList = markerData
      .slice(1, markerData.length - 1)
      .map((marker) => marker.lon + "," + marker.lat)
      .join("_");

    axios
      .post(
        "https://apis.openapi.sk.com/tmap/routes?version=1&format=json",
        {
          startX: markerData[0].lon,
          startY: markerData[0].lat,
          endX: markerData[markerData.length - 1].lon,
          endY: markerData[markerData.length - 1].lat,
          passList: passList,
          reqCoordType: "WGS84GEO",
          resCoordType: "WGS84GEO",
          angle: "172",
          searchOption: 0,
          trafficInfo: "Y",
        },
        {
          headers: {
            appKey: "pChon2hUiB5UzwturVQWb9PRu46lhd0r8pbgcKDk",
          },
        }
      )
      .then((res) => {
        const geoData = drawData(res.data, map);

        // 경로탐색 결과 반경만큼 지도 레벨 조정
        let newData = geoData[0];
        let PTbounds = new Tmapv3.LatLngBounds();
        for (let i = 0; i < newData.length; i++) {
          let mData = newData[i];
          let type = mData.geometry.type;

          if (type == "Point") {
            let linePt = new Tmapv3.LatLng(
              mData.geometry.coordinates[1],
              mData.geometry.coordinates[0]
            );
            PTbounds.extend(linePt);
          } else {
            for (var j = 0; j < mData.geometry.coordinates.length; j++) {
              let linePt = new Tmapv3.LatLng(
                mData.geometry.coordinates[j][1],
                mData.geometry.coordinates[j][0]
              );
              PTbounds.extend(linePt);
            }
          }
        }
        map.fitBounds(PTbounds);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    initTmap();
  }, [markerData]);

  return <div ref={mapRef} id="TMapApp" className="w-full mx-auto" />;
}

export default Map;
