import React, {Component} from 'react';
import './CardBoard.css'
import Card from '../Card/Card'
import { icons } from '../Card/Icons';

const shuffle = (array)  => {
  array.sort(()=> Math.random() - 0.5);
}

class CardBoard extends Component {
  constructor() {
    super();

    this.pair = [];

    this.state = {};
  }

  handleCardClick() {
    console.log('foo');
  }

  render() {
    if (Array.isArray(icons)) {
      shuffle(icons);
    }
    const _this = this;

    return (
      <section className=" br3 color-grad mw5 mw7-ns center mt5 shadow-5 pa3 ph5-ns">
        <h1 className="mt0 white f1">Card Game</h1>
        <p className="lh-copy center measure white">
          Click on a card to start
        </p>
        <div className="cardList">
          {
            icons.map(function (icon, index){
              return <Card key={index} icon={icon.icon} onClick={_this.handleCardClick}/>
            })
          }
        </div>
      </section>
    );
  }
}

// const CardBoard = () => {
  
// }

export default CardBoard;