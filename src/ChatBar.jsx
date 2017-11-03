import React, {Component} from 'react';


class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      content: ""
    }
  }

  render() {
    console.log("<ChatBar/>");
    return (
      <footer className="chatbar">
        <input className="chatbar-username" value={this.state.username}
          placeholder={this.props.name}
          onChange={this._onUserChange} onKeyPress={this._onUserEnter}/>
        <input className="chatbar-message" value={this.state.content}
          placeholder="Type a message and hit ENTER"
          onChange={this._onContentChange} onKeyPress={this._onContentEnter}/>
      </footer>
    );
  }

  // The state content updates when the input content changes.
  _onContentChange = (e) => {
    this.setState({content: e.target.value});
  }

  // When the user hits enter, the message content is sent to the app and the input field is cleared.
  _onContentEnter = (e) => {
    if (e.key === 'Enter') {
      this.props.addMessage(this.props.name, e.target.value);
      this.setState({content: ""});
    }
  }

  // When the username input changes, the state username is updated as well.
  _onUserChange = (e) => {
    console.log("user change");
    this.setState({username: e.target.value});
  }

  // When the user hits enter, the username is sent to the app and the input field is cleared.
  _onUserEnter = (e) => {
    if (e.key === 'Enter') {
      console.log("user enter")
      this.props.updateUser(e.target.value);
      this.setState({username: ""});
    }
  }
}
export default ChatBar;