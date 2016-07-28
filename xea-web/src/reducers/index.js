import { combineReducers } from 'redux'
import mainSearch from './mainSearchReducer'
import {routerReducer} from 'react-router-redux'

const rootReducer = combineReducers({
  mainSearch,
  routing: routerReducer
})

export default rootReducer
