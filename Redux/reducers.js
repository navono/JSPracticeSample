import C from './constants';

export const color = (state={}, action) => {
  switch (action.type) {
  case C.ADD_COLORS:
    return {
      id: action.id,
      title: action.title,
      color: action.color,
      timestamp: action.timestamp,
      rating: 0
    };

  case C.RATE_COLORS:
    return state.id !== action.id ?
      state :
      {
        ...state,
        rating: action.rating
      }

  default:
    return state;
  }
}

// 用来管理整个colors分支
export const colors = (state=[], action) => {
  switch (action.type) {
  case C.ADD_COLORS:
    return [
      ...state,
      color({}, action)
    ];

  case C.RATE_COLORS:
    return state.map(c => color(c, action));
  
  case C.REMOVE_COLORS:
    return state.filter(c => c.id !== action.id);

  default:
    return state;
  }
}

export const sort = (state='SORT_BY_DATE', action) => {
  switch (action.type) {
  case C.SORT_COLORS:
    return action.sortBy;
      
  default:
    state;
  }
}