import React, { useEffect, useState } from 'react'
import Url from "./RouteUrl";
import axios from "axios";
import blank from "../image/black.png";


export const Chat = () => {
    const [data , setData ] = useState()
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

  const token = sessionStorage.getItem("token");


useEffect(()=>{
    if(!token){
        console.error("Token not found in session storage");
        setError("Token not found in session storage");
        setLoading(false);
        return;
    }
    const fetchData = async () =>{
        try {
            const response = await axios.get(Url.reader, {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              });
              setData(response.data.msg)
            //   setUserID(response.data.userID);
              setLoading(false);
        } catch (error) {
            console.error("Failed to fetch data:", error);
            setError("Failed to fetch data");
            setLoading(false);
        }
    };fetchData();
}, [token])

if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }


  return (
<>
<div className="userlists">
        {data.map((item, index) => (
          <div key={index}>
            <table>
              <tbody>
                <tr>
                  <td className="userlist">
                    <img
                      className="users"
                      src={item.filePath || blank}
                      alt="User"
                    />
                    <div
                      className="username"
                     
                    >
                      {item.name}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </div>
</>
  )
}
