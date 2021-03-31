import React from 'react';
import axios from 'axios';
import styles from './style/app.css';
import LandingPage from './LandingPage.jsx';
import Home from './Home.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      // loggedIn: true,
      user_id: 1
    };
  }

  enterClick() {
    this.setState({ loggedIn: true });
  }

  render() {
    const { loggedIn, user_id } = this.state;
    return (
      <div className={styles.app}>
        { loggedIn ?
          <Home user_id={ user_id }/> :
          <LandingPage enterClick={() => this.enterClick()} />
        }
        {/* <footer>
          <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
          </div>
        </footer> */}
      </div>
    );
  }
}

export default App;
