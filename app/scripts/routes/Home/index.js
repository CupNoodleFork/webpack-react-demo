/**
 * Created by haizhi on 16/7/11.
 */
module.exports = {
    path: 'home',
    getComponent(nextState, callback) {
        require.ensure([], (require) => {
            callback(null, require('./components/Home'))
        })
    }
};