import React, { useState } from 'react';
import './FindPartner.css';
import Select from 'react-select'
import FindMap from '../components/FindPartner/FindMap';


export default function FindPartner() {
  // 당일로부터 14일 이후까지만의 날짜를 Select의 값으로 전해주기위함
  let dateOptions = []
  for (let i = 0; i < 14; i++) {
    let obj = {}
    let today = new Date()
    let dates = new Date(today.setDate(today.getDate() + i));
    let year = dates.getFullYear()
    let month = dates.getMonth() + 1
    let date = dates.getDate()
    if (month < 10) { month = `0${month}` }
    if (date < 10) { date = `0${date}` }
    let fulldate = `${year}-${month}-${date}`
    obj.value = fulldate
    obj.label = fulldate
    dateOptions.push(obj)
  }

  let timeOptions = []
  for (let i = 0; i < 24; i++) {
    let obj = {}
    if (i < 10) { i = `0${i}` }
    obj.value = i
    obj.label = i
    timeOptions.push(obj)
  }

  let minuteOptions = [{ value: '00', label: '00' }]
  for (let i = 10; i < 60; i = i + 10) {
    let obj = {}
    obj.value = i
    obj.label = i
    minuteOptions.push(obj)
  }
  //


  //

  //React-select style
  const customStyles = value => ({
    control: (provided, state) => ({
      ...provided,
      alignItems: "baseline",
      backgroundColor: value ? "gray" : "white"
    })
  });



  return (

    <div className='whole-findpartner'>
      <div className='findpartner-container'>
        <div className='datepick-container'>
          <div className='datepick-title'>운동 일시</div>
          <div className='datepick-main'>
            <div className='date-title'>날짜</div><Select className='date-selectbox' options={dateOptions} placeholder='0000-00-00' styles={customStyles} />
            <Select className='time-selectbox' options={timeOptions} placeholder='00' styles={customStyles} /><div className=' time-title'>시</div>
            <Select className='minute-selectbox' options={minuteOptions} placeholder='00' styles={customStyles} /><div className='minute-title'>분</div>

        </div>
      </div>

      <div className='location-container'>
        <div className='list-section'>
          <div className='location-title'>헬스장 위치</div>
        </div>
        <div className='map-section'><FindMap /></div>
      </div>
      <div className='weight-container'>
        <div className='weight-title'>3대 운동 중량</div>
        <div className='weight-button'>
          <button className='weight-options'>100kg이하</button>
          <button className='weight-options'>100~200kg</button>
          <button className='weight-options-sample'>200~300kg</button>
          <button className='weight-options'>300~400kg</button>
          <button className='weight-options'>400~500kg</button>
          <button className='weight-options'>500kg 이상</button>
        </div>
      </div>

      <div className='bodypart-container'>
        <div className='bodypart-title'>운동부위</div>
        <div className='bodypart-section'>
          <div className='bodypart-1'>
            <button className='body-options-sample'>가슴</button>
            <button className='body-options-sample'>삼두</button>
          </div>
          <div className='bodypart-2'>
            <button className='body-options'>등</button>
            <button className='body-options'>이두</button>
          </div>
          <div className='bodypart-3'>
            <button className='body-options'>어깨</button>
            <button className='body-options'>하체</button>
          </div>
          <div className='bodypart-4'>
            <button className='body-options-sample'>복근</button>
            <button className='body-options-sample'>유산소</button>
          </div>
        </div>
      </div>

      <div className='message-container'>
        <div className='message-title'>파트너에게 하고싶은말(200자 이내로 작성해주세요)</div>
        <div className='message-wrap'><textarea className='message-input' maxLength='200' ></textarea></div>
      </div>

      <div className='button-container'>
        <div className='button-section'>
          <button className='findpartner-button'>파트너 찾기</button>
        </div>
      </div>


    </div>



    </div>

  )
}