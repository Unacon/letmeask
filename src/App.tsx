import React from 'react';
import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';
import { Room } from './pages/Room';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {AuthContext} from './components/AuthContext'

import './services/firebase'
import './assets/css/global.scss'
import { AdminRoom } from './pages/AdminRoom';
 
function App() {
  return (
    <BrowserRouter>
      <AuthContext>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/rooms/new" component={NewRoom}/>
          <Route path="/rooms/:id" component={Room} />
          <Route path="/admin/rooms/:id" component={AdminRoom} />
        </Switch>
      </AuthContext>
    </BrowserRouter>
  )
}

export default App;
