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

  _onContentChange = (e) => {
    this.setState({content: e.target.value});
  }

  _onContentEnter = (e) => {
    if (e.key === 'Enter') {
      this.props.addMessage(this.props.name, e.target.value);
      this.setState({content: ""});
    }
  }

  _onUserChange = (e) => {
    console.log("user change");
    this.setState({username: e.target.value});
  }

  _onUserEnter = (e) => {
    if (e.key === 'Enter') {
      console.log("user enter")
      this.props.updateUser(e.target.value);
      this.setState({username: ""});
    }
  }
}
export default ChatBar;