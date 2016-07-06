/**
 * Created by haizhi on 16/7/6.
 */
import React from 'react';
import { Button } from 'react-bootstrap';
class CommonButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (
            <div>
                <Button bsStyle="primary" bsSize="large">react-bootstrap button</Button>
                <Button bsStyle="primary" block>Block Button</Button>
                <Button bsStyle="primary" active>Actived Button</Button>
            </div>
        )
    }
}

export {
    CommonButton
}