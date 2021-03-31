import React from 'react';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div className="landing-page">
        <div className="logo">
          filmNote
        </div>
        <button className="login-button" onClick={this.props.enterClick}>
          log in
        </button>
        <div className="message">
          <h1>A journaling application for cinephiles</h1>
        </div>
      </div>
    )
  }
}

export default Home;