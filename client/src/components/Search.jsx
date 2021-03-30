import React from 'react';
import axios from 'axios';
import Form from './Form.jsx';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filmObj: {
        Poster: "https://m.media-amazon.com/images/M/MV5BMjAxYmJhMTMtNmZlZi00ZWJlLTlmMjctOTg5ZTg4MzZmOWM2XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
        Title: "Wild at Heart",
        Type: "movie",
        Year: "1990",
        imdbID: "tt0100935"
      },
      selectionMade: true,
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
    console.log('submit!');
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

  render() {
    const { selectionMade, filmObj } = this.state;
    let { results } = this.state;
    if (results === undefined) results = [];
    console.log(results);
    return (
      <div>
        {selectionMade ?
          <Form filmObj={filmObj} /> :
          <div>
            <h2>Create a new entry</h2>
            <input onChange={this.handleChange} type="text" />
            <div className="dropdown-menu">
              <div className="dropdown-content results">
                {results.map(result => {
                  const imgURL = result.Poster === 'N/A' ? '' : result.Poster;
                  return (
                  <a onClick={(e) => this.handleSubmit(e, result)} key={result.imdbID} className="dropdown-item">
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