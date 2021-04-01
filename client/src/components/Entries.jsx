import React from 'react';
import axios from 'axios';
import Form from './Form.jsx';

class Entries extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: [],
      selectedEntry: null,
      viewEntries: false
    };
  }

  componentDidMount() {
    this.getEntries();
  }

  componentDidUpdate() {
    if (this.props.updateEntries) {
      this.getEntries();
    }
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

  unselect() {
    this.setState({ selectedEntry: null });
    this.getEntries();
    this.props.showSearch();
  }

  viewEntries() {
    const currentState = !this.state.viewEntries;
    this.setState({ viewEntries: currentState });
  }

  render() {
    const { entries, selectedEntry, viewEntries } = this.state;
    const { user_id } = this.props;
    return (
      <div>
        { selectedEntry ?
          <Form filmObj={selectedEntry} user_id={user_id} closeForm={() => this.unselect()} /> : null
        }
          <div className="entries-section">
            <div className="past-entries-header" onClick={() => this.viewEntries()}> Your Entries</div>
            {
              viewEntries ?
              <div className="scroll-container">
                <div className="past-entries-body">
                  {entries.map((entry, index) => (
                    <div key={index} className="past-entry" onClick={() => this.onEntryClick(entry)}>
                      <img src={entry.Poster} />
                      <div className="entry-title">{entry.Title} ({entry.Year})</div>
                    </div>
                  ))}
                </div>
              </div> : null
            }
          </div>
      </div>
    );
  }
}

export default Entries;