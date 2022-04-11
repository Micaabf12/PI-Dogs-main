// import { createStore, applyMiddleware, compose } from 'redux';
// import thunk from 'redux-thunk';
// import rootReducer from '../reducer';

// // const composeEnhancers = (typeof window !== 'undefined' && window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_) || compose;

// // const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

// const store = createStore(
//     rootReducer,
//     compose(
//         applyMiddleware(thunk), 
//         window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//     )
// );

// export default store;