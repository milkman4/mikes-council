import React from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';

import Form from './components/Form';
import Search from './components/Search';

const Routes = () => (
  <Router>
    <div>
      <Route exact path="/" component={Form} />
      <Route path="/search" component={Search} />
    </div>
  </Router>
);

export default Routes;
