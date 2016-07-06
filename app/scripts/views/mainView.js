/**
 * Created by haizhi on 16/7/6.
 */
import React from 'react';

class mainView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
                {this.props.children || <Home />}
            </div>
        )
    }
}

export default mainView;