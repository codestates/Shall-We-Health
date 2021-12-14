import React, { useEffect, useState } from 'react';
import './Chat.css';
import { useSelector } from 'react-redux';
import axios from 'axios';
const moment = require('moment');

export default function Chat({ data, postId, socekt }) {
  const [content, setContent] = useState('');
  const [messageList, setMessageList] = useState([]);
  const { id, nickname } = useSelector((state) => state.loginReducer);
  const { guestNickname, hostId, hostNickname, guestId } = data;

  useEffect(() => {
    const chatRoom = document.getElementsByClassName('chat-messages')[0];
    chatRoom.scrollTop = chatRoom.scrollHeight;
  }, [messageList]);

  //*---------------------------------axios------------------------*//
  // 채팅한거 db 저장
  const handleSendMessage = async () => {
    await axios.post(
      `${process.env.REACT_APP_SERVER_API}/chat`,
      { roomId: postId, content },
      { withCredentials: true }
    );
  };

  // 이전데이터받아오기
  const getbeforeMessage = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_SERVER_API}/chat/${postId}`,
        // { params: { guestId, hostId } }) // 원래코드임
        { params: { guestId: 1, hostId } }
      )

      .then((res) => {
        /* 이전 데이터 있는경우  */
        console.log(res);
        console.log(res.data.data, 'res');
        setMessageList(res.data.data);
      })
      .catch((err) => {
        // if (err.response.status === 400) {
        console.log(err.response);
        /* postId_hostId/GuestId  하나라도 없는경우 에러*/
        // }
      });
  };

  const Enterkeysend = async (e) => {
    if (e.key === 'Enter' && content !== '') {
      sendMessage(); //socket.io 서버전달 핸들러 호출
      await handleSendMessage(); // 메세지 db 저장
      setMessageList([
        ...messageList,
        {
          authorId: id,
          nickname: nickname,
          createdAt: moment(),
          content: e.target.value,
        },
      ]);
      await setContent('');
    }
  };

  useEffect(() => {
    getbeforeMessage();
  }, []);

  //*---------------------------------axios------------------------*//

  //*---------------------------------socket------------------------*//
  const sendMessage = async () => {
    const messageData = {
      room: postId,
      authorId: id,
      content: content,
      time: new Date(),
    };
    console.log('msgData', messageData);

    await socekt.emit('send_message', messageData);
    setMessageList((list) => [...list, messageData]);
  };

  console.log(messageList, 'messageList');

  useEffect(() => {
    socekt.on('receive_message', (data) => {
      console.log(data, 'receive');
      setMessageList((list) => [...list, data]);
    });
  }, [socekt]);

  //*---------------------------------socket------------------------*//

  return (
    <div className='chat-container'>
      <div className='chat-messages'>
        <div className='chat-open-comment'>
          {' '}
          {guestNickname}님과 {hostNickname}님의 대화가 시작되었습니다.
        </div>
        {messageList.map((el, idx) => {
          return (
            <div key={idx} className={el.authorId === id ? 'my-chat-sort' : ''}>
              <div className={el.authorId === id ? 'my-info' : 'other-info'}>
                {moment(el.createdAt).format('hh:mm a')}
              </div>
              <div className={el.authorId === id ? 'my-chat' : 'other-chat'}>
                {el.content}
              </div>
            </div>
          );
        })}
      </div>
      <div className='input-send-line'>
        <input
          className='input-message'
          value={content}
          name='chat'
          onChange={(e) => setContent(e.target.value)}
          onKeyPress={Enterkeysend}
        />
        <button className='btn-send' onClick={handleSendMessage}>
          전송
        </button>
      </div>
    </div>
  );
}
