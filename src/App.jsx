import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {

  socket = new WebSocket("ws://localhost:3001", "protocolOne");

  constructor() {
    super();
    this.state = {
      currentUser: { name: "Anonymous" },
      messages: [],
      counter: 0
    };
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    // Register at the server to receive a colour.
    this.socket.onopen = (e) => {
      this.socket.send(JSON.stringify({ type: "postRegister" }));
    }

    this.socket.onmessage = (event) => {
      console.log("Received:", event.data);
      const msg = JSON.parse(event.data);
      switch(msg.type) {
      // When a notification or message is received from the server, they are pushed into the client.
        case "incomingNotification":
          this.setState((prevState) => {
            prevState.messages.push(msg.data);
            this.setState({messages: prevState.messages});
          });
          break;
        // Updates the state counter when the online user count is received.
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

  // This function is fired up by the Chatbar, which sends the current username to the server and updates the currentUser state.
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

  // This function is also fired up by Chatbar and sends the new message to the server.
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