import React, { useEffect, useState } from 'react';
import './Chat.css'
import dummy1 from './seonyeongDummy';
import { io } from 'socket.io-client';
require("socket.io-client")


export default function Chat() {
  const [message, setMessage] = useState('')
  const [dummy, setDummy] = useState([...dummy1])

  const trackScrolling = () => {
    const chatRoom = document.getElementsByClassName('chat-messages')
    if (chatRoom.scrollHeight - chatRoom.scrollTop === chatRoom.clientHeight) {
      document.removeEventListener('scroll', trackScrolling);
    }
  };

  useEffect(() => {
    const chatRoom = document.getElementsByClassName('chat-messages')[0]
    document.getElementsByClassName('chat-messages')[0].addEventListener('scroll', trackScrolling);
    chatRoom.scrollTop = chatRoom.scrollHeight
  })

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
  //   socket.emit('disconnect')
  let roomId = '1', nickname = '형광언더아머', testdatetime = "1:39 PM";

  // const socket = io("http://localhost:8080")


  // useEffect(() => {
  //   socket.on("render", (data) => {
  //     setDummy([...dummy, data]);
  //   });
  // });

  // socket.on("connect", () => {
  //   console.log(socket.connected); // true
  // });

  // const joinRoom = () => {
  //   socket.emit('joinroom', `${roomId}`)
  // }


  // const sendMessages = async () => {
  //   const sendData = { message, roomId, nickname }
  //   await socket.emit('message', sendData)
  // }
  //*---------------------------------socket------------------------*//

  const Enterkeysend = async (e) => {
    if (e.key === "Enter") {
      //socket.io 서버전달 핸들러 호출
      // await sendMessages()
      setDummy([...dummy, { nickname, datetime: testdatetime, message: e.target.value }]);
      await setMessage('')

    }
  }




  return (

    <div className='chat-container'>
      {/* <button onClick={joinRoom}>채팅하기</button> */}
      <div className='chat-messages' >
        <div className='chat-open-comment'> (신청자)님과 (모집자)님의 대화가 시작되었습니다.</div>
        {dummy.map((el, idx) => {
          if (el.nickname === "형광언더아머")
            return (
              <div key={idx} className='my-chat-sort'>
                <div className='my-info'> {el.datetime}  </div>
                <div className='my-chat' > {el.message} </div>
              </div>
            )
          else if (el.nickname === "성난이두")
            return (
              <div key={idx}>
                <div className='other-info'> {el.nickname} {el.datetime}  </div>
                <div className='other-chat'> {el.message} </div>
              </div>
            )
        })}
      </div>
      <div className="input-send-line">
        <input className='input-message' value={message} name='chat' onChange={(e) => setMessage(e.target.value)} onKeyPress={Enterkeysend} />
        <button className='btn-send'>전송</button>
      </div>
    </div>


  )
}