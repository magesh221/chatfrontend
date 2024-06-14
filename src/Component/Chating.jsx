import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export const ChatComponent = () => {
    const [rep , setRep] = useState();
    const [message , setMessage] = useState()

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            console.error('Token not found in session storage');
            return;
        }

        const socket = io('ws://localhost:8500', {
            auth: {
                token: token
            }
        });

        const data = "665aecae0019fbadcae5c473";

        // Emit 'userActive' event with data when component unmounts
        socket.emit('userActive', data);
        socket.on('data',(datas)=>{
            console.log('data: ', datas);
            setMessage(datas)
        })

        socket.emit('message',data)




        // Disconnect the socket when component unmounts
        return () => {
            socket.disconnect();
        };
    }, []); // Run effect only once on component mount

    useEffect(() => {
        // Update rep state with data when component mounts
        const data = "665aecae0019fbadcae5c473";
        setRep(data);
    }, []);

    return (
        <div>
            <p>Hi, this is the socket connection setup</p>
            <div>
                <p>{rep}</p>
                <p>{message}</p>
            </div>
        </div>
    );
};
