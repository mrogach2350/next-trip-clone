import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import RootContainer from './containers/rootContainer'

function App() {
  return (
    <Router>
      <Route path="/" component={RootContainer} />
    </Router>
  );
}

export default App;
