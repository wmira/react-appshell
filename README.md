# React SPA Kit

# Motivation

Creating an SPA app involves around creating common page components e.g. header , navigation and various pages. We should be able to easily abstract it such that it becomes a matter of specifying a template. That template then manages how the specific components get rendered.


## Target Usage

```javascript

import { 
    DefaultTemplate, 
    Pages, 
    Page, 
    MainNav, 
    MainHeader,
    createReactApp
} from 'react-spa-kit';


export const createApp = () => {

    const App = createReactApp(DefaultTemplate);


    return class MyApp extends React.Component {

        render() {
            return (
                <App>
                    <MainHeader>
                        <LeftRightSection style={{height: '100%'}}>
                            <Center style={{paddingLeft: 16, fontSize: 22, fontWeight: 'bold', color: '#FFF'}}></Center>
                        </LeftRightSection>
                    </MainHeader>
                    <MainNav>
                        <AppTitle/>
                        <NavMenu/>
                    </MainNav>
                    <Pages >
                        <Page id='main' component={MainPage}/>
                        <Page id='orders' component={OrdersPage}/>
                        <Page id='products' component={ProductsPage}/>
                    </Pages>
                </App>                
            )
        }
    }

}

```

With the declaration above, React SPA Kit will automatically create store, routing and layouting of the components. The layot will be depending on which template was used.

## Status

This is still on early mode and everything could change.