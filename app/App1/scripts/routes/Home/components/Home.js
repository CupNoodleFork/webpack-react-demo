/**
 * Created by haizhi on 16/7/11.
 */
import React, { Component } from 'react'

class Home extends Component {
    render() {
        const events = [
            { id: 0, title: 'essay due' }
        ]

        return (
            <div>
                <h2>Home2</h2>
                <ul>
                    {events.map(event => (
                        <li key={event.id}>{event.title}</li>
                    ))}
                </ul>
            </div>
        )
    }
}

module.exports = Home;
