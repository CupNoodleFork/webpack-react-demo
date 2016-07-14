/**
 * Created by haizhi on 16/7/11.
 */
import React, { Component } from 'react'

import CommonComponent1 from 'WBGComponent/component1';

class App extends Component {
    render() {
        return (
            <div>
                <div style={{ padding: 20 }}>
                    {this.props.children}
                </div>
                <div>Hello App1</div>
                <CommonComponent1></CommonComponent1>
                <div className="bk trans"></div>
            </div>
        )
    }
}
module.exports = App