import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import ChatRoom from "./components/ChatRoom";
import Home from "./components/Home";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import { getUserLocalStorage } from "./utils/helpers"

function App(){

  const socketCon = io(process.env.REACT_APP_API_URL);
  
  useEffect(() => {
    socketCon.connect();
  },[])

    return (
        <Router>
          <Switch>
              <Route 
                path="/"
                render={() => <Home socket={socketCon}/>}
                exact 
              />
              <Route 
                path="/:roomname/:username" 
                socket={socketCon} 
                render={() => <ChatRoom socket={socketCon}/>}
                exact
              />
          </Switch>
        </Router>
    );
}


export default App;
