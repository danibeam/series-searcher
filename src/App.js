import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

/**
 * Styles
 * Using Ant Design components for React
 * Learn more: https://ant.design/docs/react/introduce
 */
import 'antd/dist/antd.css';
import './App.css';

/**
 * Components
 */
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

/**
 * Containers
 */
import Home from './containers/Home/Home';
import NotFound from './containers/404/404';

function App() {
    return (
        <div className="App">
            <Header></Header>
            {/* Routing */}
            <Router>
                <Switch>
                    <Route path="/serie/:name" component={Home}></Route>
                    <Route path="/serie/:name/:season"></Route>
                    <Route exact path="/" component={Home}></Route>
                    <Route component={NotFound}></Route>
                </Switch>
            </Router>
            <Footer></Footer>
        </div>
    );
}

export default App;
