import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as CounterActions from '../actions/action.jsx';

class Tool extends Component {
    constructor(props) {
        super(props);
    }

    updateTitle(event) {
        this.props.updateTitle(event.target.value);
    }

    render() {
        return (
            <div>
                <div>
                    Link: <Link to="home">Home</Link>
                </div>
                <div>
                    Title: {this.props.title}
                </div>
                <div>
                    Input for title: <input type="text" defaultValue={this.props.title} onChange={(e) => this.updateTitle(e)}/>
                </div>
                <div onClick={this.props.incrementCounter}>
                    Counter (click to increase): {this.props.counter}
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

export default connect(mapStateToProps, mapDispatchToProps)(Tool);