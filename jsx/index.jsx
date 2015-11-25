// React dependencies
import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute } from 'react-router';
import { createHistory, useBasename } from 'history';
import ReactDOM from 'react-dom';

// Redux dependencies
import { createStore, compose, combineReducers } from 'redux';
import { ReduxRouter, routerStateReducer, reduxReactRouter, pushState } from 'redux-router';
import { Provider } from 'react-redux';


// REDUCERS
import { counter, title } from '../jsx/reducers/counter.jsx';

// Redux histroy state changer
const history = useBasename(createHistory)({
    basename: '/react-router-redux-router/public'
});

// combine all to make a "state"
const reducer = combineReducers({
    router: routerStateReducer,
    counter: counter,
    title: title
});


const store = compose(
    reduxReactRouter({ history })
)(createStore)(reducer);

var App = require('../jsx/pages/App.jsx');
var Home = require('../jsx/pages/Welcome.jsx');
var Tool = require('../jsx/pages/Tool.jsx');


class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <ReduxRouter>
                    <Route path="/" component={App}>
                        <IndexRoute component={Tool}/>
                        <Route path="/home" component={Home}/>
                        <Route path="/tool" component={Tool}/>
                        <Route path="*" component={Home}/>
                    </Route>
                </ReduxRouter>
            </Provider>
        );
    }
}


ReactDOM.render(<Root />, document.getElementById('content'));

