
import React from 'react';
import PropTypes from 'prop-types';

export class Pages extends React.Component {
    static propTypes = {
        children: PropTypes.node
    }
    render() {
        return <div>{ this.props.children }</div>;
    }

}