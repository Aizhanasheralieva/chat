import React, { useEffect, useState } from 'react';
import { IMessage } from '../../types';
import Form from '../Form/Form.tsx';

const Chat = () => {
  const url = 'http://146.185.154.90:8000/messages';
  const [messages, setMessages] = useState<IMessage[]>([]);
  let lastMessageDatetime: string | null = null;

  const fetchData = async () => {
    try {
      const response = await fetch(url);

      if (response.ok) {
        const messagesFromAPI = await response.json();
        console.log(messagesFromAPI);

        setMessages(messagesFromAPI);

        if (messagesFromAPI.length > 0) {
          lastMessageDatetime =
            messagesFromAPI[messagesFromAPI.length - 1].datetime;
        }
      }
    } catch (error) {
      console.error('There is some error in getting the messages:', error);
    }
  };

  const fetchNewMessages = async () => {
    if (lastMessageDatetime !== null) {
      try {
        const response = await fetch(
          'http://146.185.154.90:8000/messages?datetime=' + lastMessageDatetime,
        );

        if (response.ok) {
          const newMessages = await response.json();

          if (newMessages.length > 0) {
            setMessages((prevMessages) => [...prevMessages, ...newMessages]);
            lastMessageDatetime = newMessages[newMessages.length - 1].datetime;
          }
        }
      } catch (error) {
        console.error('Error fetching new messages:', error);
      }
    }
  };

  useEffect(() => {
    if (messages.length === 0) {
      void fetchData();
    }

    const interval = setInterval(() => {
      console.log('Receiving some messages every three seconds');
      void fetchNewMessages();
    }, 3000);

    return () => clearInterval(interval);
  }, [messages.length]);

  const sendMessage = async (author: string, message: string) => {
    try {
      const data = new URLSearchParams();
      data.set('message', message);
      data.set('author', author);

      const response = await fetch(url, {
        method: 'post',
        body: data,
      });
      if (response.ok) {
        void fetchData();
      } else {
        console.error('Failed to send message.');
      }
    } catch (error) {
      console.error('There is an error in sending message:', error);
    }
  };
  console.log(messages);

  return (
    <div>
      <Form onSendMessage={sendMessage}/>
      {messages
        .slice()
        .reverse()
        .map((message) => (
          <div key={message._id} className="card w-75 mb-3">
            <div className="card-body">
              <h6 className="card-title">
                {String(new Date(message.datetime))}
              </h6>
              <h4 className="card-title">{message.author} said:</h4>
              <p className="card-text">{message.message}</p>
            </div>
          </div>
        ))}
    </div>
  );
};
export default Chat;
