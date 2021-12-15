/* global kakao */
import React, { useEffect, useState } from 'react';
import '../FindPartner/FindMap.css'

export default function FindMap(
  { searchResult, setSearchResult, inputText, setInputText, place, setPlace, markerPlace, setMarkerPlace }
) {
  const onChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlace(inputText);
    setInputText("");
    setMarkerPlace({})
  };


  useEffect(() => {
    console.log(searchResult)
  }, [searchResult])



  useEffect(() => {
    if (!markerPlace.address_name) {
      const container = document.getElementById('map');
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 3
      };

      const map = new kakao.maps.Map(container, options);

      const ps = new kakao.maps.services.Places();

      let infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

      ps.keywordSearch(place, placesSearchCB);

      function placesSearchCB(data, status, pagination) {
        if (status === kakao.maps.services.Status.OK) {
          let bounds = new kakao.maps.LatLngBounds();
          setSearchResult(data)
          console.log(data)
          let resultArr = []
          for (let i = 0; i < data.length; i++) {//5를 -> data.length  수정해야 모든결과 조회됨
            let resultObj = {
              name: data[i].place_name,
              address: data[i].road_address_name,
              phonenumber: data[i].phone
            }
            resultArr.push(resultObj)

          }
          setSearchResult(data)

          for (let i = 0; i < data.length; i++) {//5를 -> data.length  수정해야 모든결과 조회됨
            displayMarker(data[i]);
            console.log(data[i])
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
          }
          map.setBounds(bounds);
          displayPagination(pagination)
        }
        function displayPagination(pagination) {
          var paginationEl = document.getElementById('pagination'),
            fragment = document.createDocumentFragment(),
            i

          // 기존에 추가된 페이지 번호 삭제
          while (paginationEl.hasChildNodes()) {
            paginationEl.removeChild(paginationEl.lastChild)
          }

          for (i = 1; i <= pagination.last; i++) {
            var el = document.createElement('a')
            el.href = '#'
            el.innerHTML = i

            if (i === pagination.current) {
              el.className = 'on'
            } else {
              el.onclick = (function (i) {
                return function () {
                  pagination.gotoPage(i)
                }
              })(i)
            }

            fragment.appendChild(el)
          }
          paginationEl.appendChild(fragment)
        }
      }



      function displayMarker(place) {
        let marker = new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(place.y, place.x)
        });
        kakao.maps.event.addListener(marker, 'click', function () {
          // 마커를 클릭하면 장소명이 인포윈도우에 표출
          infowindow.setContent('<div style="padding:5px;font-size:12px">' + place.place_name + '</div>');
          infowindow.open(map, marker);
        });

      }
    }
    else {
      const container2 = document.getElementById('map');
      const options2 = {
        center: new kakao.maps.LatLng(markerPlace.y, markerPlace.x),
        level: 1
      };

      const map = new kakao.maps.Map(container2, options2);
      const markerPosition = new kakao.maps.LatLng(markerPlace.y, markerPlace.x);
      var marker = new kakao.maps.Marker({
        position: markerPosition,
      })
      var iwContent = `<div style="padding:5px;font-size:12px">${markerPlace.place_name} <br><a href="https://map.kakao.com/link/map/${markerPlace.place_name},${markerPlace.y},${markerPlace.x}" style="color:blue" target="_blank">큰지도보기</a> <a href="https://map.kakao.com/link/to/${markerPlace.place_name},${markerPlace.y},${markerPlace.x}" style="color:blue" target="_blank">길찾기</a></div>`, // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
        iwPosition = new kakao.maps.LatLng(33.450701, 126.570667); //인포윈도우 표시 위치입니다
      console.log(markerPlace)

      // 인포윈도우를 생성합니다
      var infowindow2 = new kakao.maps.InfoWindow({
        position: iwPosition,
        content: iwContent,
      });

      infowindow2.open(map, marker);
      marker.setMap(map);
    }



  }, [place, markerPlace]);


  function SearchResultList({ el, setMarkerPlace, markerPlace }) {
    return (
      <>
        <div className='place-list-container' onClick={() => {
          setMarkerPlace(el)
          console.log(el)

        }}>
          <div className={el.address_name === markerPlace.address_name ? 'place-list selected' : 'place-list'}>
            <div className='place-name'>{el.place_name}</div>
            <div className='place-address'>{el.address_name}</div>
            <div className='place-phone'>{el.phone}</div>
          </div>
        </div>
      </>
    )

  }


  return (
    <>
      <div className='findmap-container'>
        <div className='findmap-search'>
          <div className='search-section'>
            <form className="inputForm" onSubmit={handleSubmit}>
              <input className='input-textbox'
                // placeholder="장소를 검색하세요"
                onChange={onChange}
                value={inputText}
              />
              <button className='search-button' type="submit">검색</button>
            </form>
          </div>
          <div className='search-result'>검색결과</div>

          <div className='searchResult-table'>{searchResult.length !== 0 ? <div>
            {
              searchResult.map((el, id) => {
                return (
                  <SearchResultList key={id} el={el} setMarkerPlace={setMarkerPlace}
                    markerPlace={markerPlace}
                  />
                )
              })
            }</div> : <div className='empty-result'>검색결과가 없습니다</div>}</div>
          <div id='pagination'></div>

        </div>

        <div className='showmap'>
          <div id='map' style={{ width: '600px', height: '600px', zIndex: 0 }}></div>
        </div>
      </div>
    </>
  )
}
