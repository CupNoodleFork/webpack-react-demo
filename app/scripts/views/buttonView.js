/**
 * Created by haizhi on 16/7/6.
 */
import React from 'react';
import { Button } from 'react-bootstrap';

class buttonView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
                <div>button</div>
                <Button bsStyle="primary" bsSize="small">It's a button</Button>
            </div>
        );
    }
}
export default buttonView;