/**
 * Created by haizhi on 16/7/5.
 */
import React from 'react';

export default class BoxComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className="text-right h50 w400">BoxComponent</div>
        )
    }
}