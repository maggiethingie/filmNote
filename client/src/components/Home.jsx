import React from 'react';
import Search from './Search.jsx';
import Entries from './Entries.jsx';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hideSearch: false
    };
    this.hideSearch = this.hideSearch.bind(this);
  }

  hideSearch() {
    this.setState({ hideSearch: true });
  }


  render() {
    const { hideSearch } = this.state;
    const { user_id } = this.props;
    return (
      <div className="home">
        <div className="logo" onClick={this.props.logOut}>
          filmNote
        </div>
        { !hideSearch ?
          <Search user_id={ user_id } /> : null
        }
        <Entries hideSearch={ this.hideSearch } user_id={ user_id } />
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