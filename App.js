import React from 'react';
import {
  StatusBar
} from 'react-native';

import AppNavigation from './src/AppNavigation'

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar backgroundColor="#332033" />
      <AppNavigation />
    </>
  );
};

export default App;
