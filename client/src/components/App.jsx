import React from 'react';
import axios from 'axios';
import styles from './style/app.css';
import LandingPage from './LandingPage.jsx';
import Home from './Home.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //loggedIn: false
      loggedIn: true,
      user_id: 1
    };
  }

  enterClick() {
    this.setState({ loggedIn: true });
  }

  render() {
    const { loggedIn } = this.state;
    return (
      <div className={styles.app}>
        { loggedIn ?
          <Home /> :
          <LandingPage enterClick={() => this.enterClick()} />
        }
      </div>
    );
  }
}

export default App;
