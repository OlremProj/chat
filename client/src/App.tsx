import React, { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import { IUserStore } from "./store/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import {
  IMessageStore,
  setMessages,
  addMessages,
} from "./store/messageReducer";
import EditIcon from "./components/icons/EditIcon";
import axios from "axios";

function App() {
  const bottomEl = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMessageEdit, setIsMessageEdit] = useState<string | undefined>(
    undefined
  );
  const [updatedMessage, setUpdatedMessage] = useState<string | undefined>(
    undefined
  );
  const { username, userId } = useSelector(
    (state: { user: IUserStore }) => state.user
  );
  const { messages } = useSelector(
    (state: { messages: IMessageStore }) => state.messages
  );
  const [newMessage, setNewMessage] = useState<string | undefined>();
  const socket = io(
    process.env.REACT_APP_API_AUTH_BASE_URL || "http://localhost:8080"
  );

  useEffect(() => {
    if (!userId) navigate("/login");
  }, [navigate, userId]);

  useEffect(() => {
    if (!userId) return;
    socket.emit("user-connect", {
      userId,
      username,
    });

    socket.on("history-messages", async (receivedMessages) => {
      dispatch(setMessages(receivedMessages));
    });
  }, [userId]);

  useEffect(() => {
    socket.on("new-message", async (message) => {
      dispatch(addMessages(message));
      (bottomEl?.current as any)?.scrollIntoView?.({ behavior: "smooth" });
    });
  }, [dispatch, messages, socket]);

  const handleChange = (e: {
    target: { value: React.SetStateAction<string | undefined> };
  }) => {
    setNewMessage(e.target.value);
  };

  const handleMessageChange = (e: {
    target: { value: React.SetStateAction<string | undefined> };
  }) => {
    setUpdatedMessage(e.target.value);
  };

  const submitChange = async (event: any, message: any) => {
    if (event.keyCode !== 13) return;

    socket.emit("update-message", {
      ...message,
      text: updatedMessage,
    });

    const editedMessages = messages.map((memoryMessage: any) => {
      if (memoryMessage._id === message._id)
        return { ...message, text: updatedMessage };

      return memoryMessage;
    });

    dispatch(setMessages(editedMessages));
    setUpdatedMessage(undefined);
    setIsMessageEdit(undefined);
  };

  const handleSubmit = async () => {
    socket.emit("send-message", {
      userId,
      newMessage,
    });
  };

  return (
    <div className="flex h-screen w-screen">
      <div className="flex h-screen w-screen flex-col items-center justify-center ">
        <p>
          Welcome to the chat room <span className="font-bold">{username}</span>
        </p>
        <div className="flex h-5/6 w-1/3 flex-col items-center justify-end space-y-4 p-8 border-2 border-slate-600 rounded-xl shadow-lg bg-slate-200">
          <div className="flex flex-col items-start space-y-4 overflow-y-auto h-full w-full bg-white rounded-xl">
            {messages.map((message: any, i) => (
              <div
                key={message._id}
                className={`${
                  i % 2 ? "bg-blue-200" : "bg-slate-300"
                } rounded-2xl h-fit w-fit p-2`}
                onClick={() => {
                  setIsMessageEdit(message._id);
                  setUpdatedMessage(message.text);
                }}
              >
                {message.user._id === userId && <EditIcon />}
                <div className="flex">
                  <p className="font-bold">{message.user.username}:</p>
                  {isMessageEdit === message._id ? (
                    <input
                      className="border-2 rounded-xl border-slate-600 p-2"
                      value={updatedMessage}
                      onChange={handleMessageChange}
                      onKeyDown={(event) => submitChange(event, message)}
                    />
                  ) : (
                    <p className="pl-2">{message.text}</p>
                  )}
                </div>
              </div>
            ))}
            <div ref={bottomEl}></div>
          </div>
          <div className="flex space-x-2">
            <input
              className="border-2 rounded-xl border-slate-600 p-2"
              value={newMessage}
              onChange={handleChange}
            />
            <button
              className="border rounded-xl border-indigo-700 p-2 bg-indigo-100 text-indigo-700 font-medium shadow-sm"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
