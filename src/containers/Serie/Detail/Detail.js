import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import { 
    Drawer,
    Skeleton,
    Tabs,
    Typography,
    List
} from 'antd';

import './Detail.css';

function Detail(props) {
    const [loading, setLoading] = useState(true);
    const [sns, setSeasons] = useState({data: []});
    const { TabPane } = Tabs;
    const { Paragraph } = Typography;

    function fetchSeasons () {
        let tempSeasons = [];
        for(let counter = 1; counter <= props.serie.totalSeasons; counter++) {
            try {
                axios.get('http://www.omdbapi.com/?apikey=5ccb1a9d&t='+props.serie.Title+'&type=series&plot=full&season='+counter).then(
                    response => {
                        console.log('Temporada ', counter, response.data)
                        // return response.data
                        tempSeasons.push(response.data);
                    }
                )
            } catch(error) {
                console.log(error);
            }
        }
        setSeasons(tempSeasons)
        // return tempSeasons;
    }

    function Seasons () {
        return (
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
        )
    }

    // TODO fetching just season 1
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const result = await axios.get(
    //             'http://www.omdbapi.com/?apikey=5ccb1a9d&t='+props.serie.Title+'&type=series&plot=full&season=1'
    //         ).then(
    //             response => {
    //                 const objResult = { data: response.data };
    //                 setSeasons(objResult);
    //                 console.log(objResult)
    //             }
    //         );
    //     };
    //     fetchData();
    // }, [])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        const objResult = [];
        for(let season=1; season<=props.serie.totalSeasons; season++) {
            const fetchData = async () => {
                const result = await axios.get(
                    'http://www.omdbapi.com/?apikey=5ccb1a9d&t='+props.serie.Title+'&type=series&plot=full&season='+season
                ).then(
                    response => {
                        objResult.push({ data: response.data });
                        // Array is set up with all the seasons
                        if(objResult.length == response.data.totalSeasons) {
                            setSeasons(objResult);
                            console.log(objResult);
                        }
                    }
                );
            };
            fetchData();
        }
        setLoading(false);        
    }, [])

    
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
                    <Seasons />
                }
                
            </Skeleton>
        </Drawer>
    );
}

export default Detail;