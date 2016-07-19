/**
 * Created by haizhi on 16/7/11.
 */
import React, { Component } from 'react'

import { Component1, Component2 } from 'WBGComponent';

class App extends Component {
    render() {
        return (
            <div>
                <div style={{ padding: 20 }}>
                    {this.props.children}
                </div>
                <div>Hello App1</div>
                <Component1></Component1>
                <Component2></Component2>
                <div className="bk trans"></div>
            </div>
        )
    }
}
module.exports = App