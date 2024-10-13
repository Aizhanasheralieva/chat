import React from "react";

const Form = () => {
  return (
    <div>
      <form id="form">
        <div className="mb-3 w-50 ms-4">
          <label htmlFor="author" className="form-label">
            Author
          </label>
          <input type="text" className="form-control" id="author" />
        </div>
        <div className="mb-3 w-50 ms-4">
          <label htmlFor="author" className="form-label">
            Enter your message
          </label>
          <textarea
            className="form-control w-70"
            id="message"
            rows="3"
          ></textarea>
        </div>
        <div className="mb-3 w-50 ms-4">
          <button href="#" className="btn btn-primary" id="sendButton">
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
