import React from 'react';
import {
  SafeAreaView,
  StatusBar
} from 'react-native';

import AppNavigation from '../FirebaseTest2/src/AppNavigation'

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar backgroundColor="#1e121e" />
      <SafeAreaView>
        <AppNavigation />
      </SafeAreaView>
    </>
  );
};

export default App;
