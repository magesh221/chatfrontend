import React, { useEffect, useState } from "react";
import "./css/ChatBox.css"; 
import axios from "axios";
import Url from "./RouteUrl"; 
import { io } from "socket.io-client";


export const DataComponent = () => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [receiverId, setReceiverId] = useState();
  const [message, setMessage] = useState();
  const [content, setContent] = useState("");
  const [addmsg, setAddmsg] = useState("");

  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        console.error("Token not found in session storage");
        setError("Token not found in session storage");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(Url.reader, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data.msg);
        console.log("response.data.userID: ", response.data);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const clickHandler = async (receiver) => {
    setReceiverId(receiver);
  };
  const addcontent = (e) => {
    const value = e.target.value;
    // setContent();
    setAddmsg(value);
  };
  const submitmsg = () => {
    setContent(addmsg);
    console.log("after onclick");
    setAddmsg("");
  };
  useEffect(() => {
    try {
      const socket = io(Url.socketUrl, {
        auth: { token },
      });

      socket.on("connect", () => {
        console.log("Connected to socket server");
      });

      const data = {
        receiver: receiverId,
      };

      socket.emit("message", data);
      socket.on("getmsg", (messages) => {
        setMessage(messages);
      });

      const addmessage = {
        receiver: receiverId,
        message: content,
      };

      socket.emit("message", addmessage);
      socket.on("getmsg", (addmessga) => {
        setMessage(addmessga);
      });
    } catch (error) {
      console.log("error: ", error);
    }
  },[receiverId,content]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="parentdiv">
        <div className="sidebar">
          <div className="userlists">
            {data.map((item, index) => (
              <div key={index}>
                <td className="userlist">
                  <img
                    className="users"
                    src={item.filePath || "black.png"}
                    alt="User"
                  />
                  <div
                    className="username"
                    onClick={() => clickHandler(item._id)}
                  >
                    {item.name}
                  </div>
                </td>
              </div>
            ))}
          </div>
        </div>
        <div className="chatsidebar">
      

          
        {receiverId === undefined ? (
          <img className="kittykitty" src="meow.gif" alt="Meow" />
        ):(
          <div>
            {message.map((item, index) => (
              <div
                key={index}
                className={
                  receiverId === item.receiver
                    ? "chat_msg sender_text"
                    : "chat_msg"
                }
              >
                <span>{item.message}</span>
              </div>
            ))}
          </div>
          )}

        </div>
        <div className="messagebox">
          <div className="input-field">
            <input
              className="inputbox"
              type="text"
              placeholder="message"
              onChange={addcontent}
              value={addmsg}
            />
            <button className="button" onClick={submitmsg}>
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
