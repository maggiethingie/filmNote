import React from 'react';

class Ideas extends React.Component {
  constructor(props) {
    super(props);
  }

  hideIdeas() {
    this.props.hideIdeas();
  }

  render() {
    const ideas = [
      'Who did you watch this movie with?',
      'What made you decide to watch it?',
      'Was it what you expected?',
      'Who were some of your favorite characters and why?',
      'Did any of the situations or characters remind you of your own life?',
      'Was there any aspect of the plot or character actions that were thought-provoking?',
      'Which of your friends or family do you think would find this movie interesting or enjoyable?',
      'How did the visual aesthetic of the movie relate to its story?'
    ]
    return (
      <div className="ideas">
        <h3>Here are some ideas to get you started...</h3>
        <img onClick={() => this.hideIdeas()} className="close-icon" src="icons/close.svg" />
        <ul>
          {ideas.map((idea, index) => <li key={index} >{idea}</li>)}
        </ul>
      </div>
    );
  }
}

export default Ideas;