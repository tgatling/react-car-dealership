import React, { Fragment } from 'react';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';

import Routing from './components/layout/Routing';

function App() {
  return (
    <Fragment>
      <Header />
      <Routing />
      <Footer/>
    </Fragment>
  );
}

export default App;
