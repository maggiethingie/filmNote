import React from 'react';
import Ideas from './Ideas.jsx';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showIdeas: false
    }
    this.escFunction = this.escFunction.bind(this);
    this.hideIdeas = this.hideIdeas.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.escFunction, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.escFunction, false);
  }

  onFormSubmit() {
    // post to database
    console.log('saving to database...');
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
    const { showIdeas } = this.state;
    return (
      <div className="form">
        <h2>{filmObj.Title} ({filmObj.Year})</h2>
        <form>
          { showIdeas ? <Ideas hideIdeas={this.hideIdeas} /> : null }
          <img onClick={() => this.onIdeaClick()} className="idea-icon" src="icons/idea.svg" />
          <textarea className="textarea" rows="50" cols="40" />
          <button onClick={this.onFormSubmit}>Save and Exit</button>
        </form>
      </div>
    );
  }
}

export default Form;