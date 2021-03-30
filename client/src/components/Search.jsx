import React from 'react';
import axios from 'axios';
import Form from './Form.jsx';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filmObj: {},
      selectionMade: false,
      value: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { value } = event.target;
    this.setState({ value });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.value);
    this.setState({ selectionMade: true });
    const searchTerm = this.state.value;
    // load film info into filmObj
    axios.get('http://www.omdbapi.com/', {
      params: {
        apikey: '3cef1b28',
        s: searchTerm
      }
    })
    .then((resp) => console.log(resp))
    .catch((err) => console.log(err));
  }

  render() {
    const { selectionMade, filmObj } = this.state;
    return (
      <div>
        <h2>Create a new entry</h2>
        <input onChange={this.handleChange} type="text" />
        <button onClick={this.handleSubmit}>Submit</button>
        {selectionMade ?
          <Form filmObj={filmObj} /> :
          null
        }
      </div>
    );
  }
}

export default Search;