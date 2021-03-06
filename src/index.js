import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import { Provider } from 'react-redux'; 
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers/form_reducer';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';


// const createStoreWithMiddleware = applyMiddleware()(createStore)

// ReactDOM.render(
//     <Provider store={createStoreWithMiddleware(reducers)}>
//        <BrowserRouter>
//             <Routes />
//         </BrowserRouter>
//     </Provider>
// , document.getElementById('root'));




const persistedState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : {};

const store = createStore(
    reducers,
    persistedState,
    applyMiddleware(ReduxThunk)
  );

  store.subscribe(()=>{
    localStorage.setItem('reduxState', JSON.stringify(store.getState()))
  })


ReactDOM.render(
    <Provider store={store}>
       <BrowserRouter>
            <Routes />
        </BrowserRouter>
    </Provider>
, document.getElementById('root'));