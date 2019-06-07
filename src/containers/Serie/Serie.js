import React, { Component } from 'react';
import Detail from './Detail/Detail';
import StarRatingComponent from 'react-star-rating-component';
import { Link } from 'react-router-dom';
import { 
    Card,  
    // CardHeader,
    CardTitle,
    // CardImg,
    CardBody,
    CardFooter,
    Button,
    Skeleton,
    Tooltip,
    Icon
} from 'antd';

import './Serie.css';
// Icons (IMDb)
import imdbLogo from '../../Icons/imdb.svg';


class Serie extends Component {
    constructor(props) {
        super(props);
        this.starRatingRef = React.createRef(); 
        this.state = {
            showTooltip: false,
            tooltip: '',
            loading: false,
            showDetails: false
        };

        this.hoverRate.bind(this);
        this.unHoverRate.bind(this)
    }

    componentDidMount() {
        // 
    }

    hoverRate = (event) => {
        event.stopPropagation();
        this.setState({showTooltip: true})
    }

    unHoverRate = (event) => {
        event.stopPropagation();
        this.setState({showTooltip: false})
    }

    handleDetails = (event) => {
        event.preventDefault();
        console.log('Details')
        this.setState({showDetails: true})
    }

    handleCloseDetail = (event) => {
        event.preventDefault();
        this.setState({showDetails: false})
    }

    renderTooltip = () => {
        if(this.state.showTooltip) {
            return (
                this.state.showTooltip ? 
                    (
                        <div className="tooltip">
                            <p>Rated with {this.props.serie.imdbRating} on IMDb</p>
                        </div>
                    )
                :   "No IMDb rates available"
            );
        }

    }

    render() {
        return (
            <React.Fragment>
                <Detail 
                show={this.state.showDetails} 
                closeDetail={this.handleCloseDetail} 
                serie={this.props.serie}
                />
                <Card 
                title={this.props.serie.Title} 
                actions={
                    [<Logo serie={this.props.serie} />, <Icon style={{'marginTop': '10px'}} type="plus" title="See more details" onClick={this.handleDetails} />]
                }>
                    <Skeleton loading={this.state.loading} active>
                        <p>{this.props.serie.Genre}</p>
                        <p>{this.props.serie.Country}, {this.props.serie.Year}</p>
                        
                        {
                            this.props.serie.imdbRating === "N/A" ?
                                "No IMDb rating available *"
                            :
                            (
                                <Ratings serie={this.props.serie} />
                            )
                        }
                        
                        {
                            this.state.showTooltip ? 
                                this.renderTooltip()
                            : null
                        }
                    </Skeleton>
                </Card>
            </React.Fragment>
        );
    }
}

function Ratings({serie}) {

    return (
        <React.Fragment>            
            <Tooltip title={"Ranked with " + serie.imdbRating + " by " + serie.imdbVotes + " users on IMDb"}
            overlayClassName="tooltip">
                <div>
                    {/* <span>IMDb rating:</span> */}
                    <br />
                    <StarRatingComponent
                        name="imdbrating" 
                        id="imdbrating"
                        starCount={10}
                        value={parseInt(serie.imdbRating)}
                        editing={false}
                    />
                </div>
            </Tooltip>

        </React.Fragment>
    );
}

function Logo ({serie}) {
    return (
        <React.Fragment>
            <a href={"https://www.imdb.com/title/" + serie.imdbID} target="blank">
                <img src={imdbLogo} alt="IMDb link" title="See on IMDb" width="40px" height="40px" />   
            </a>
        </React.Fragment>
    )
}

export default Serie;   