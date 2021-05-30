import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, } from 'react-router-dom'
import LayoutX from "./components/layout/LayoutX";

window.setInterval(function () {
    //12小时之后清除
    localStorage.removeItem('x-manager-username')
    localStorage.removeItem('x-manager-token')
}, 1000 * 60 * 60 * 12 )


ReactDOM.render(
    <Router>
        <LayoutX/>
    </Router>,
    document.getElementById('root')
);
