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
        <button onClick={this.props.enterClick}>
          <h1>Open your filmNote journal</h1>
        </button>
      </div>
    )
  }
}

export default Home;