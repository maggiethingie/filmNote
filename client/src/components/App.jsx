import React from 'react';
import axios from 'axios';
import styles from './style/app.css';
import LandingPage from './LandingPage.jsx';
import Home from './Home.jsx';
import GoogleAuth from './GoogleAuth.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        id: null,
        email: null,
        name: null,
        pic: null
      },
      isSignedIn: null
    };
    this.setUser = this.setUser.bind(this);
  }

  setUser(id, email, name, pic, isSignedIn) {
    this.setState({ user: {id, email, name, pic}, isSignedIn });
  }

  render() {
    const { isSignedIn, user } = this.state;
    console.log(user);
    return (
      <div className={styles.app}>
        <GoogleAuth setUser={this.setUser} isSignedIn={isSignedIn} />
        { isSignedIn ?
          <Home user={user} /> :
          <LandingPage />
        }
      </div>
    );
  }
}

export default App;
