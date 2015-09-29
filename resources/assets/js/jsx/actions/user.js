/*
 * action types
 */
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

/*
 * other constants
 */
export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
};


export function setShowActive () {
	return {
		type: 'SHOW_ACTIVE'
	}
}

/*
 * action creators
 */
export function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter };
}