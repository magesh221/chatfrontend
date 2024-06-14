// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Url from "./RouteUrl";
// import blank from "../image/black.png";
// import { io } from "socket.io-client";

// export function DataComponent() {
//   const [data, setData] = useState([]);
//   const [message, setMessage] = useState(null);
//   const [ID, setID] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const token = sessionStorage.getItem("token");

//   useEffect(() => {
//     if (!token) {
//       console.error("Token not found in session storage");
//       setError("Token not found in session storage");
//       setLoading(false);
//       return;
//     }

//     const fetchData = async () => {
//       try {
//         const response = await axios.get(Url.reader, {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setData(response.data.msg);
//         setLoading(false);
//       } catch (err) {
//         setError("Failed to fetch data");
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [token]);


//   const socket = io(Url.socketUrl, {
//     auth: { token },
//   });
  
//   useEffect(() => {
//     if (!token) {
//       console.error("Token not found in session storage");
//       return;
//     }

//     socket.on("connect", () => {
//       console.log("Connected to socket server", ID);

//       if (ID) {
//         const data = { receiver: ID };
//         socket.emit("message", data);
//       }
//       socket.on("getmsg", (messagedata) => {
//         console.log("message: ", messagedata);
//         setMessage(messagedata);
//       });
//     });

   

//     // socket.on("disconnect", () => {
//     //   console.log("Disconnected from socket server");
//     // });

//     return () => {
//       // socket.disconnect();
//     };
//   }, [token, ID]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }
//   const clickHandler = (id) => {
//     console.log('click handler: ', id)
//     setID(id)
//   };

//   return (
//     <div className="chatComponent" >
//       <div className="userlists">
//         {data.map((item, index) => (
//           <div key={index}>
//             <table>
//               <tbody>
//                 <tr>
//                   <td className="userlist">
//                     <img
//                       className="users"
//                       src={item.filePath || blank}
//                       alt="User"
//                     />
//                     <div
//                       className="username"
//                       onClick={() => clickHandler(item._id)}
//                     >
//                       {item.name}
//                     </div>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         ))}
//       </div>
//       <div className="chat">
//         <p>This is a chat application</p>
//         <p>{message?.map((item,index)=>(
//           <div key = {index}>
//             <p>{item.message}</p>
//           </div>
//         ))}</p>
//       </div>
//     </div>
//   );
// }
































// return (
//     <div className="chatComponent">
//       <div className="userlists">
//         {data.map((item, index) => (
//           <div key={index}>
//             <table>
//               <tbody>
//                 <tr>
//                   <td className="userlist">
//                     <img
//                       className="users"
//                       src={item.filePath || blank}
//                       alt="User"
//                     />
//                     <div
//                       className="username"
//                       onClick={() => clickHandler(item._id)}
//                     >
//                       {item.name}
//                     </div>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         ))}
//       </div>
//       <div className="chat">
//         {messages.map((item, index) => (
//           <div
//             key={index}
//             className={`message ${item.sender === userID ? 'sent' : 'received'}`}
//           >
//             <p>{item.message}</p>
//           </div>
//         ))}
//               <div className="footer_box">
//         <input type="text" placeholder="message" />
//         <button className="messageButton">send</button>

//       </div>
//       </div>

//     </div>
//   );













// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Url from "./RouteUrl"; // Assuming this file has the URLs for your endpoints
// import blank from "../image/black.png";
// import { io } from "socket.io-client";
// import "./css/ChatBox.css";

// export function DataComponent() {
//   const [data, setData] = useState([]);
//   const [messages, setMessages] = useState([]);
//   const [ID, setID] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [userID, setUserID] = useState(null);
//   const [newMessage, setNewMessage] = useState("");

//   const token = sessionStorage.getItem("token");

//   useEffect(() => {
//     if (!token) {
//       console.error("Token not found in session storage");
//       setError("Token not found in session storage");
//       setLoading(false);
//       return;
//     }

//     const fetchData = async () => {
//       try {
//         const response = await axios.get(Url.reader, {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setData(response.data.msg);
//         setUserID(response.data.userID);
//         console.log("response.data.userID: ", response.data);

//         setLoading(false);
//       } catch (err) {
//         console.error("Failed to fetch data:", err);
//         setError("Failed to fetch data");
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [token]);

//   useEffect(() => {
//     if (!token) return;

//     const socket = io(Url.socketUrl, {
//       auth: { token },
//     });

//     socket.on("connect", () => {
//       console.log("Connected to socket server");
//     });

//     socket.on("getmsg", (messagedata) => {
//       console.log("Received message:", messagedata);
//       setMessages(messagedata);
//     });

//     socket.on("disconnect", () => {
//       console.log("Disconnected from socket server");
//     });

//     if (ID) {
//       const data = {
//         receiver: ID,
//         message: newMessage,
//       };
//       socket.emit("message", data);
//     }

//     return () => {
//       socket.disconnect();
//     };
//   }, [ID, token, newMessage]);

//   const clickHandler = (id) => {
//     console.log("Clicked user ID:", id);
//     setID(id);
//     // setMessages([]); // Clear previous messages
//   };

//   const handleMessageChange = (e) => {
//     setNewMessage(e.target.value);
//   };

//   const handleSendMessage = async () => {
//     if (newMessage.trim() === "") {
//       return;
//     }

//     const messageData = {
//       sender: userID,
//       receiver: ID,
//       message: newMessage,
//     };
//     console.log("userID:****************** ", userID);

//     // Save message to the server
//     try {
//       const response = await axios.post(Url.saveMessage, messageData, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       console.log("Message saved:", response.data);

//       // Update local state
//       setMessages((prevMessages) => [...prevMessages, response.data.message]);
//     } catch (error) {
//       console.error("Failed to save message:", error);
//       setError("Failed to save message");
//     }

//     // Reset input field
//     setNewMessage("");

//     // Emit the message to the socket
//     const socket = io(Url.socketUrl, {
//       auth: { token },
//     });
//     socket.emit("message", messageData);
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }
//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div className="chatComponent">
//       <div className="userlists">
//         {data.map((item, index) => (
//           <div key={index}>
//             <td className="userlist">
//               <img className="users" src={item.filePath || blank} alt="User" />
//               <div className="username" onClick={() => clickHandler(item._id)}>
//                 {item.name}
//               </div>
//             </td>
//           </div>
//         ))}
//       </div>
//       <div className="chat">
//         {messages
//           .filter(
//             (msg) =>
//               (msg.receiver === ID && msg.sender === userID) ||
//               (msg.sender === ID && msg.receiver === userID)
//           )
//           .map((item, index) => (
//             <div
//               key={index}
//               className={`message ${
//                 item.sender === userID ? "sent" : "received"
//               }`}
//             >
//               <div className="messageContent">
//                 <p>{item.message}</p>
//               </div>
//             </div>
//           ))}
//         <div className="footer_box">
//           <input
//             type="text"
//             placeholder="Type your message here..."
//             value={newMessage}
//             onChange={handleMessageChange}
//           />
//           <button className="messageButton" onClick={handleSendMessage}>
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
