import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import mainSearch from './mainSearchReducer'

const rootReducer = combineReducers({
  mainSearch,
  routing: routerReducer
})

export default rootReducer
