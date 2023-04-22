import React, { useState } from 'react'
import './Join.scss';
import { Link } from 'react-router-dom';

const Join = () => {
    const [user, setMyUser] = useState("");

  return (
    <div className="joinContainer">
        <div className="joinCenterBox">
            <h1>Chat Poppins</h1>
            <input type="text" name='lo' id='joinInput' onChange={(e) => setMyUser(e.target.value)} required/>
            <Link onClick={(e) => !user ? e.preventDefault() : null} to={`/chat`} state={{
                user : user
            }}>
            <button className='joinButton'>join the chat</button>
            </Link>
        </div>
    </div>
  )
}

export default Join;