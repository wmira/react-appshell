
import React, { Children } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

export const PageView = () => {
    throw new Error('This should not render');
};

export class PageViews extends React.Component {

    static propTypes = {
        children: PropTypes.node
    }

    render() {
        const { children = [] } = this.props;
        return (
            <Switch>
                { Children.toArray(children).map( child => {
                    const { props } = child;
                    return <Route {...props} />;
                }) }
            </Switch>
        );
    }
}