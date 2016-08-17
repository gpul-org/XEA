import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import mainSearch from './mainSearchReducer'
import authReducer from './authReducer'

const rootReducer = combineReducers({
  mainSearch,
  routing: routerReducer,
  form: formReducer,
  auth: authReducer
})

export default rootReducer
