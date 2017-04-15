

import React, { Component, Children } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import PropTypes from 'prop-types';
import styled from 'styled-components';

import { findElement } from './findElement';
import { MainNav } from './MainNav';
import { Pages } from './Pages';
import { MainHeader } from './MainHeader';

const AppWrapper = styled.div`
    width: 100%;
    height: 100%;
    border: 0px;
    margin: 0px;
    display: flex;
    
`;

const FlexWrapper = styled.div`
    display: flex;
    flex: auto;
    background: #1C2022;
`;

const FlexCenterWrapper = styled.div`
    display: flex;
    flex: auto;    
`;
const AppPane = styled.div`
    top: 0px;
    display: flex;
    flex: 1 1 0%;
    position: absolute;
    outline: none;
    overflow: hidden;
    user-select: text;
    flex-direction: row;
    height: 100%;
    left: 0px;
    right: 0px;
`;

const SideContainer = styled.div`
    flex: 0 0 auto;
    position: relative;
    outline: none;
    background: #272C2E;
    color: #FFF;
    width: 220px;
`;

const MainContainer = styled.div`
    flex: 1 1 0%;
    position: relative;
    outline: none;
`;
const MainView = styled.div`
    height: 100%;
    width: 100%;    
    background: #FFF;
`;

const HeaderContainer = styled.div`
    height: 52px;
    width: 100%;
    border-bottom: 1px solid #222;
    background: #1C2022;
`;

const findMainNav = findElement(MainNav);
const findHeaderElement = findElement(MainHeader);
const findPages = findElement(Pages);

const MainAppPane = (props) => (
     <AppWrapper>
        <FlexWrapper>
            <FlexCenterWrapper>
                <AppPane>{ props.children }</AppPane>
            </FlexCenterWrapper>
        </FlexWrapper>
    </AppWrapper>
);

export const createReactApp = ({store}) => {

    return class extends Component {

        static propTypes = {
            children: PropTypes.node,
            render: PropTypes.func
        }

        constructor(props) {
            super(props);
        }

        renderPage = (pageProps, routeProps) => {
            const PagesElement = findPages(this.props.children);
            console.log('rendering page ');
            if ( PagesElement ) {
                const { pageRenderer } = PagesElement.props;
                if ( typeof pageRenderer === 'function') {
                    return pageRenderer({pageProps, routeProps, store });
                }

            }
            return <div>No Handler for Page render</div>;
        }

        renderPageRouters = () => {


            if ( this.pageRouters ) {
                return this.pageRouters;
            }
            const PagesElement = findPages(this.props.children);

            this.pageRouters = Children.toArray(PagesElement.props.children)
                .map( page => {
                    const { path, id, renderer } = page.props;
                    const pathToUse = path || `/${id}`;
                    let renderFn = renderer;
                    if ( !renderFn ) {
                        renderFn = (routeArgs) => this.renderPage(page.props, routeArgs);
                    }
                    console.log('returning router.. ' + pathToUse);
                    return <Route exact path={pathToUse} key={id} render={renderFn}/>;
                });

            return this.pageRouters;

        }

        render() {
            const { children } = this.props;

            const MainNavElement = findMainNav(children);
            const MainHeaderElement = findHeaderElement(children);

            return (
                <Router>
                    <MainAppPane>
                        <SideContainer>
                            { MainNavElement ? MainNavElement.props.children : null }
                        </SideContainer>
                            <MainContainer>
                                <MainView>
                                    <HeaderContainer>
                                        { MainHeaderElement ? MainHeaderElement.props.children : null }
                                    </HeaderContainer>
                                    <Route path='/' render={ () => (<div>Render</div>)}/>
                                    { this.renderPageRouters() }
                                </MainView>
                            </MainContainer>
                    </MainAppPane>
                </Router>
            );
        }
    };

};

export default createReactApp;