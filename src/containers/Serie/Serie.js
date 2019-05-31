import React, { Component } from 'react';
import StarRatingComponent  from 'react-star-rating-component';
import { 
    Card,  
    // CardHeader,
    CardTitle,
    // CardImg,
    CardBody,
    CardFooter,
    Button 
} from 'shards-react';

import './Serie.css';

class Serie extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            
         };
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
                <CardFooter>
                    {
                        this.props.serie.imdbRating === "N/A" ?
                            "No IMDb rating available"
                        :
                        (
                            "IMDb rating: ",
                            <StarRatingComponent
                                name="imdbrating" 
                                starCount={10}
                                value={parseInt(this.props.serie.imdbRating)}
                                editing={false}
                            />
                        )
                            
                    }
                    
                </CardFooter>
            </Card>
        );
    }
}

export default Serie;