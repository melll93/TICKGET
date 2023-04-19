import React, { useEffect, useState } from "react";
const { kakao } = window;

const MapContainer = ({place}) => {
  
  useEffect(() => {
    console.log(place)
      let infowindow = new kakao.maps.InfoWindow({ zIndex: 0 });
      let markers = [];
      const container = document.getElementById("myMap");
      const options = {
        center: new kakao.maps.LatLng(37.51205818145604, 127.07327785410678),
        level: 4,
      };
      const map = new kakao.maps.Map(container, options);

      const ps = new kakao.maps.services.Places();

      ps.keywordSearch(place, placesSearchCB); 


      function placesSearchCB(data, status) {
        if (status === kakao.maps.services.Status.OK) {
          let bounds = new kakao.maps.LatLngBounds();

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

        kakao.maps.event.addListener(marker, "click", function () {
          infowindow.setContent(
            '<div style="padding:5px;font-size:12px;">' +
              place.place_name +
              "</div>"
          );
          infowindow.open(map, marker);
        });
      }
  }, [place]);

  return (
    <>
      <div
        id="myMap"
        style={{
          width: "800px",
          height: "550px",
          marginTop:"15px",
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