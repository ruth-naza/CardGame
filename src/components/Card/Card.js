import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Card.css";

class Card extends Component {
  DEFAULT_STATE = {
    cardUp: false,
    isMatched: false
  };

  constructor() {
    super();
    this.state = this.DEFAULT_STATE;
    this.handleClick = this.handleClick.bind(this);
    this.reset = this.reset.bind(this);
  }

  componentDidMount() {
    // Listen for 'OnCardboardReset' event (dispatched by CardBoard);
    window.addEventListener('OnCardboardReset', this.reset);
  }

  componentWillUnmount() {
    // Unregister the 'OnCardboardReset' event listener
    window.removeEventListener('OnCardboardReset', this.reset);
  }

  handleClick() {
    if (this.state.isMatched) {
    
      return;
    }

    if (!this.props.cardBoard.canUserClick()) {

      return;
    }

    if (this.state.cardUp) {
      this.setState({ cardUp: false });
    } else {
      this.setState({ cardUp: true });
    }

    this.props.cardBoard.cardClicked(this);
  }

  setMatched(isMatched) {
    this.setState({
      isMatched: isMatched
    });
  }

  reset() {
    this.setState(this.DEFAULT_STATE);
  }

  render() {
    const iconOptions = {
      icon: this.props.icon,
      className: "center f1 orange tc"
    };

    const cardOptions = {
      onClick: this.handleClick
    };

    if (this.state.cardUp) {
      iconOptions["className"] = "center f1 orange tc";
    } else {
      iconOptions["className"] = "center f1 orange tc hidden";
    }

    return (
      <div
        className={`icon-center pointer mw4 bg-white br3 pa1 pa4-ns ma2 dib shadow-5 card ${
          this.state.cardUp ? "" : "state-hidden"
        }`}
        {...cardOptions}
      >
        <FontAwesomeIcon {...iconOptions} />
      </div>
    );
  }
}

export default Card;
