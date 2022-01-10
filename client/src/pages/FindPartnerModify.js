import React, { useEffect, useState } from 'react';
import './FindPartner.css';
import Select from 'react-select'
import FindMap from '../components/FindPartner/FindMap';
import axios from 'axios';
import { useSelector } from 'react-redux'


export default function FindPartnerModify({ match }) {
    const postNumber = match.params.postId
    const userId = useSelector((state) => state.loginReducer.id)
    const [searchResult, setSearchResult] = useState('')
    const [inputText, setInputText] = useState("");
    const [place, setPlace] = useState("");
    const [markerPlace, setMarkerPlace] = useState({})
    const [modal, setModal] = useState(false)
    const [modalMsg, setModalMsg] = useState('')
    const [pkId, setPkId] = useState('')
    const [year, setYear] = useState('')
    const [hour, setHour] = useState('00')
    const [minute, setMinute] = useState('00')
    const [sbd, setSbd] = useState([])
    const [text, setText] = useState('즐겁게 운동해요!')
    const [bodypartOptions, setBodyPartOptions] = useState([])
    // const [isSelected, setIsSelected] = useState('')
    console.log(match)

    const getPostData = async () => {

        await axios.get(`${process.env.REACT_APP_SERVER_API}/posts/${postNumber}`)
            .then((res) => {
                axios.get(`${process.env.REACT_APP_SERVER_API}/users/auth`, {
                    withCredentials: true,
                })
                    .then((res2) => {
                        if (res2.data.data.decoded.id !== res.data.data[0].hostId) {
                            window.location.replace('/board')
                        }
                    })
                // 2021-12-17T18:20:01.000Z
                // console.log(res.data.data[0].reserved_at.slice(0, 10))
                // console.log(res.data.data[0].reserved_at.slice(5, 7))
                // console.log(res.data.data[0].reserved_at.slice(8, 10))
                // console.log(res.data.data[0].reserved_at.slice(11, 13))
                // console.log(res.data.data[0].reserved_at.slice(14, 16))

                setYear(res.data.data[0].reserved_at.slice(0, 10))
                setHour(res.data.data[0].reserved_at.slice(11, 13))
                setMinute(res.data.data[0].reserved_at.slice(14, 16))
                setMarkerPlace(res.data.data[0].location)
                setSbd(res.data.data[0].description.sbd)
                setBodyPartOptions(res.data.data[0].description.bodyPart)
                setText(res.data.data[0].description.message)

            })
    }



    useEffect(() => {
        getPostData()

    }, [postNumber])



    function CreateModal({ setModal, modalMsg }) {
        return (
            <div className='modalmatch-container'>
                <div className='box-modal'>
                    <div className='modal-message'>{modalMsg}</div>
                    <div>
                        <span
                            onClick={() => {
                                if (modalMsg === '수정되었습니다.') {
                                    window.location.replace(`/view/${pkId}`)
                                }
                                else
                                    setModal(false);
                            }}
                        >
                            확인
                        </span>
                    </div>
                </div>
            </div>
        );
    }
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
        obj.value = `${i}`
        obj.label = `${i}`
        timeOptions.push(obj)
    }

    let minuteOptions = [{ value: '00', label: '00' }]
    for (let i = 10; i < 60; i = i + 10) {
        let obj = {}
        obj.value = `${i}`
        obj.label = `${i}`
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

    let description = {
        "sbd": sbd,
        "bodyPart": bodypartOptions,
        "message": text
    }

    useEffect(() => {
        window.scrollTo({
            top: 0,
        });
    }, []);


    const yearChange = (value) => {
        setYear(value.value)
    }
    const hourChange = (value) => {
        setHour(value.value)
    }
    const minuteChange = (value) => {
        setMinute(value.value)
    }
    const sbdChange = (e) => {
        setSbd(e.target.value)
    }

    const textChange = (e) => {
        setText(e.target.value)
    }
    const getCheckboxValue = () => {
        // 선택된 목록 가져오기
        const query = 'input[name="bodyOptions"]:checked';
        const selectedEls =
            document.querySelectorAll(query);

        // 선택된 목록에서 value 찾기
        let bodypartArr = [];
        selectedEls.forEach((el) => {
            bodypartArr.push(el.value);
        });

        setBodyPartOptions(bodypartArr)
        // 출력
        console.log(bodypartArr)
        console.log(description)

    }


    useEffect(() => {

    }, [modalMsg])
    useEffect(() => {
        description.sbd = sbd

    }, [sbd])


    const handleSubmit = () => {
        const reserveTime = `${year} ${hour}:${minute}:00`
        console.log(reserveTime)
        console.log(markerPlace)
        console.log(description)
        if (reserveTime && userId && sbd && bodypartOptions.length > 0 && markerPlace.address_name) {
            axios.patch(`${process.env.REACT_APP_SERVER_API}/posts/${postNumber}/content`, {
                reserved_at: reserveTime,
                location: markerPlace,
                description: description
            }, { withCredentials: true })
                .then((res) => {
                    if (res.status === 200) {
                        setPkId(res.data.data)
                        setModalMsg('수정되었습니다.')
                        setModal(true)
                    }

                })
        }
        else if (!userId) {
            setModalMsg('로그인 후 수정 가능합니다.')
            setModal(true)
        }
        else if (!reserveTime || !sbd || bodypartOptions.length === 0 || !markerPlace.address_name) {
            setModalMsg('선택하지 않은 정보가 있습니다.')
            setModal(true)
        }

    }


    return (

        <div className='whole-findpartner'>
            <div className='findpartner-container'>
                <div className='datepick-container'>
                    <div className='datepick-title'>운동 일시</div>
                    <div className='datepick-main'>
                        <div className='date-title'>날짜</div>
                        <Select className='date-selectbox' options={dateOptions} value={dateOptions.find(op => { return op.value === year })} onChange={yearChange} placeholder='0000-00-00' styles={customStyles} />
                        <Select className='time-selectbox' options={timeOptions} value={timeOptions.find(op => { return op.value === hour })} onChange={hourChange} placeholder='00' styles={customStyles} />
                        <div className=' time-title'>시</div>
                        <Select className='minute-selectbox' options={minuteOptions} value={minuteOptions.find(op => { return op.value === minute })} onChange={minuteChange} placeholder='00' styles={customStyles} />
                        <div className='minute-title'>분</div>

                    </div>
                </div>

                <div className='location-container'>
                    <div className='list-section'>
                        <div className='location-title'>헬스장 위치</div>
                    </div>
                    <div className='map-section'><FindMap searchResult={searchResult}
                        setSearchResult={setSearchResult}
                        inputText={inputText}
                        setInputText={setInputText}
                        place={place}
                        setPlace={setPlace}
                        markerPlace={markerPlace}
                        setMarkerPlace={setMarkerPlace}
                    /></div>
                </div>
                <div className='weight-container'>
                    <div className='weight-title'>3대 운동 중량</div>
                    <div className='weight-button'>

                        <input type='radio' id='ud100' value='100kg이하' name='weightOptions' checked={sbd === '100kg이하' ? 'on' : ''} onClick={sbdChange} />
                        <label className='weight-button-label' for='ud100' >100kg이하</label>


                        <input type='radio' id='bt100-200' value='100~200kg' name='weightOptions' checked={sbd === '100~200kg' ? 'on' : ''} onClick={sbdChange} />
                        <label className='weight-button-label' for='bt100-200'  >100~200kg</label>


                        <input type='radio' id='bt200-300' value='200~300kg' name='weightOptions' checked={sbd === '200~300kg' ? 'on' : ''} onClick={sbdChange} />
                        <label className='weight-button-label' for='bt200-300' >200~300kg</label>


                        <input type='radio' id='bt300-400' value='300~400kg' name='weightOptions' checked={sbd === '300~400kg' ? 'on' : ''} onClick={sbdChange} />
                        <label className='weight-button-label' for='bt300-400' >300~400kg</label>


                        <input type='radio' id='bt400-500' value='400~500kg' name='weightOptions' checked={sbd === '400~500kg' ? 'on' : ''} onClick={sbdChange} />
                        <label className='weight-button-label' for='bt400-500' >400~500kg</label>


                        <input type='radio' id='ov500' value='500kg이상' name='weightOptions' checked={sbd === '500kg이상' ? 'on' : ''} onClick={sbdChange} />
                        <label className='weight-button-label' for='ov500' >500kg이상</label>

                    </div>
                </div>

                <div className='bodypart-container'>
                    <div className='bodypart-title'>운동부위</div>
                    <div className='bodypart-section'>
                        <div className='bodypart-1'>

                            <input type='checkbox' id='chest' value='가슴' checked={bodypartOptions.some((el) => el === '가슴') ? 'on' : ''} name='bodyOptions' onClick={getCheckboxValue} />
                            <label className='body-options-label' for='chest' >가슴</label>

                            <input type='checkbox' id='triceps' value='삼두' checked={bodypartOptions.some((el) => el === '삼두') ? 'on' : ''} name='bodyOptions' onClick={getCheckboxValue} />
                            <label className='body-options-label' for='triceps'>삼두</label>
                        </div>
                        <div className='bodypart-2'>

                            <input type='checkbox' id='back' value='등' checked={bodypartOptions.some((el) => el === '등') ? 'on' : ''} name='bodyOptions' onClick={getCheckboxValue} />
                            <label className='body-options-label' for='back' >등</label>

                            <input type='checkbox' id='biceps' value='이두' checked={bodypartOptions.some((el) => el === '이두') ? 'on' : ''} name='bodyOptions' onClick={getCheckboxValue} />
                            <label className='body-options-label' for='biceps'>이두</label>
                        </div>
                        <div className='bodypart-3'>

                            <input type='checkbox' id='shoulder' value='어깨' checked={bodypartOptions.some((el) => el === '어깨') ? 'on' : ''} name='bodyOptions' onClick={getCheckboxValue} />
                            <label className='body-options-label' for='shoulder' >어깨</label>

                            <input type='checkbox' id='leg' value='하체' checked={bodypartOptions.some((el) => el === '하체') ? 'on' : ''} name='bodyOptions' onClick={getCheckboxValue} />
                            <label className='body-options-label' for='leg'>하체</label>
                        </div>

                        <div className='bodypart-4'>

                            <input type='checkbox' id='abs' value='복근' checked={bodypartOptions.some((el) => el === '복근') ? 'on' : ''} name='bodyOptions' onClick={getCheckboxValue} />
                            <label className='body-options-label' for='abs' >복근</label>

                            <input type='checkbox' id='cardio' value='유산소' checked={bodypartOptions.some((el) => el === '유산소') ? 'on' : ''} name='bodyOptions' onClick={getCheckboxValue} />
                            <label className='body-options-label' for='cardio'>유산소</label>
                        </div>
                    </div>
                </div>

                <div className='message-container'>
                    <div className='message-title'>파트너에게 하고싶은말(200자 이내로 작성해주세요)</div>
                    <div className='message-wrap'><textarea id='message-input' maxLength='200' value={text} onChange={textChange} ></textarea></div>
                </div>

                <div className='button-container'>
                    <div className='button-section'>
                        <button className='findpartner-button' onClick={handleSubmit}>수정하기</button>
                    </div>
                </div>
            </div>

            {modal ? <CreateModal setModal={setModal} modalMsg={modalMsg} /> : ''}
        </div>

    )
}