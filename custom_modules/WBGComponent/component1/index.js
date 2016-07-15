/**
 * Created by haizhi on 16/7/14.
 */


import React from 'react';
import './styles.css';
class Component1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div className="color-red">I'm Common Component 1</div>
        )
    }
}

module.exports = Component1;