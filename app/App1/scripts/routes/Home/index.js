/**
 * Created by haizhi on 16/7/11.
 */
import React, { Component } from 'react'
import { createStore } from 'redux';
import todoApp from '../../reducers/testReducer';
import { addTodo, toggleTodo, setVisibilityFilter, VisibilityFilters } from '../../actions/testAction'

let store = createStore(todoApp);

class Home extends Component {
    render() {
        const events = [
            { id: 0, title: 'essay due' }
        ]
        console.log(store.getState())

// 每次 state 更新时，打印日志
// 注意 subscribe() 返回一个函数用来注销监听器
        let unsubscribe = store.subscribe(() =>
            console.log(store.getState())
        )

// 发起一系列 action
        store.dispatch(addTodo('Learn about actions'))
        store.dispatch(addTodo('Learn about reducers'))
        store.dispatch(addTodo('Learn about store'))
        store.dispatch(toggleTodo(0))
        store.dispatch(toggleTodo(1))
        store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED))

// 停止监听 state 更新
        unsubscribe();
        return (
            <div>
                <h2>Home2</h2>
                <ul>
                    {events.map(event => (
                        <li key={event.id}>{event.title}</li>
                    ))}
                </ul>
                <div>I'm a pic 2</div>
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