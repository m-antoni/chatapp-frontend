import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ChatRoom from "./components/ChatRoom";
import Home from "./components/Home";
import io from "socket.io-client";

const socket = io(process.env.REACT_APP_API_URL);

function App() {
    return (
        <Router>
          <Switch>
              <Route path="/" exact>
                  <Home socket={socket}/>
              </Route>  
              <Route path="/chat/:roomname/:username" component={Main}/>
          </Switch>
        </Router>
    );
}


function Main(props){
  return (
    <ChatRoom 
      username={props.match.params.username} 
      roomname={props.match.params.roomname} 
      socket={socket}
    />
  )
}



export default App;
