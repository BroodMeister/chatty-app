import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          id: 1,
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          id: 2,
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ],
      socket: new WebSocket("ws://localhost:3001", "protocolOne")
    };
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    this.state.socket.onopen = (e) => {
      this.state.socket.send("test");
    }
  }

  _createNewMessageId() {
    // returns the
    const idArr = [];
    this.state.messages.forEach((msg) => {
      idArr.push(msg.id);
    });
    return Math.max(...idArr) + 1;
  }

  onCreate = (username, content) => {
    const newMsg = {
      id: this._createNewMessageId(),
      username: username,
      content: content
    };
    this.setState({messages: this.state.messages.concat(newMsg)});
  }

  render() {
    console.log("<App/>");
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar name={this.state.currentUser.name} onCreate={this.onCreate}/>
      </div>
    );
  }
}
export default App;
// <div className="message system">
//   Anonymous1 changed their name to nomnom.
// </div>