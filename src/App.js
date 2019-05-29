import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import logo from './logo.svg';

// CSS
import 'shards-ui/dist/css/shards.min.css'
import './App.css';

import Home from './containers/Home/Home';

function App() {
    return (
        <div className="App">
            {/* Routing */}
            <Router>
                <Switch>
                    <Route path="/serie/:name"></Route>
                    <Route path="/serie/:name/:season"></Route>
                    <Route exact path="/" component={Home}></Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
