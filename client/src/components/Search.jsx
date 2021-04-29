import React from 'react';
import axios from 'axios';
import Form from './Form.jsx';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filmObj: {},
      selectionMade: false,
      value: '',
      results: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { value } = event.target;
    this.setState({ value });
    this.debounce(this.getResults(value));
  }

  handleSubmit(event, filmObj) {
    event.preventDefault();
    this.setState({ selectionMade: true });
    this.setState({ filmObj });
    this.setState({ results: [] });
  }

  debounce(func, delay = 1000) {
    let timeoutId;
    return (...args) => {
      if(timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func.apply(null, args);
      }, delay)
    };
  }

  getResults(searchTerm) {
    axios.get('http://www.omdbapi.com/', {
      params: {
        apikey: '3cef1b28',
        s: searchTerm
      }
    })
    .then((resp) => this.setState({ results: resp.data.Search}))
    .catch((err) => console.log(err));
  }

  unselect() {
    this.setState({ selectionMade: false });
    this.props.updateEntries();
  }

  render() {
    const { user_id } = this.props;
    const { selectionMade, filmObj } = this.state;
    filmObj.entry = '';
    const noImage = 'images/reel.jpeg';
    let { results } = this.state;
    if (results === undefined) results = [];
    return (
      <div>
        {selectionMade ?
          <Form filmObj={filmObj} user_id={user_id} closeForm={() => this.unselect()} /> :
          <div className="search-section">
            <div className="search-text">Search for a title to create a new journal entry</div>
            <input className="search-bar" onChange={this.handleChange} type="text" />
            <div className="dropdown-scroll-container">
              <div className="dropdown-content">
                {results.map((result, index) => {
                  const imgURL = result.Poster === 'N/A' ? noImage : result.Poster;
                  return (
                  <a onClick={(e) => this.handleSubmit(e, result)} key={index} className="dropdown-item">
                    <img src={imgURL} />
                    {result.Title} ({result.Year})
                  </a>
                )})}
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default Search;