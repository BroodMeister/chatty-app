import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    console.log("<MessageList/>");
    return (
      <div className="messages" id="message-list">
        <Message/>
      </div>
    );
  }
}
export default MessageList;