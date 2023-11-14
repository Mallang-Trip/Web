import React, { useEffect, useState } from "react";
import axios from "axios";
function Map({ courseData, markerData }) {
  const [passList, setPassList] = useState("");
  const initTmap = async () => {
    const mapWidth = window.screen.width > 900 ? 900 : window.screen.width;
    const mapHeight = (mapWidth * 740) / 900;
    // console.log(markerData);
    const map = new Tmapv3.Map("TMapApp", {
      center: new Tmapv3.LatLng(
        markerData[0].destinations[0].lat,
        markerData[0].destinations[0].lon
      ),
      width: mapWidth + "px",
      height: mapHeight + "px",
      zoom: 15,
      zoomControl: true,
      scrollwheel: true,
    });
    // 시작, 도착 심볼찍기
    var markerList = [];
    var pointArray = [];
    const lastLocation = Object(markerData[0].destinations);
    const lastKey = lastLocation[lastLocation.length - 1];
    const addMarker = (status, lon, lat) => {
      var markerLayer;
      // 이미지 변경
      switch (status) {
        case "Start":
          break;
        case "Pass":
          break;
        case "End":
          break;
        default:
      }
      var marker = new Tmapv3.Marker({
        position: new Tmapv3.LatLng(lon, lat),
        map: map,
      });
    };
    //시작 좌표
    addMarker(
      "Start",
      markerData[0].destinations[0].lat,
      markerData[0].destinations[0].lon
    );
    //마지막 좌표
    addMarker("End", lastKey.lat, lastKey.lon);
    //경유지 좌표

    for (let i = 1; i < lastLocation.length - 1; i++) {
      // console.log(lastLocation[i]);
      setPassList(lastLocation[i].lat, lastLocation[i].lon);
      addMarker("Pass", lastLocation[i].lat, lastLocation[i].lon);
    }
    // 경로탐색 API 사용요청
    var headers = {};
    headers["appKey"] = "pChon2hUiB5UzwturVQWb9PRu46lhd0r8pbgcKDk";
    const data = {
      startX: markerData[0].destinations[0].lat,
      startY: markerData[0].destinations[0].lon,
      endX: lastKey.lat,
      endY: lastKey.lon,
      passList: passList,
      reqCoordType: "WGS84GEO",
      resCoordType: "WGS84GEO",
      angle: "172",
      searchOption: "0",
      trafficInfo: "Y",
    };

    const requestTmapRoute = async (headers, data) => {
      try {
        const response = await axios.post(
          "https://apis.openapi.sk.com/tmap/routes?version=1&format=json",
          data,
          { headers: headers }
        );
        console.log(response);
        // 성공적으로 응답을 받았을 때의 처리
        prtcl = response.data;
      } catch (error) {
        // 오류가 발생했을 때의 처리
        console.log(
          "code:" +
            request.status +
            "\n" +
            "message:" +
            request.responseText +
            "\n" +
            "error:" +
            error
        );
      }
    };
  };

  useEffect(() => {
    initTmap();
  }, []);

  return <div id="TMapApp" className="w-full mx-auto" />;
}

export default Map;
