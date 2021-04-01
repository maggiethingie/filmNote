import React from 'react';
import Ideas from './Ideas.jsx';
import axios from 'axios';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showIdeas: false,
      entry: this.props.entry
    }
    this.escFunction = this.escFunction.bind(this);
    this.hideIdeas = this.hideIdeas.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.escFunction, false);
    const { entry } = this.props;
    if (entry) {
      this.setState({ entry });
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.escFunction, false);
  }

  onEntryChange(event) {
    this.setState({ entry: event.target.value });
  }

  onEntrySubmit() {
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
    .then(() => {})
    .catch((err) => {
      console.log(err);
    });
  }

  onDelete() {
    const { filmObj } = this.props;
    axios.delete(`/entries/${filmObj.entry_id}`)
    .then(() => {})
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
    filmObj.Poster = filmObj.Poster === 'N/A' ? 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fp.pngarrow.com%2Fb%2F3065%2F30655323.png&f=1&nofb=1' : filmObj.Poster;
    return (
      <div className="form">
        <div className="heading">
          <img className="poster" src={filmObj.Poster} />
          <div className="heading-text">{filmObj.Title} ({filmObj.Year})</div>
        </div>
        <form>
          <textarea value={ entry } onChange={ () => this.onEntryChange(event) } className="textarea" rows="30" cols="20" />
          { showIdeas ? <Ideas hideIdeas={ this.hideIdeas } /> :
            <img onClick={ () => this.onIdeaClick() } className="idea-icon" src="icons/idea.svg" />
          }
          <div className="form-buttons">
            <button onClick={ () => this.onEntrySubmit() }>Save and Exit</button>
            <button onClick={ () => this.onDelete() }>Delete entry</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Form;