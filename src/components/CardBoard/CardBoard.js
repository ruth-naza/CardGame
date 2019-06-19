import React, { Component } from "react";
import "./CardBoard.css";
import Card from "../Card/Card";
import { icons } from "../Card/Icons";
import Modal from 'react-responsive-modal';

class CardBoard extends Component {
  DEFAULT_STATE = {
    userCanClick: true,
    pair: [],
    attempts: 0,
    numMatches: 0,
    open: false
  };

  MAX_MATCHES = 8;

  constructor() {
    super();
    this.state = this.DEFAULT_STATE;

    if (Array.isArray(icons)) {
      this.shuffle(icons);
    }

    this.reset = this.reset.bind(this);
  }

  shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }

  canUserClick() {
    return this.state.userCanClick;
  }

  reset() {
    window.dispatchEvent(new Event('OnCardboardReset'));
    this.setState(this.DEFAULT_STATE);
  }

  onOpenModal() {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

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

            this.setState(state => {
              state.numMatches = this.state.numMatches + 1;

              if (state.numMatches === this.MAX_MATCHES) {
                this.onOpenModal();
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
    const { open } = this.state;
    return (
      <section className=" br3 color-grad mw5 mw7-ns center mt5 shadow-5 pa3 ph5-ns">
        <h1 className="f1 white ttu tracked">Card Game</h1>
        <div className="cf dib center item-center">
          <dl className="fl fn-l w-50 dib-l w-auto-l lh-title mr5-l white">
            <dd className="f6 fw4 ml0">No of Attempts</dd>
            <dd className="f3 fw6 ml0">{this.state.attempts}</dd>
          </dl>
          <dl className="fl fn-l white w-50 dib-l w-auto-l lh-title mr5-l">
            <dd className="f6 fw4 ml0">New Game</dd>
            <button className="f4 fw6 ml0 grow pointer br-pill white bg-dark-gray"onClick={this.reset}>Reset</button>
          </dl>
        </div>
        <div className="cardList">
          {
            icons.map((icon, index) => {
              return <Card key={index} icon={icon.icon} cardBoard={this} />
            })
          }
          <Modal open={ open } onClose={this.onCloseModal} center>
            <h2>You have won the game in {this.state.attempts} attempts! Congratulations!</h2>
          </Modal>
        </div>
      </section>
    );
  }
}

export default CardBoard;
