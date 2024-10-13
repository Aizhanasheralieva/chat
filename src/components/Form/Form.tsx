import React, { useState } from 'react';
import { IProps } from '../../types';

const Form: React.FC<IProps> = ({onSendMessage}) => {
  const [author, setAuthor] = useState('');
  const [message, setMessage] = useState('');

  const controlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && author.trim()) {
      onSendMessage(author, message);
      setMessage('');
      setAuthor('');
    }
  };
  return (
    <form onSubmit={controlSubmit} id="form">
      <div className="mb-3 w-50 ms-4">
        <label htmlFor="author" className="form-label">
          Author
        </label>
        <input
          type="text"
          className="form-control"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      <div className="mb-3 w-50 ms-4">
        <label htmlFor="author" className="form-label">
          Enter your message
        </label>
        <textarea
          className="form-control w-70"
          id="message"
          rows="3"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
      </div>
      <div className="mb-3 w-50 ms-4">
        <button type="sumbit" className="btn btn-primary" id="sendButton">
          Send
        </button>
      </div>
    </form>
  );
};

export default Form;
