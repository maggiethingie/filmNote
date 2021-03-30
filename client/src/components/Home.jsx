import React from 'react';
import Search from './Search.jsx';
import Entries from './Entries.jsx';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }


  render() {
    return (
      <div>
        <Search />
        <Entries />
      </div>
    )
  }
}

export default Home;