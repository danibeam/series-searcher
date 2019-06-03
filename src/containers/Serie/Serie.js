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
    Tooltip
} from 'shards-react';

import './Serie.css';

class Serie extends Component {
    constructor(props) {
        super(props);
        this.starRatingRef = React.createRef(); 
        this.state = {
            showTooltip: false,
            tooltip: ''
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
                        // <Tooltip
                        // open={true}
                        // target={this.props.serie.imdbID}
                        // toggle={this.toggle}
                        // >
                        // Woo! I am a tooltip!
                        // ></Tooltip>
                    )
                :   "No IMDb rates available"
            );
        }

    }

    render() {
        return (
            <Card style={{ maxWidth: "300px" }}>
                {/* <CardHeader>Card header</CardHeader> */}
                {/* <CardImg src="https://place-hold.it/300x200" /> */}
                <CardBody>
                    <CardTitle>{this.props.serie.Title}</CardTitle>
                    <p>{this.props.serie.Genre}</p>
                    <p>{this.props.serie.Country}, {this.props.serie.Year}</p>
                    <Button>Read more &rarr;</Button>
                </CardBody>
                <CardFooter
                id={this.props.serie.imdbID}
                onMouseOver={event => this.hoverRate(event)}
                onMouseOut={event => this.unHoverRate(event)}
                >
                    {
                        this.props.serie.imdbRating === "N/A" ?
                            "No IMDb rating available"
                        :
                        (
                            "IMDb rating: ",
                            <StarRatingComponent
                                name="imdbrating" 
                                id="imdbrating"
                                starCount={10}
                                value={parseInt(this.props.serie.imdbRating)}
                                editing={false}
                                // onMouseOver={this.hoverRate.bind(this)}
                                // onMouseOut={this.unHoverRate.bind(this)}
                                // onStarClick={this.renderTooltip.bind(this)}
                            />
                        )
                    }
                    
                    {
                        this.state.showTooltip ? 
                            this.renderTooltip()
                        : null
                    }

                </CardFooter>
            </Card>
        );
    }
}

export default Serie;