import React from 'react';

class Entries extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: [],
      selectedEntry: null
    };
  }

  componentDidMount() {
    // fetch entries from database
  }

  onEntryClick(selectedEntry) {
    this.setState({ selectedEntry });
  }

  render() {
    const { entries, selectedEntry } = this.state;
    return (
      <div>
        { selectedEntry ?
          <Entry selectedEntry={selectedEntry} /> :
          entries.map(entry => <div onClick={() => this.onEntryClick(entry)}>{entry.title}</div>)
        }
      </div>
    );
  }
}

export default Entries;