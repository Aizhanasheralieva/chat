import React, { useEffect, useState } from "react";
import { IMessage } from "../../types";
import { createLogger } from "vite";
import Form from "../Form/Form.tsx";

const Chat = () => {
  const url = "http://146.185.154.90:8000/messages";
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url);

      if (response.ok) {
        const messagesFromAPI = await response.json();
        console.log(messagesFromAPI);
        setMessages(messagesFromAPI);
      }
    };
    fetchData().catch((e) => console.error(e));
  }, []);

  const sendMessage = async (author: string, message: string) => {
    try {
      const data = new URLSearchParams();
      data.set("message", message);
      data.set("author", author);

      const response = await fetch(url, {
        method: "post",
        body: data,
      });
    } catch (error) {
      console.error("There is an error in sending message:", error);
    }
  };

  console.log(messages);

  return (
    <div>
      {messages.map((message) => (
        <p key={message._id}>{message.message}</p>
      ))}
      <Form onSendMessage={sendMessage} />
    </div>
  );
};
export default Chat;
