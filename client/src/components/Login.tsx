import React from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { IUserStore, setUsername, setUserId } from "../store/userReducer";
import { useNavigate } from "react-router-dom";

function Login() {
  const username = useSelector((state: IUserStore) => state.username);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e: {
    target: { value: React.SetStateAction<string | undefined> };
  }) => {
    dispatch(setUsername(e.target.value));
  };

  const handleSubmit = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_AUTH_BASE_URL}/users`,
        {
          username,
        }
      );
      dispatch(setUserId(data._id));
      navigate("/");
    } catch (error: any) {
      console.log(error);
      alert(error.response.data.error);
    }
  };

  return (
    <div className="flex h-screen w-screen">
      <div className="flex h-screen w-screen flex-col items-center justify-center space-y-4">
        <p>Fill your username to enter</p>
        <input
          className="border-2 rounded-xl border-slate-600 p-2"
          value={username}
          onChange={handleChange}
        />
        <button
          className="border-2 rounded-xl border-slate-600 p-2"
          value={username}
          onClick={handleSubmit}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
