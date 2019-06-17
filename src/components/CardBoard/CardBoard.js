import React, {Component} from 'react';
import './CardBoard.css'
import Card from '../Card/Card'
import {icons} from '../Card/Icons';

class CardBoard extends Component {

    userCanClick = true;
    pair = [];
    state = {};
    attempts = 0;

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
        return this.userCanClick;
    }

    cardClicked(card) {
        if (this.pair.length < 2) {
            this.pair.push(card);

            if (this.pair.length === 2) {
                this.userCanClick = false;

                const card1 = this.pair[0];
                const card2 = this.pair[1];

                // Increment the number of attempts
                this.attempts++;

                setTimeout(() => {
                    let cardIcon1 = card1.props.icon;
                    let cardIcon2 = card2.props.icon;

                    if (cardIcon1['iconName'] === cardIcon2['iconName']) {
                        card1.setMatched(true);
                        card2.setMatched(true);

                        console.log('match found');
                    } else {
                        card1.reset();
                        card2.reset();

                        console.log('match not found');
                    }

                    this.pair = [];
                    this.userCanClick = true;

                    console.log(this.attempts + " attempts");
                }, 1000);
            }
        }
    }

    render() {

        const _this = this;

        return (
            <section className=" br3 color-grad mw5 mw7-ns center mt5 shadow-5 pa3 ph5-ns">
                <h1 className="mt0 white f1">Card Game</h1>
                <p className="lh-copy center measure white">
                    Click on a card to start
                </p>
                <div className="cardList">
                    {
                        icons.map(function (icon, index) {
                            return <Card key={index} icon={icon.icon} cardBoard={_this}/>
                        })
                    }
                </div>
            </section>
        );
    }
}

export default CardBoard;