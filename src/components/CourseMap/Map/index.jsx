import React, { useEffect, useState } from "react";
import axios from "axios";
import { parse } from "postcss";
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

    var new_polyLine = [];
    var new_Click_polyLine = [];

    // const drawData = (data) => {
    //   var routeData = data;
    //   var resultStr = "";
    //   var distance = 0;
    //   var idx = 1;
    //   var newData = [];
    //   var equalData = [];
    //   var pointId1 = "-1234567";
    //   var ar_line = [];

    //   for (var i = 0; i < data.features.length; i++) {
    //     var feature = data.features[i];
    //     //배열에 경로 좌표 저장
    //     if (feature.geometry.type == "LineString") {
    //       ar_line = [];
    //       for (var j = 0; j < feature.geometry.coordinates.length; j++) {
    //         var startPt = new Tmapv3.LatLng(
    //           feature.geometry.coordinates[j][1],
    //           feature.geometry.coordinates[j][0]
    //         );
    //         ar_line.push(startPt);
    //         pointArray.push(feature.geometry.coordinates[j]);
    //       }
    //       var polyline = new Tmapv3.Polyline({
    //         path: ar_line,
    //         strokeColor: "#ff0000",
    //         strokeWeight: 6,
    //         map: map,
    //       });
    //       new_polyLine.push(polyline);
    //     }
    //     var pointId2 = feature.properties.viaPointId;
    //     if (pointId1 != pointId2) {
    //       equalData = [];
    //       equalData.push(feature);
    //       newData.push(equalData);
    //       pointId1 = pointId2;
    //     } else {
    //       equalData.push(feature);
    //     }
    //   }
    //   geoData = newData;
    // };

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

    let parseArray = [];

    const parseDest = (x, y) => {
      const string = `${x}` + "," + `${y}`;
      parseArray.push(string);
      console.log(parseArray);
      return parseArray;
    };
    let result = "";

    const makePassList = (parseArray) => {
      for (let i = 0; i < parseArray.length; i++) {
        //const parseList = +parseArray[i];

        result = !result ? parseArray[i] : result + "_" + parseArray[i];
        console.log(i, result);
      }
      setPassList(toString(result));
    };

    for (let i = 1; i < lastLocation.length - 1; i++) {
      // console.log(lastLocation[i]);
      console.log(`왼쪽: ${lastLocation[i].lat}`);
      console.log(`오른쪽: ${lastLocation[i].lon}`);
      console.log(passList);

      addMarker("Pass", lastLocation[i].lat, lastLocation[i].lon);
      parseDest(lastLocation[i].lat, lastLocation[i].lon);
      /*currentPass.push = `${lastLocation[i].lon},${lastLocation[i].lat}`;
      counter += i === 1 ? currentPass : `_${currentPass}`;
      setPassList(currentPass);
      console.log(passList);*/

      //passList 만들기
    }
    makePassList(parseArray);

    console.log(`최종 passList: ${passList}`);
    // 경로탐색 API 사용요청
    const headers = {};
    headers["appKey"] = "pChon2hUiB5UzwturVQWb9PRu46lhd0r8pbgcKDk";
    let prtcl;

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
    console.log(typeof result);
    try {
      const response = await axios.post(
        "https://apis.openapi.sk.com/tmap/routes?version=1&format=json",
        {
          startX: markerData[0].destinations[0].lat,
          startY: markerData[0].destinations[0].lon,
          endX: lastKey.lat,
          endY: lastKey.lon,
          passList: result,
          reqCoordType: "WGS84GEO",
          resCoordType: "WGS84GEO",
          angle: "172",
          searchOption: "0",
          trafficInfo: "Y",
        },
        { headers: headers }
      );
      console.log(`응답: ${response}`);
      // 성공적으로 응답을 받았을 때의 처리
      prtcl = response.data;
    } catch (error) {
      // 오류가 발생했을 때의 처리
      console.log(error);
    }

    // const trafficColors = {
    //   extractStyles: true,
    //   trafficDefaultColor: "#636f63",
    //   trafficCongestionColor: "#ffcc00",
    //   trafficType1Color: "#19b95f", //원할
    //   trafficType2Color: "#f15426", //지체
    //   trafficType3Color: "#ff970e", //정체
    // };

    // const style_red = {
    //   fillColor: "#FF0000",
    //   fillOpacity: 0.2,
    //   strokeColor: "#FF0000",
    //   strokeWidth: 3,
    //   strokeDashstyle: "solid",
    //   pointRadius: 2,
    //   title: "this is a red line",
    // };

    // drawData(prtcl);
  };

  useEffect(() => {
    initTmap();
  }, [passList]);

  return <div id="TMapApp" className="w-full mx-auto" />;
}

export default Map;
