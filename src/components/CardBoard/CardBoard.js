import React, { Component } from "react";
import "./CardBoard.css";
import Card from "../Card/Card";
import { icons } from "../Card/Icons";

class CardBoard extends Component {
  state = {
    userCanClick: true,
    pair: [],
    attempts: 0,
    numMatches: 0
  };

  MAX_MATCHES = 8;

  constructor() {
    super();

    if (Array.isArray(icons)) {
      this.shuffle(icons);
    }
  }

  shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }

  canUserClick() {
    return this.state.userCanClick;
  }

  getPair() {
    return this.state.pair;
  }

  cardClicked(card) {
    let pair = this.state.pair;
    if (pair.length < 2) {
      const cardIndex = pair.indexOf(card);
      if (cardIndex < 0) {
        // Pair does not contain card. Add card to pair.
        pair.push(card);
      } else {
        // Pair already contains card. Remove card from pair.
        pair.forEach((_card, index) => {
          if (_card === card) {
            pair.splice(index, 1);
          }
        });
      }

      if (pair.length === 2) {
        this.setState({
          userCanClick: false
        });

        const card1 = pair[0];
        const card2 = pair[1];

        // Increment the number of attempts
        this.setState({
          attempts: this.state.attempts + 1
        });

        setTimeout(() => {
          let cardIcon1 = card1.props.icon;
          let cardIcon2 = card2.props.icon;

          if (cardIcon1["iconName"] === cardIcon2["iconName"]) {
            // A match has been found
            card1.setMatched(true);
            card2.setMatched(true);

            this.setState((state)=>{
              state.numMatches = this.state.numMatches + 1

              if (state.numMatches === this.MAX_MATCHES) {
                console.log("You have won the game");
                alert(`You have won the game in ${this.state.attempts} attempts! Congratulations!`);
              }
            });
          } else {
            card1.reset();
            card2.reset();
          }

          this.setState({
            pair: [],
            userCanClick: true
          });
        }, 1000);
      }
    }
  }

  render() {

    return (
      <section className=" br3 color-grad mw5 mw7-ns center mt5 shadow-5 pa3 ph5-ns">
        <h1 className="mt0 white f1">Card Game</h1>
      <p className="lh-copy center measure white">Click on a card to start {this.state.attempts}</p>
        <div className="cardList">
          {icons.map((icon, index)=> {
            return <Card key={index} icon={icon.icon} cardBoard={this} />;
          })}
        </div>
      </section>
    );
  }
}

export default CardBoard;
