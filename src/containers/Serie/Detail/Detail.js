import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import { 
    Drawer,
    Skeleton,
    Tabs,
    Typography,
    List,
    Spin
} from 'antd';

import './Detail.css';

function Detail(props) {
    const [loading, setLoading] = useState(true);
    const [sns, setSeasons] = useState({data: []});
    const [fetched, setFetched] = useState(false);
    const { TabPane } = Tabs;
    const { Paragraph } = Typography;

    function Seasons () {
        return (
            <Fragment>
            {
                loading === false ? 
                    <Tabs defaultActiveKey="0">
                    {
                        sns.map((season,index) => (
                            <TabPane tab={'Season ' + season.data.Season} key={index}>
                                <List
                                    size="small"
                                    bordered
                                    dataSource={season.data.Episodes}
                                    renderItem={
                                        episode => (
                                            <List.Item>{episode.Episode}. {episode.Title}</List.Item>
                                        )}                            
                                />
                            </TabPane>
                        ))
                    }
                    </Tabs>
                : 'cannot display yet'
            }
            </Fragment>
        )
    }

    function fetchSeasons() {      
        console.log('fetching seasons...')  
        const objResult = [];
        for(let season=1; season<=props.serie.totalSeasons; season++) {
            // eslint-disable-next-line no-loop-func
            const fetchData = async () => {
                const result = await axios.get(
                    'http://www.omdbapi.com/?apikey=5ccb1a9d&t='+props.serie.Title+'&type=series&plot=full&season='+season
                ).then(
                    response => {
                        if(response.data) {
                            objResult.push({ data: response.data });
                            // Array is set up with all the seasons
                            if(objResult.length.toString() === response.data.totalSeasons) {
                                const sortedResult = [...objResult].sort((a,b) => (a.Season > b.Season) ? -1 : 1);
                                setSeasons(sortedResult);
                                return sortedResult;
                            }
                        }
                        
                    }
                );
            };
            fetchData();
        }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {        
        // ? Like componentDidMount -> Executing while component 'Detail' loaded
        // Getting all seasons, one by one...
        fetchSeasons();
    }, [])

    useEffect( () => {
        // ? Executed after data(seasons) is fetched
        setLoading(false);
        setFetched(true);
    }, [sns])
    
    return (
        <Drawer
        width={"40%"}
        placement="right"
        visible={props.show}
        onClose={props.closeDetail}
        // visible={true}
        >
            <Skeleton loading={loading}>
                <h1>{props.serie.Title}</h1>
                {/* IMDb */}
                <Paragraph type="secondary" copyable={{text: props.serie.imdbID}}>IMDb Ref. {props.serie.imdbID}</Paragraph>
                <h3>Plot</h3>
                <Paragraph ellipsis={{rows: 5, expandable: true}}>{props.serie.Plot}</Paragraph>
                <h3>Seasons</h3>
                {
                    fetched ? 
                        <Seasons />
                    :
                        // Loading seasons
                        (
                            <Skeleton loading={true} />,
                            // Call fetching method once again...
                            fetchSeasons()
                        )
                }
                
            </Skeleton>
        </Drawer>
    );
}

export default Detail;