import React from 'react';
import './Header.css';
import logo from '../../Icons/logo.png';

// HOC (Wrapper)
import wrapperComponent from '../../hoc/wrapper';

import {
    Layout,
    Row,
    Col
} from 'antd';

function Header(props) {
    return (
        <Row className="Header" style={props.headerStyle}>
            <Col md={4} xs={24}><a href="/"><img alt="Series Searcher" title="Series Searcher" src={logo} width="100px" height="auto" /></a></Col>
            <Col md={10} xs={0}></Col>
            <Col md={10}><br /><h1>All the series. One place.</h1></Col>
        </Row>
    );
}

// Wrap up this component -> Giving some side-padding to adjust the content
const WrappedComponent = wrapperComponent(Header);

export default WrappedComponent;