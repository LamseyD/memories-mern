import { combineReducers } from 'redux'

import posts from './posts'
import auth from './auth'
//combine reducers here into states for redux store
export default combineReducers({
    posts, auth
})