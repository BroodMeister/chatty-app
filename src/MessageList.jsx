import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("<MessageList/>", this.props.messages);
    return (
      <div className="messages" id="message-list">
        {this.props.messages.map((msg) => {
          if (msg.username) {
            return (
              <Message key={msg.id.toString()} color={msg.color} username={msg.username} content={msg.content}/>
            );
          } else {
            return (
              <div className="message system">User {msg.prevName} changed their to {msg.newName}</div>
            );
          }
        })}
      </div>
    );
  }
}
export default MessageList;