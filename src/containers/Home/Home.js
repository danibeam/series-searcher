import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { 

         };
    }
    render() {
        return (
            <div>
                <Header></Header>
                <h1>Series filter</h1>
                <Footer></Footer>
            </div>
        );
    }
}

export default Home;