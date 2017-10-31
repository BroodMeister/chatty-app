import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // content: this.props.content
    };
  }

  render() {
    console.log("<ChatBar/>");
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder={this.props.name} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={(e) => { this.props.onEnter(e, this.props.name) }}/>
      </footer>
    );
  }
}
export default ChatBar;