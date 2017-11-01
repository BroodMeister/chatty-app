import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {

  socket = new WebSocket("ws://localhost:3001", "protocolOne");

  constructor() {
    super();
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    };
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    this.socket.onmessage = (event) => {
      const newMsg = JSON.parse(event.data);
      this.setState((prevState) => {
        prevState.messages.push(newMsg);
        this.setState({messages: prevState.messages});
      });
    }
  }

  render() {
    console.log("<App/>");
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar name={this.state.currentUser.name} updateUser={this._updateUser} addMessage={this._addMessage}/>
      </div>
    );
  }

  _updateUser = (username) => {
    this.setState({currentUser: {name: username}});
  }

  _addMessage = (username, content) => {
    const newMsg = {
      username: username,
      content: content
    };
    this.socket.send(JSON.stringify(newMsg));
  }
}
export default App;