import React, {Component} from 'react';
import './App.css';
import CardBoard from '../components/CardBoard/CardBoard';

class App extends Component {
    constructor() {
        super();
        this.state = {
            isFlipped: false
        };
    }

    render() {
        return (
            <div className="App">
                <CardBoard/>
            </div>
        );
    }
};

export default App;
