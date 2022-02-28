import React, { Fragment } from 'react';
import InfoBar from './components/layout/InfoBar';

import NavigationBar from './components/layout/NavigationBar';
import Routing from './components/layout/Routing';

function App() {
  return (
    <Fragment>
      <InfoBar />
      <NavigationBar />
      <Routing />
    </Fragment>
  );
}

export default App;
