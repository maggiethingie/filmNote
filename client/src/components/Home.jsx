import React from 'react';
import Search from './Search.jsx';
import Entries from './Entries.jsx';
import styles from './style/app.css';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hideSearch: false,
      updateEntries: false
    };
    this.hideSearch = this.hideSearch.bind(this);
  }

  hideSearch() {
    this.setState({ hideSearch: true });
  }

  showSearch() {
    this.setState({ hideSearch: false });
  }

  updateEntries() {
    this.setState({ updateEntries: true });
  }

  render() {
    const { hideSearch, updateEntries } = this.state;
    const { user } = this.props;
    return (
      <div className="home">
        <div style={{top: '1%', left: '1%', position: 'fixed', display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
          <div style={{fontSize: '14px', padding: '5px'}}>Hey, {user.name.split(' ')[0]}! </div>
          <img style={{height: '80px', width: '80px'}} src={user.pic}/>
          <Entries hideSearch={() => this.hideSearch()} showSearch={() => this.showSearch()} user_id={ user.id } updateEntries={updateEntries} />
        </div>
        {/* <div className="logo" onClick={this.props.logOut}>
          filmNote
        </div> */}
        { !hideSearch ?
          <Search user_id={ user.id } updateEntries={() => this.updateEntries()} /> : null
        }
        <footer>
          <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
          <a href="http://www.omdbapi.com/"> /  This application uses the OMDb API http://www.omdbapi.com/</a>
          </div>
        </footer>
      </div>
    )
  }
}

export default Home;