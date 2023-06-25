import * as React from 'react';
import Nav from './src/Nav';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Reducers from './src/store/reducer';

// 创建 Redux store
const store = configureStore({
  reducer: Reducers,
});

function App() {
  return (
    <Provider store={ store }>
      <Nav />
    </Provider>
  );
}

export default App;