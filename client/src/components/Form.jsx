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
    .then(() => {
      console.log('successfully saved entry!');
    })
    .catch((err) => {
      console.log(err);
    });
  }

  onIdeaClick() {
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
    const imgURL = filmObj.Poster === 'N/A' ? '' : filmObj.Poster;
    return (
      <div className="form">
        <div className="heading">
          <img className="poster" src={imgURL} />
          <div className="heading-text">{filmObj.Title} ({filmObj.Year})</div>
        </div>
        <form>
          { showIdeas ? <Ideas hideIdeas={ this.hideIdeas } /> : null }
          <img onClick={ () => this.onIdeaClick() } className="idea-icon" src="icons/idea.svg" />
          <textarea value={ entry } onChange={ () => this.onEntryChange(event) } className="textarea" rows="50" cols="40" />
          <button onClick={ () => this.onEntrySubmit() }>Save and Exit</button>
        </form>
      </div>
    );
  }
}

export default Form;