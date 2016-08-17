import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'

import rootReducer from '../reducers'

export default function configureStore (initialState) {
  const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore)
  return createStoreWithMiddleware(rootReducer, initialState)
  // return createStore(rootReducer, initialState)
}
