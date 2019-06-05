import React from 'react';
import './Footer.css';
import { Divider } from 'antd';

function Footer() {
    return (
        <div className="Footer">
            <Divider dashed />
            <p>
                Series searcher - Powered by <a href="http://www.omdbapi.com" target="blank">OMDb</a> v1.0
            </p>
        </div>
    );
}

export default Footer;