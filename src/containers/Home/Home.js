import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import axios from 'axios';

// Components library
import { FormInput, Fade } from "shards-react";
import Serie from '../Serie/Serie';

// Styles
import './Home.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            showSerie: false,
            popularSeries: [],
            fetchedSerie: ''
        };
    }

    handleChange = (event) => {

        this.setState({
            showSerie: true
        })
    }

    getPopularSeries = () => {
        // &type=series => to filter movies, etc
        // ? Used Promises here to fetch everything within the map and collect results after mapping
        let hotOnes = ['Breaking bad', 'The Wire', 'Lost', 'House of Cards', 'The Walking Dead', 'House', 'Stranger Things'];

        const promises = hotOnes.map(async featured =>  {
            const response = await axios({
                method: 'GET',
                url: 'http://www.omdbapi.com/?apikey=5ccb1a9d&type=series&t=' + featured
            })

            return response.data
        })

        // Collect results
        const results = Promise.all(promises)
        
        // Resolve promise and register in state
        results.then(
            response => {
                console.log('Featured series: ', response)
                this.setState({
                    ...this.state,
                    popularSeries: response
                })
            }
        )
        
    }

    fetchSerie = (title) => {
        try {
            axios.get('http://www.omdbapi.com/?apikey=5ccb1a9d&type=series&t=' + title).then(
                response => {
                    console.log(response)
                    return response.data;
                }
            );
        } catch(err) {
            console.log('Error fetching serie ', title);
            console.log(err)
        }
    }

    componentDidMount() {
        this.getPopularSeries();
    }

    componentDidUpdate(prevProps, prevState) {
        // 
    }

    render() {

        return (
            <React.Fragment>
                <Header></Header>


                <h1>All the series, one place</h1>
                <FormInput className="searcher" type="text" size="lg" placeholder="Do not search for 'Game of Thrones' >:(" onChange={event => this.handleChange(event)} />
                <Fade in={this.state.showSerie}>
                    {
                        this.state.showSerie ?
                        (
                            <React.Fragment>
                                <p className="result">Fetched TV show:</p>
                                {/* <Serie serie={serie}></Serie> */}
                            </React.Fragment>
                        )                             
                        : null
                    }
                </Fade>                
                <Fade in={this.state.showSerie}>
                    <h2>Popular series</h2>
                    {
                        this.state.popularSeries.map((serie,index) => (
                            <Serie 
                            key={index}
                            serie={serie}
                            ></Serie>
                        ))
                    }
                </Fade>              
                
                <Footer></Footer>
            </React.Fragment>
        );
    }
}

export default Home;