import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import socketIO from "socket.io-client";
import "./Chat.scss";
import Message from '../Messages/Messages';
import ReactScroll from 'react-scroll-to-bottom';

let socket;

const Chat = () => {
    const [id, setId] = useState("");
    const [messages, setMessage] = useState([1, 2, 3, 4])
    const location = useLocation();
    const {user} = location.state;

    const sendMessage = () => {
        const message = document.getElementById("chatInput").value;
        socket.emit("message", {message, id});
        document.getElementById("chatInput").value = "";
    }

    useEffect(() => {
        socket = socketIO("http://localhost:5000/", {
        transports : ["websocket"]
        });

        socket.on("connect", () => {
            console.log("Connected");
            setId(socket.id);
        })
        socket.emit("joined", {user});
        socket.on("welcome", (data) => {
            setMessage([
                ...messages, data
            ])
        })
        
        socket.on("userJoined", (data) => {
            setMessage([
                ...messages, data
            ])
        });

        socket.on("left", (data) => {
            setMessage([
                ...messages, data
            ])
        })

        return () => {
            socket.emit("disconnected");
            socket.off();
        }
    }, []);

    useEffect(() => {
        socket.on("sendMessage", (data) => {
            setMessage([
                ...messages, data
            ])
        })

        return () => {
            socket.off();
        }
    }, [messages])
  return (
    <div className="chatPage">
        <div className="chatContainer">
            <div className="header"></div>
            <ReactScroll className="chatBox">
                {
                    messages && messages.map((elem) => {
                        return <Message user={elem.id === id ? "" : elem.user} message={elem.message} classs={elem.id === id ? "right" : "left"} />
                    })
                }
            </ReactScroll> 
            <div className="inputBox">
                <input type="text" id='chatInput' />
                <button className='sendBtn' onClick={sendMessage}> send </button>
            </div>
        </div>
    </div>
  )
}

export default Chat;