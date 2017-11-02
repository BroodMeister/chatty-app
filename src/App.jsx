import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {

  socket = new WebSocket("ws://localhost:3001", "protocolOne");

  constructor() {
    super();
    this.state = {
      currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      counter: 0
    };
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    this.socket.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      switch(msg.type) {
        case "incomingNotification":
          this.setState((prevState) => {
            prevState.messages.push(msg.data);
            this.setState({message: prevState.messages});
          });
          break;
        case "incomingMessage":
          this.setState((prevState) => {
            prevState.messages.push(msg.data);
            this.setState({messages: prevState.messages});
          });
          break;
        case "incomingCounter":
          console.log("change counter:", msg.data);
          this.setState({counter: msg.data});
          break;
        default:
          console.error("Unknown event type " + msg.type);
      }
    }
  }

  render() {
    console.log("<App/>");
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <span className=".navbar-counter">{this.state.counter} users online</span>
        </nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar name={this.state.currentUser.name} updateUser={this._updateUser} addMessage={this._addMessage}/>
      </div>
    );
  }

  _updateUser = (username) => {
    const newMsg = {
      type: "postNotification",
      data: {
        prevName: this.state.currentUser.name,
        newName: username
      }
    };
    this.socket.send(JSON.stringify(newMsg));
    this.setState({currentUser: {name: username}});
  }

  _addMessage = (username, content) => {
    const newMsg = {
      type: "postMessage",
      data: {
        username: username,
        content: content
      }
    };
    this.socket.send(JSON.stringify(newMsg));
  }
}
export default App;