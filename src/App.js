import React from 'react'
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';

const App = () => {

  return (
    <Router>
      <Routes>
        <Route exact path='/' element={
          <Join />
        }></Route>

        <Route exact path='/chat' element={
          <Chat />
        }></Route>

      </Routes>
    </Router>
  )
}

export default App;