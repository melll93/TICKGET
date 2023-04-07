/* global kakao */
import React, { useEffect, useRef, useState } from 'react'

const KakaoMap = () => {
  const kakaomap = useRef()
  const [map, setMap] = useState();
  const[positions, setPositions] = useState([
    {
      content: '<div>터짐블로그</div>',
      latlng: new kakao.maps.LatLng(37.4989931, 127.0329085)
    }
  ])
  useEffect(()=> {
    const container = document.getElementById("map");
    const options = {
      center: positions[0].latlng,
      level: 4,
    };
    if(!map) {
      setMap(new kakao.maps.Map(container,options));
    } else {
      if(positions[1]){//자바스크립트에서는 0이 아닌건 모두 true
        map.setCenter(positions[1].latlng)
      }
    }
    //마커 표시하기
    for(let i=0; i<positions.length; i++) {
      //마커 생성하기
      const marker = new kakao.maps.Marker({
        map: map, //마커를 표시할 지도
        position: positions[i].latlng, //마커의 위치
      });
      // 마커에 표시할 인포윈도우 생성하기
      const infowindow = new kakao.maps.InfoWindow({
        content: positions[i].content
      });
      //마커에 이벤트를 등록하는 함수를 만들고 즉시 호출되도록 클로저 만듦
      //클로저를 추가하지 않으면 마커가 여러개 있을 때 마지막 에만 이벤트 적용
      (function(marker,infowindow){
        //마커에 mouse over이벤트 등록 마우스 오버시 인포윈도우를 표시함
        kakao.maps.event.addListener(marker,'mouseover',function(){
          infowindow.open(map,marker)
        });
        //마커에 mouseout 이벤트 등록 마우스 아웃시 인포윈도우 닫기처리함
        kakao.maps.event.addListener(marker,'mouseout',function(){
          infowindow.close()
        });
      })(marker,infowindow)
    } // end of for
  },[positions, map])
  return (
    <>
      <div id="" style={{display: "flex", alignItems:"center", justifyContent:"space-around", flexDirection:"column"}}>
        <div id="map" ref={kakaomap} style={{width: "700px", height: "250px", marginBottom: "20px", border:"2px solid lightgray", borderRadius: "20px"}}></div>
      </div>
    </>
  )
}


// // 마커를 클릭하면 장소명을 표출할 인포윈도우 입니다
// var infowindow = new kakao.maps.InfoWindow({zIndex:1});

// var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
//     mapOption = {
//         center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
//         level: 3 // 지도의 확대 레벨
//     };  

// // 지도를 생성합니다    
// var map = new kakao.maps.Map(mapContainer, mapOption); 

// // 장소 검색 객체를 생성합니다
// var ps = new kakao.maps.services.Places(); 

// // 키워드로 장소를 검색합니다
// ps.keywordSearch('이태원 맛집', placesSearchCB); 

// // 키워드 검색 완료 시 호출되는 콜백함수 입니다
// function placesSearchCB (data, status, pagination) {
//     if (status === kakao.maps.services.Status.OK) {

//         // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
//         // LatLngBounds 객체에 좌표를 추가합니다
//         var bounds = new kakao.maps.LatLngBounds();

//         for (var i=0; i<data.length; i++) {
//             displayMarker(data[i]);    
//             bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
//         }       

//         // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
//         map.setBounds(bounds);
//     } 
// }

// // 지도에 마커를 표시하는 함수입니다
// function displayMarker(place) {
    
//     // 마커를 생성하고 지도에 표시합니다
//     var marker = new kakao.maps.Marker({
//         map: map,
//         position: new kakao.maps.LatLng(place.y, place.x) 
//     });

//     // 마커에 클릭이벤트를 등록합니다
//     kakao.maps.event.addListener(marker, 'click', function() {
//         // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
//         infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
//         infowindow.open(map, marker);
//     });
// }
export default KakaoMap