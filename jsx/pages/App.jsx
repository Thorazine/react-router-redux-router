import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//
import * as CounterActions from '../actions/action.jsx';


class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div>
                <div className="container">
                    Counter on App: {this.props.counter}
                </div>
                <div className="container">
                    {this.props.children}
                </div>
            </div>
        );
    }
}


// Which items will we put in the props for this class
function mapStateToProps(state) {
  return state;
}

// Which actions will we make availible
function mapDispatchToProps(dispatch) {
  return bindActionCreators(CounterActions,dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);