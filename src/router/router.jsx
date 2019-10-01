import React from 'react';

import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import Bundle from '@router/bundle';


import Home from 'bundle-loader?lazy&name=home!@pages/Home';
import Page1 from 'bundle-loader?lazy&name=home!@pages/Page1';

//路由按需加载
class Loading extends React.Component{
  render() {
    return (
        <div>Loading...</div>
    )
  }
}
const createComponent = (Component) => (props) => (
    <Bundle load={Component}>
      {
        (Component) => Component ? <Component {...props} /> : <Loading />
      }
    </Bundle>
);

const getRouter = () => (
    <Router>
      <div>
        <ul>
          <li><Link to="/">首页</Link></li>
          <li><Link to="/page1">Page1</Link></li>
        </ul>
        <Switch>
          <Route exact path="/" component={createComponent(Home)}/>
          <Route path="/page1" component={createComponent(Page1)}/>
        </Switch>
      </div>
    </Router>
);

export default getRouter;
