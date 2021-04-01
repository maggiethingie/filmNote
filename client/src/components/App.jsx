import React from 'react';
import axios from 'axios';
import styles from './style/app.css';
import LandingPage from './LandingPage.jsx';
import Home from './Home.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //loggedIn: false,
      loggedIn: true,
      user_id: 1
    };
  }

  logIn() {
    this.setState({ loggedIn: true });
  }

  logOut() {
    this.setState({ loggedIn: false });
  }

  render() {
    const { loggedIn, user_id } = this.state;
    console.log(loggedIn);
    return (
      <div className={styles.app}>
        { loggedIn ?
          <Home user_id={ user_id } logOut={() => this.logOut()} /> :
          <LandingPage enterClick={() => this.logIn()} />
        }
      </div>
    );
  }
}

export default App;
