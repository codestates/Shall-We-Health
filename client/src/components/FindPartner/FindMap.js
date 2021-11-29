/* global kakao */
import React, { useEffect, useState } from 'react';
import '../FindPartner/FindMap.css'

export default function FindMap() {

  const [searchResult, setSearchResult] = useState('')
  const [inputText, setInputText] = useState("");
  const [place, setPlace] = useState("");

  const onChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlace(inputText);
    setInputText("");

  };

  useEffect(() => {
    console.log(searchResult)
  }, [searchResult])



  useEffect(() => {
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
        let resultArr = []
        for (let i = 0; i < 5; i++) {//5를 -> data.length  수정해야 모든결과 조회됨
          let resultObj = {
            name: data[i].place_name,
            address: data[i].road_address_name,
            phonenumber: data[i].phone
          }
          resultArr.push(resultObj)

        }
        setSearchResult(resultArr)

        for (let i = 0; i < 5; i++) {//5를 -> data.length  수정해야 모든결과 조회됨
          displayMarker(data[i]);
          console.log(data[i])
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
        // displayPagination(pagination)

        map.setBounds(bounds);
      }
    }



    function displayMarker(place) {
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x)
      });
      kakao.maps.event.addListener(marker, 'click', function () {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출
        infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
        infowindow.open(map, marker);
      });
    }



  }, [place]);


  function SearchResultList({ el }) {
    return (
      <>
        <div className='place-list-container'>
          <div className='place-list'>
            <div className='place-name'>{el.name}</div>
            <div className='place-address'>{el.address}</div>
            <div className='place-phone'>{el.phonenumber}</div>
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
              searchResult.map((el) => {
                return (
                  <SearchResultList el={el} />
                )
              })
            }</div> : <div className='empty-result'>검색결과가 없습니다</div>}</div>

        </div>

        <div className='showmap'>
          {/* <div className='findmap-container'></div> */}
          <div id='map' style={{ width: '600px', height: '600px', zIndex: 0 }}></div>
        </div>
      </div>
    </>
  )
}
