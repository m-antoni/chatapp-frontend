import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import ChatRoom from "./components/ChatRoom";
import Home from "./components/Home";
import io from "socket.io-client";

const socket = io(process.env.REACT_APP_API_URL);

function App(){
    return (
        <Router>
          <Switch>
              <Route 
                path="/"
                render={() => <Home socket={socket}/>}
                exact 
              />
              <Route 
                path="/:roomname/:username" 
                socket={socket} 
                render={() => <ChatRoom socket={socket}/>}
                exact
              />
          </Switch>
        </Router>
    );
}


export default App;
