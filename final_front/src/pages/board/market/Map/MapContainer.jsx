import React, { useEffect, useState, useRef } from "react";
const { kakao } = window;

const MapContainer = ({ place }) => {
  const [map, setMap] = useState(null);
  const markers = useRef([]);

  useEffect(() => {
    // 맵 초기화
    let container = document.getElementById("myMap");
    let options = {
      center: new kakao.maps.LatLng(0, 0),
      level: 3,
    };
    let map = new kakao.maps.Map(container, options);
    setMap(map);
  }, []);

  useEffect(() => {
    // 장소 검색
    if (place && map) {
      const script = document.createElement("script");
      script.async = true;
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?appkey=7054cfa7b874f6b9ff1d967de8b8b88f&libraries=services,clusterer,drawing&autoload=false";
      document.head.appendChild(script);

      script.onload = () => {
        kakao.maps.load(() => {
          const infowindow = new kakao.maps.InfoWindow({ zIndex: 0 });
          const ps = new kakao.maps.services.Places();
          let bounds = new kakao.maps.LatLngBounds();

          markers.current.forEach((marker) => marker.setMap(null));
          markers.current = [];

          ps.keywordSearch(place, placesSearchCB);

          function placesSearchCB(data, status) {
            if (status === kakao.maps.services.Status.OK) {
              for (let i = 0; i < data.length; i++) {
                displayMarker(data[i]);
                bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
              }
              map.setBounds(bounds);
            }
          }
   

          function displayMarker(place) {
            let marker = new kakao.maps.Marker({
              map: map,
              position: new kakao.maps.LatLng(place.y, place.x),
            });
          
            console.log(marker.position)

            markers.current.push(marker);

            kakao.maps.event.addListener(marker, "click", function () {
              infowindow.setContent(
                '<div style="padding:5px;font-size:12px;">' +
                  place.place_name +
                  "</div>"
              );
              infowindow.open(map, marker);
            });
          }
        });
      };
    }
  }, [place, map]);



  return (
    <>
      <div
        id="myMap"
        style={{
          width: "850px",
          height: "550px",
          marginTop: "15px",
          marginRight: "40px",
        }}
      ></div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      ></div>
    </>
  );
};

export default MapContainer;