import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './components/Home/home';
import Preview from './components/Preview/preview';
// import Export from './components/Export/export';
import Layout from './hoc/Layout/layout'



class Routes extends Component {
    render() {
        return (
            <Layout>
                <Switch>
                    <Route path="/home" exact component={Home}/>
                    <Route path="/preview" exact component={Preview}/>
                    {/* <Route path="/export" exact component={Export}/> */}
                </Switch>
            </Layout>
            
        );
    }
}

export default Routes;