
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
// import { configureStore } from '@reduxjs/toolkit'

// const persistedState = loadState();
// const store = configureStore(
//   { reducer: {
//       persistedState }
//   });

// store.subscribe(throttle(() => {
//   saveState({
//     todos: store.getState().todos,
//   });
// }, 1000));

ReactDOM.createRoot(document.getElementById('root') ?? document.body).render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
)
