import React from 'react';
import './CardBoard.css'
import Card from '../Card/Card'
import { icons } from '../Card/Icons';

const CardBoard = () => {
  return (
    <section className=" br3 color-grad mw5 mw7-ns center mt5 shadow-5 pa3 ph5-ns">
      <h1 className="mt0 white f1">Card Game</h1>
      <p className="lh-copy center measure white">
        Click on a card to start
      </p>
      <div className="cardList">
        {
          icons.map(function (icon, index){
            return <Card key={index} icon={icon.icon}/>
          })
        }
      </div>
    </section>
  );
}

export default CardBoard;