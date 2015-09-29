import { SET_VISIBILITY_FILTER,VisibilityFilters } from '../actions/user';
import { combineReducers } from 'redux';
const { SHOW_ALL } = VisibilityFilters;

function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
  case SET_VISIBILITY_FILTER:
    return action.filter;
  default:
    return state;
  }
}

const userApp = combineReducers({
  visibilityFilter
});

export default userApp;