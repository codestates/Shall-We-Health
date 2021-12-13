import React, { useEffect, useState } from 'react';
import './Chat.css'
import dummy1 from './seonyeongDummy';
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';
require("socket.io-client")


export default function Chat({ data, postId }) {
  const [message, setMessage] = useState('')
  const [messageList, setMessageList] = useState([...dummy1])
  const { id } = useSelector((state) => state.loginReducer);
  const { guestNickname, hostId, hostNickname } = data

  console.log(id)

  useEffect(() => {
    const chatRoom = document.getElementsByClassName('chat-messages')[0]
    // document.getElementsByClassName('chat-messages')[0].addEventListener('scroll', trackScrolling);
    chatRoom.scrollTop = chatRoom.scrollHeight
  }, [messageList])

  //*---------------------------------axios------------------------*//
  // 채팅한거 db 저장
  // const handleSendMessage = async () => {
  //   await axios.post(`${process.env.REACT_APP_SERVER_API}/chats`,
  //     { email })
  // }

  // 이전데이터받아오기
  // const getbeforeMessage = () => {
  //   const res = await axios.get(`${process.env.REACT_APP_SERVER_API}/chats`,
  //     { params: { postId, guestId, hostId, reserved_at } })
  // }
  //*---------------------------------axios------------------------*//


  //*---------------------------------socket------------------------*//

  const Enterkeysend = async (e) => {
    if (e.key === "Enter" && message !== "") {
      //socket.io 서버전달 핸들러 호출
      // await sendMessages()
      setMessageList([...messageList, { id: id, nickname: guestNickname, datetime: '1:19pm', message: e.target.value }]);
      await setMessage('')

    }
  }




  return (

    <div className='chat-container'>
      {/* <button onClick={joinRoom}>채팅하기</button> */}
      <div className='chat-messages' >
        <div className='chat-open-comment'> {guestNickname}님과 {hostNickname}님의 대화가 시작되었습니다.</div>
        {messageList.map((el, idx) => {
          return (
            <div key={idx} className={el.id === id ? 'my-chat-sort' : ""}>
              <div className={el.id === id ? 'my-info' : 'other-info'} > {el.datetime}  </div>
              <div className={el.id === id ? 'my-chat' : 'other-chat'} > {el.message} </div>
            </div>
          )
        })}
      </div>
      <div className="input-send-line">
        <input className='input-message' value={message} name='chat' onChange={(e) => setMessage(e.target.value)} onKeyPress={Enterkeysend} />
        <button className='btn-send'>전송</button>
      </div>
    </div >


  )
}