import React from 'react';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showIdeas: false
    }
  }

  onFormSubmit() {
    // post to database
    console.log('saving to database...');
  }

  onIdeaClick() {
    this.setState({ showIdeas: true });
  }

  render() {
    const { filmObj } = this.props;
    return (
      <div className="form">
        <h2>{filmObj.Title} ({filmObj.Year})</h2>
        <form>
          <img onClick={this.onIdeaClick} className="idea-icon" src="icons/idea.svg" />
          <textarea className="textarea" rows="50" cols="40" />
          <button onClick={this.onFormSubmit}>Save and Exit</button>
        </form>
      </div>
    );
  }
}

export default Form;