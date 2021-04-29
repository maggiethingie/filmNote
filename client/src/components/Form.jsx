import React from 'react';
import Ideas from './Ideas.jsx';
import axios from 'axios';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showIdeas: false,
      entry: ''
    }
    this.escFunction = this.escFunction.bind(this);
    this.hideIdeas = this.hideIdeas.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.escFunction, false);
    this.setState({ entry: this.props.filmObj.entry });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.filmObj !== this.props.filmObj) {
      this.setState({ entry: this.props.filmObj.entry });
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.escFunction, false);
  }

  onEntryChange(event) {
    this.setState({ entry: event.target.value });
  }

  onEntrySubmit(event) {
    event.preventDefault();
    const { entry } = this.state;
    const { filmObj, user_id } = this.props;
    const { Title, Year, imdbID, Type, Poster } = filmObj;
    const entry_id = user_id + '-' + imdbID;
    const data = {
      entry_id,
      user_id,
      entry,
      Title,
      Year,
      imdbID,
      Type,
      Poster
    }
    axios.put('/entries', data)
    .then(() => this.props.closeForm())
    .catch((err) => {
      console.log(err);
    });
  }

  onDelete(event) {
    event.preventDefault();
    const { filmObj } = this.props;
    axios.delete(`/entries/${filmObj.entry_id}`)
    .then(() => this.props.closeForm())
    .catch((err) => {
      console.log(err);
    });
  }

  onIdeaClick() {
    console.log('show ideas!');
    this.setState({ showIdeas: true });
  }

  escFunction(event) {
    if (event.keyCode === 27) {
      this.hideIdeas();
    }
  }

  hideIdeas() {
    if (this.state.showIdeas) {
      this.setState({ showIdeas: false });
    }
  }

  render() {
    const { filmObj } = this.props;
    const { showIdeas, entry } = this.state;
    filmObj.Poster = filmObj.Poster === 'N/A' ? 'images/reel.jpeg' : filmObj.Poster;
    return (
      <div className="form">
        <div className="heading">
          <img className="poster" src={filmObj.Poster} />
          <div className="heading-text">{filmObj.Title} ({filmObj.Year})</div>
        </div>
        <form>
          <textarea value={ entry } onChange={() => this.onEntryChange(event)} className="textarea" rows="30" cols="20" />
          { showIdeas ? <Ideas hideIdeas={ this.hideIdeas } /> : null }
            <img onClick={ () => this.onIdeaClick() } className="idea-icon" src="icons/idea.svg" />

          <div className="form-buttons">
            <button onClick={ (event) => this.onEntrySubmit(event) }>Save and Exit</button>
            <button onClick={ (event) => this.onDelete(event) }>Delete entry</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Form;