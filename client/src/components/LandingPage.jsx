import React from 'react';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div>
        <button className="open-button" onClick={this.props.enterClick}>
          <h1>Login to your filmNote journal</h1>
        </button>
      </div>
    )
  }
}

export default Home;