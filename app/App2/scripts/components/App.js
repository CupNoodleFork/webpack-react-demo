/**
 * Created by haizhi on 16/7/11.
 */
import React, { Component } from 'react'

class App extends Component {
    render() {
        return (
            <div>
                <div style={{ padding: 20 }}>
                    {this.props.children}
                </div>
                <div>Hello App2</div>
            </div>
        )
    }
}

module.exports = App