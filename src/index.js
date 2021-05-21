import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, } from 'react-router-dom'
import LayoutX from "./components/LayoutX";

ReactDOM.render(
    <Router>
        <LayoutX/>
    </Router>,
    document.getElementById('root')
);
