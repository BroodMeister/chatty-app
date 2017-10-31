import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //
    }
  }

  render() {
    console.log("<MessageList/>", this.props.messages);
    return (
      <div className="messages" id="message-list">
        {this.props.messages.map((msg) => {
          return (
            <Message key={msg.id.toString()} username={msg.username} content={msg.content}/>
            );
        })}
      </div>
    );
  }
}
export default MessageList;