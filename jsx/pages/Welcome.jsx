var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;
import { connect } from 'react-redux';

// partials
//var Button = require('../pages/partials/Button.jsx');

// helpers
var classNames = require('classnames');


var Welcome = React.createClass({
    mixins: [
        Router.Navigation
    ],
    getInitialState: function() {
        return {}; //store.getState();
    },
    render: function () {
        console.log(this.state);
        return (
            <div>
                <Link to="tool">Tool</Link>
            </div>
        );
    }
});

export default Welcome;