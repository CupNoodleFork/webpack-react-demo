/**
 * Created by haizhi on 16/7/14.
 */


import React from 'react';
import '../../styles/styles.css';
import '../../styles/images.css'

class Component1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div>
                <div className="color-red">I'm Common Component 1</div>
                <div className="icon-1 icon-s12"></div>
            </div>
        )
    }
}

module.exports = Component1;