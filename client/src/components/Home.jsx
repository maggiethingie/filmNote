import React from 'react';
import Search from './Search.jsx';
import Entries from './Entries.jsx';

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
    const { user_id } = this.props;
    return (
      <div className="home">
        <div className="logo" onClick={this.props.logOut}>
          filmNote
        </div>
        { !hideSearch ?
          <Search user_id={ user_id } updateEntries={() => this.updateEntries()} /> : null
        }
        <Entries hideSearch={() => this.hideSearch()} showSearch={() => this.showSearch()} user_id={ user_id } updateEntries={updateEntries} />
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