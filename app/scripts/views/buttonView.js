/**
 * Created by haizhi on 16/7/6.
 */
import React from 'react';
import { Button } from 'react-bootstrap';
import request from 'superagent';
class buttonView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    ajaxTest(text) {
        console.log(text);
        let _this = this;
        request.get('http://api.github.com/users/octocat/gists')
            .end((err, res) => {
                console.log(res);
            });
    }
    render() {
        return (
            <div>
                <div>button</div>
                <Button bsStyle="primary" bsSize="small" onClick={this.ajaxTest.bind(this,'hhh')}>It's a button</Button>
            </div>
        );
    }
}
export default buttonView;