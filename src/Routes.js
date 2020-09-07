import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom';
import {OrderView, HomeView} from 'views';

export default function AppRoutes() {
  return <>
    <Router>
      <Route exact path="/pedido">
        <OrderView />
      </Route>
      <Route exact path="/">
        <HomeView />
      </Route>
    </Router>
  </>;
}
