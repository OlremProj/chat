import React, { useEffect, useState } from "react";
import "./App.css";
import { IUserStore } from "./store/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { IMessageStore, setMessages } from "./store/messageReducer";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const socket = io(
    process.env.REACT_APP_API_AUTH_BASE_URL || "http://localhost:8080"
  );
  const { username, userId } = useSelector(
    (state: { user: IUserStore }) => state.user
  );
  const { messages } = useSelector(
    (state: { messages: IMessageStore }) => state.messages
  );
  const [newMessage, setNewMessage] = useState<string | undefined>();

  useEffect(() => {
    if (!userId) navigate("/login");
  }, [navigate, userId]);

  socket.emit("user-connect", {
    userId,
    username,
  });

  socket.on("history-messages", async (receivedMessages) => {
    dispatch(setMessages(receivedMessages));
  });

  const handleChange = (e: {
    target: { value: React.SetStateAction<string | undefined> };
  }) => {
    setNewMessage(e.target.value);
  };

  const handleSubmit = async () => {};

  return (
    <div className="flex h-screen w-screen">
      <div className="flex h-screen w-screen flex-col items-center justify-center ">
        <p>
          Welcome to the chat room <span className="font-bold">{username}</span>
        </p>
        <div className="flex h-5/6 w-1/3 flex-col items-center justify-end space-y-4 p-8 border-2 border-slate-600 rounded-xl shadow-lg bg-slate-200">
          <div className="flex h-full w-full bg-white rounded-xl">
            {messages.map((message) => (
              <p>{message.toString()}</p>
            ))}
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
