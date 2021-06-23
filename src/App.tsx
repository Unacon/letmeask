import React from 'react';
import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';
import { BrowserRouter, Route } from 'react-router-dom';
import {AuthContext} from './components/AuthContext'

import './services/firebase'
import './assets/css/global.scss'
 
function App() {
  return (
    <BrowserRouter>
      <AuthContext>
        <Route path="/" exact component={Home}/>
        <Route path="/rooms/new" exact component={NewRoom}/>
      </AuthContext>
    </BrowserRouter>
  )
}

export default App;
