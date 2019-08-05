import React from 'react';
import logo from './logo.svg';
import './App.css';

import { Router, Route } from 'react-router-dom';
import { history } from './_helpers';
import { RegistrationContainer } from './_components'
import { MoviesContainer } from './_components'

function App() {
  return (
  	<Router history={history}>
	    <div className="App">
          	<Route path="/" component={RegistrationContainer} />
          	<Route path="/" component={MoviesContainer} />
	    </div>
    </Router>
  );
}

export default App;
