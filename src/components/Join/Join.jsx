import React, { useState } from 'react'
import './Join.scss';
import { Link } from 'react-router-dom';
import { WechatOutlined } from '@ant-design/icons';

const Join = () => {
    const [user, setMyUser] = useState("");

  return (
    <div className="joinContainer">
        <div className="joinCenterBox">
            <h2 className='appName'>Pop Ups <WechatOutlined style={{
              fontSize : "25px"
            }} /></h2>
            <p className='liner'>(friends/family chats room)</p>
            <div className="inputBlock">
            <input type="text" name='lo' id='joinInput' onChange={(e) => setMyUser(e.target.value)} required/>
            <span className='inputHolder'>NAME</span>
            </div>
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