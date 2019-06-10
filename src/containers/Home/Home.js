import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import axios from 'axios';

// UI Components library
import { 
    Button,
    Form,
    Input,
    Dropdown,
    Skeleton,
    Spin
} from 'antd';

import Serie from '../Serie/Serie';

// Styles
import './Home.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            showSerie: false,
            fetchedSerie: '',
            message: '',
            popularSeries: [],
            showPopularSerie: false,
            inputValue: '',
            loading: true
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (event) => {

        this.setState({
            inputValue: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if(this.state.inputValue) {
            this.fetchSerie(this.state.inputValue)
        }
    }

    getPopularSeries = () => {
        // &type=series => to filter movies, etc
        // ? Used Promises here to fetch everything within the map and collect results after mapping
        let hotOnes = ['Breaking bad', 'The Wire', 'Lost', 'House of Cards', 'The Walking Dead', 'House', 'Stranger Things'];

        const promises = hotOnes.map(async featured =>  {
            const response = await axios({
                method: 'GET',
                url: 'http://www.omdbapi.com/?apikey=5ccb1a9d&type=series&plot=full&t=' + featured
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
                    showPopularSerie: true,
                    popularSeries: response,
                    loading: false
                })
            }
        )
        
    }

    fetchSerie = (title) => {
        try {
            axios.get('http://www.omdbapi.com/?apikey=5ccb1a9d&type=series&t=' + title).then(
                response => {
                    console.log(title, response)
                    if(response.data.Response !== "False") {
                        this.setState({
                            showSerie: true,
                            serie: response.data,
                            message: 'Fetched TV Show'
                        })
                    } else {
                        this.setState({
                            showSerie: false,
                            message: 'Couldnt find ' + title
                        })
                    }

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

                <h1>All the series, one place</h1>
                <Form>
                    <Input className="searcher" type="text" placeholder="Do not search for 'Game of Thrones' (T_T)" onChange={event => this.handleChange(event)} />
                    <Button htmlType="submit" onClick={this.handleSubmit}>Filter</Button>
                    {/* <Dropdown addonType="append"></Dropdown> */}
                </Form>
                {
                    this.state.showSerie ?
                    (
                        <React.Fragment>
                            <p className="result"><strong>{this.state.message}</strong></p>
                            <Serie serie={this.state.serie}></Serie>
                        </React.Fragment>
                    )                             
                    : <p className="result"><strong>{this.state.message}</strong></p>
                }
                <React.Fragment>
                    <h2>Featured TV series</h2>
                    {
                        this.state.loading ?
                            <Spin />
                        :
                        this.state.popularSeries.map((serie,index) => (
                            <Serie 
                                key={index}
                                serie={serie}
                            ></Serie>
                        ))
                    }
                        
                        {/* <Skeleton loading={this.state.loading} active>
                            {
                                this.state.popularSeries.map((serie,index) => (
                                    <Serie 
                                        key={index}
                                        serie={serie}
                                    ></Serie>
                                ))
                            }        
                        </Skeleton>    */}
                </React.Fragment>
            </React.Fragment>
        );
    }
}

export default Home;