import React, { useEffect } from "react";
import ReactDOM from "react-dom";

export default function MapBox() {
  useEffect(() => {
    const script = document.createElement("script");
    script.innerHTML = `
            function initTmap() {
                var map = new Tmapv3.Map("TMapApp", {
                    center: new Tmapv3.LatLng(37.566481622437934,126.98502302169841),
                    width: "900px",
                    height: "740px",
                    zoom:15
                });
                var marker = new Tmapv3.Marker({
                  position: new Tmapv3.LatLng(37.566481622437934,126.98502302169841),
                  map:map
                });
            }
            
            initTmap();
       `;
    script.type = "text/javascript";
    script.async = "async";
    document.head.appendChild(script);
  }, []);

  return <div id="TMapApp" className="w-full  mx-auto " />;
}
