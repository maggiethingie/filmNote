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
        <div className="logo">
          filmNote
        </div>
        { !hideSearch ?
          <Search user_id={ user_id } /> : null
        }
        <Entries hideSearch={ this.hideSearch } user_id={ user_id } />
      </div>
    )
  }
}

export default Home;