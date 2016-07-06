/**
 * Created by haizhi on 16/7/5.
 */
import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../app/styles/common.css'
import ReactDOM from 'react-dom';
import BoxComponent from './scripts/components/BoxComponent';
class HelloWorldComponent extends React.Component {
    constructor() {
        super();
        this.state = {};
    }
    render() {
        return (
            <div>
                <div style={{backgroundColor: 'red', width: '200px'}} className="text-center">Hello</div>
                <BoxComponent></BoxComponent>
                <div className="h50 w300">World!</div>
                <div>Begin React!</div>
            </div>
        );
    }
}
ReactDOM.render(<HelloWorldComponent />, document.getElementById('content'));
