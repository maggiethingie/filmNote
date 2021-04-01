import React from 'react';
import axios from 'axios';
import Form from './Form.jsx';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // filmObj: {
      //   Poster: "https://m.media-amazon.com/images/M/MV5BMjAxYmJhMTMtNmZlZi00ZWJlLTlmMjctOTg5ZTg4MzZmOWM2XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
      //   Title: "Wild at Heart",
      //   Type: "movie",
      //   Year: "1990",
      //   imdbID: "tt0100935"
      // },
      // selectionMade: true,
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
    const { user_id } = this.props;
    const { selectionMade, filmObj } = this.state;
    const noImage = 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fp.pngarrow.com%2Fb%2F3065%2F30655323.png&f=1&nofb=1';
    let { results } = this.state;
    if (results === undefined) results = [];
    return (
      <div>
        {selectionMade ?
          <Form filmObj={filmObj} user_id={user_id} entry={''}/> :
          <div className="search-section">
            <div className="search-text">Search for a title to create a new journal entry</div>
            <input className="search-bar" onChange={this.handleChange} type="text" />
            <div className="dropdown-menu">
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