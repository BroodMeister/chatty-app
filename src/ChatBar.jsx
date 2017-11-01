import React, {Component} from 'react';

const defaultState = {
  content: ''
}

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
  }

  render() {
    console.log("<ChatBar/>");
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder={this.props.name} />
        <input className="chatbar-message" value={this.state.content}
          placeholder="Type a message and hit ENTER"
          onChange={this._onContentChange} onKeyPress={this._onEnter}/>
      </footer>
    );
  }

  _onContentChange = (e) => {
    this.setState({content: e.target.value});
  }

  _onEnter = (e) => {
    if (e.key === 'Enter') {
      this.props.addMessage(this.props.name, e.target.value);
      this.setState(defaultState);
    }
  }
}
export default ChatBar;