import rootReducer from './reducers/rootReducer'
import { createStore, compose, applyMiddleware } from 'redux'
// import { createWrapper, HYDRATE } from 'next-redux-wrapper'
import thunk from 'redux-thunk'

const middleware = [thunk]

const composeEnhancers =
  (typeof window != 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose

  export const reduxStore = createStore(rootReducer,
    applyMiddleware(thunk));
// create a makeStore function
// const initStore = () =>
//   createStore(
//     rootReducer,
//     compose(composeEnhancers(applyMiddleware(...middleware))),
//   )

export default reduxStore;
