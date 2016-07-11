/**
 * Created by haizhi on 16/7/5.
 */
import React from 'react';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../app/styles/common.css';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import ReactDOM from 'react-dom';

/*router views*/

const rootRoute = {
    childRoutes: [ {
        path: '/',
        component: require('./scripts/components/App'),
        childRoutes: [
            require('./scripts/routes/Home'),
        ]
    } ]
}

class HelloWorldComponent extends React.Component {
    constructor() {
        super();
        this.state = {};
    }
    render() {
        return (
            <Router history={hashHistory}
            routes={rootRoute}>
            </Router>
        );
    }
}
ReactDOM.render(<HelloWorldComponent />, document.getElementById('content'));
