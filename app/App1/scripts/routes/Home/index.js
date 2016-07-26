/**
 * Created by haizhi on 16/7/11.
 */
import React, { Component } from 'react'
import { createStore } from 'redux';
import todoApp from '../../reducers/testReducer';
import { Provider } from 'react-redux';
import { addTodo, toggleTodo, setVisibilityFilter, VisibilityFilters } from '../../actions/testAction'
import App from './containers/App';

let store = createStore(todoApp);

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
                <div>I'm a pic 2</div>
                <Provider store={store}>
                    <App></App>
                </Provider>
            </div>
        )
    }
}

module.exports = {
    path: 'home',
    getComponent(nextState, callback) {
        /*require.ensure([], (require) => {
            callback(null, require('./components/Home'))
        })*/
        callback(null, Home);
    }
};