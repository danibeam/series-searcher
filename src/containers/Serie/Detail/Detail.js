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
                        sns.reverse().map((season,index) => (
                            <TabPane tab={'Season ' + season.Season} key={index}>
                                <List
                                    size="small"
                                    bordered
                                    dataSource={season.Episodes}
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
        const objResult = [];
        for(let season=1; season<=props.serie.totalSeasons; season++) {
            // eslint-disable-next-line no-loop-func
            const fetchData = async () => {
                // eslint-disable-next-line no-unused-vars
                const result = await axios.get(
                    'https://www.omdbapi.com/?apikey=5ccb1a9d&t='+props.serie.Title+'&type=series&plot=full&season='+season
                ).then(
                    response => {
                        if(response.data) {
                            objResult.push(response.data);
                            // Array is set up with all the seasons
                            if(objResult.length.toString() === response.data.totalSeasons) {
                                const sortedResult = [...objResult].sort((a,b) => (parseInt(a.Season, 10) > parseInt(b.Season, 10)) ? -1 : 1);
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        // console.log('Another serie')
        // TODO check if new serie typed -> fetch its seasons
    }, [props])

    useEffect(() => {
        // ? Executed after data(seasons) is fetched & all seasons are stored
        if(sns.length == props.serie.totalSeasons) {
            // let sortedResult = [...sns].sort(dynamicSort("Season"));
            setLoading(false);
            setFetched(true);
        }
    }, [props.serie.totalSeasons, sns])
    
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

function dynamicSort(property) {
    var sortOrder = 1;

    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }

    return function (a,b) {
        if(sortOrder === -1){
            return b[property].localeCompare(a[property]);
        }else{
            return a[property].localeCompare(b[property]);
        }        
    }
}

export default Detail;