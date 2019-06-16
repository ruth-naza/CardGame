import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Card.css'
import ReactCardFlip from 'react-card-flip';

const Card = ({icon}) => {
  return (
    
      <div className="icon-center mw4 bg-white br3 pa1 pa4-ns ma2 dib shadow-5">
      <FontAwesomeIcon icon={icon} className="center f1 orange tc" />
    </div>
  );
}

export default Card;