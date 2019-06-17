import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import './Card.css'

class Card extends Component {
    constructor() {
        super();
        this.state = {
            cardUp: false,
            isMatched: false
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        if (this.state.isMatched) {
            return;
        }

        if (!this.props.cardBoard.canUserClick()) {
            return;
        }

        if (this.state.cardUp) {
            this.setState({cardUp: false});
        } else {
            this.setState({cardUp: true});
        }

        this.props.cardBoard.cardClicked(this);
    }

    setMatched(isMatched) {
        this.setState({
            isMatched: isMatched
        });
    }

    reset() {
        this.setState({
            cardUp: false,
            isMatched: false
        });
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
            iconOptions['className'] = "center f1 orange tc";
        } else {
            iconOptions['className'] = "center f1 orange tc hidden";
        }

        return (
            <div
                className={`icon-center pointer mw4 bg-white br3 pa1 pa4-ns ma2 dib shadow-5 card ${this.state.cardUp ? '' : 'state-hidden'}`}
                {...cardOptions} >
                <FontAwesomeIcon {...iconOptions}  />
            </div>
        );
    }
}

// const Card = ({icon}) => {
//   return (
//       <div className="icon-center pointer mw4 bg-white br3 pa1 pa4-ns ma2 dib shadow-5 card state-hidden" onClick={foo} 
//           data-is-visible="false" data-is-solved="false">
//         <FontAwesomeIcon icon={icon} className="center f1 orange tc hidden" />
//       </div> 
//   );
// }

export default Card;