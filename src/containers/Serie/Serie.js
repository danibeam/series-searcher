import React, { Component } from 'react';
import StarRatingComponent  from 'react-star-rating-component';
import { 
    Card,  
    // CardHeader,
    CardTitle,
    // CardImg,
    CardBody,
    CardFooter,
    Button,
    Skeleton,
    Tooltip
} from 'antd';

import './Serie.css';

class Serie extends Component {
    constructor(props) {
        super(props);
        this.starRatingRef = React.createRef(); 
        this.state = {
            showTooltip: false,
            tooltip: '',
            loading: false
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
            <Card title={this.props.serie.Title} extra={<a href="#">More</a>}>
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
                    <br />
                    <Button><a href={"https://www.imdb.com/title/" + this.props.serie.imdbID} target="blank">See on IMDb &rarr;</a></Button>
                </Skeleton>
            </Card>
        );
    }
}

function Ratings({serie}) {

    return (
        <React.Fragment>            
            <Tooltip title={serie.imdbVotes + " votes registered"}>
                <span>IMDb rating:</span>
            </Tooltip>
            <br />
            <StarRatingComponent
                name="imdbrating" 
                id="imdbrating"
                starCount={10}
                value={parseInt(serie.imdbRating)}
                editing={false}
            />
        </React.Fragment>
    );
}

export default Serie;