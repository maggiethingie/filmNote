import React from 'react';
import axios from 'axios';
import Form from './Form.jsx';

class Entries extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: [],
      selectedEntry: null
    };
  }

  componentDidMount() {
    this.getEntries();
  }

  getEntries() {
    axios.get('/entries')
      .then((resp) => {
        this.setState({
          entries: resp.data
        });
      });
  }

  onEntryClick(selectedEntry) {
    this.setState({ selectedEntry });
    this.props.hideSearch();
  }

  render() {
    const { entries, selectedEntry } = this.state;
    const { user_id } = this.props;
    console.log(entries);
    return (
      <div>
        { selectedEntry !== null ?
          <Form filmObj={selectedEntry} user_id={user_id} entry={selectedEntry.entry}/> :
          <div>
            <h2>Past Entries</h2>
            {entries.map((entry, index) => <div key={index} className="past-entry" onClick={() => this.onEntryClick(entry)}>{entry.Title}</div>)}
          </div>
        }
      </div>
    );
  }
}

export default Entries;