import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import mainSearch from './mainSearchReducer'

const rootReducer = combineReducers({
  mainSearch,
  routing: routerReducer,
  form: formReducer
})

export default rootReducer
