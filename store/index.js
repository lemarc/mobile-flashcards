import { createStore } from 'redux'
import reducer from './reducers'

export * from './actions'

export default createStore(reducer)