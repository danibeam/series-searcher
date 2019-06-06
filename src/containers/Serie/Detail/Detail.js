import React, { useState, useEffect } from 'react';
import { Drawer } from 'antd';

import './Detail.css';

const Detail = (props) => {

    // const [visible, ]

    useEffect (() => {
        // Similar to componentDidMount and componentDidUpdate: 
    })
    
    return (
        <Drawer
        width={"40%"}
        placement="right"
        visible={props.show}
        onClose={props.closeDetail}
        // visible={true}
        >
            {props.serie.imdbID}
        </Drawer>
    );
}

export default Detail;