/**
 * Created by haizhi on 16/7/5.
 */
import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../app/styles/common.css'
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import ReactDOM from 'react-dom';

/*router views*/
import MainView from './scripts/views/mainView';
import ButtonView from './scripts/views/buttonView';
import HomeView from './scripts/views/homeView';

class HelloWorldComponent extends React.Component {
    constructor() {
        super();
        this.state = {};
    }
    render() {
        return (
            <Router history={hashHistory}>
                <Route path="/" component={MainView}>
                    <IndexRoute component={HomeView}></IndexRoute>
                    <Route path="/button" component={ButtonView}></Route>
                </Route>
            </Router>
        );
    }
}
ReactDOM.render(<HelloWorldComponent />, document.getElementById('content'));
