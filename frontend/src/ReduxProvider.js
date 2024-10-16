"use client"; // This file needs to be a client component

import { Provider } from 'react-redux';
import { store } from './store/store';

const ReduxProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
