import { useState, useRef } from "react";
import messageForm from "../styles/messageForm.scss";
import { AiOutlineCloudUpload } from "react-icons/ai";

export default function ({ getMessage, submitMessage, selectImage, inputRef }) {
  return (
    <form onSubmit={submitMessage} className="message-form">
      <label htmlFor="img">
        <AiOutlineCloudUpload className="upload-icon" />
      </label>
      <input
        type="file"
        accept="image/*"
        id="img"
        style={{ display: "none" }}
        onChange={(e) => selectImage(e)}
      />
      <div>
        <input
          type="text"
          placeholder="Enter message"
          onChange={(e) => getMessage(e)}
          ref={inputRef}
        />
      </div>
      <div>
        <div className="form-btn">
          <button type="submit">Send</button>
        </div>
      </div>
    </form>
  );
}
