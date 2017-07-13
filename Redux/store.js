import { createStore, combineReducers } from 'redux';
import { colors, sort } from './reducers';
import { initialState } from './data'

const store = createStore(
  combineReducers({colors, sort}),
  initialState
);