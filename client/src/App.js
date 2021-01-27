import './App.css';
import React from 'react';
import { Container, } from '@material-ui/core'

import Navbar from './components/Navbar/Navbar'
import { BrowserRouter } from 'react-router-dom'

import Main from './components/main';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Container maxwidth = "lg">
          <Navbar/>
          <Main />
        </Container>
      </BrowserRouter>
    </div>
  );
}

export default App;
