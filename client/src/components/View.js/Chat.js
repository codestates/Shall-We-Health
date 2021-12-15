import React, { useEffect, useState } from 'react';
import './Chat.css';
import { useSelector } from 'react-redux';
import axios from 'axios';

export default function Chat({ data, postId, socket }) {
  const [content, setContent] = useState('');
  const [messageList, setMessageList] = useState([]);
  const { id, nickname } = useSelector((state) => state.loginReducer);
  const { guestNickname, hostId, hostNickname, guestId } = data;

  useEffect(() => {
    const chatRoom = document.getElementsByClassName('chat-messages')[0];
    chatRoom.scrollTop = chatRoom.scrollHeight;
  }, [messageList]);

  const handleSendMessage = async () => {
    await axios.post(
      `${process.env.REACT_APP_SERVER_API}/chat`,
      { roomId: postId, content },
      { withCredentials: true }
    );
    setContent('');
  };

  const getbeforeMessage = async () => {
    await axios
      .get(`${process.env.REACT_APP_SERVER_API}/chat/${postId}`, {
        params: { guestId, hostId },
      })
      .then((res) => {
        console.log(res.data.data, 'res');
        setMessageList(res.data.data);
      })
      .catch((err) => {
        if (err.response.status === 400) {
          console.log(err.response);
        }
      });
  };

  const Enterkeysend = async (e) => {
    if (e.key === 'Enter' && content !== '') {
      await sendMessage(); //socket.io 서버전달 핸들러 호출
      await handleSendMessage(); // 메세지 db 저장
    }
  };

  useEffect(() => {
    getbeforeMessage();
  }, []);

  const sendMessage = async () => {
    const now = new Date().toLocaleTimeString('en-Us', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
    const messageData = {
      room: postId,
      authorId: id,
      content: content,
      time: now,
    };
    console.log('msgData', messageData);
    setMessageList((list) => [...list, messageData]);
    await socket.emit('send_message', messageData);
  };

  useEffect(() => {
    socket.on('receive_message', (data) => {
      console.log(data, 'receive');
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className='chat-container'>
      <div className='chat-messages'>
        <div className='chat-open-comment'>
          {guestNickname}님과 {hostNickname}님의 대화가 시작되었습니다.
        </div>
        {messageList.map((el, idx) => {
          return (
            <div key={idx} className={el.authorId === id ? 'my-chat-sort' : ''}>
              <div className={el.authorId === id ? 'my-info' : 'other-info'}>
                {el.time}
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
