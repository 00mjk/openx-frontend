import {TYPES} from "./actionTypes";

const initialState = {
	user: {
		created: false,
		isLoading: false,
		error: null,
		authorized: false,
		items: [],
	},
	investor: {
		created: false,
		isLoading: false,
		error: null,
		authorized: false,
		items: [],
	},
	recipient: {
		created: false,
		isLoading: false,
		error: null,
		authorized: false,
		items: [],
	}
};

const userAccountReducer = (state = initialState, action) => {
  switch (action.type) {
		case action.entity && TYPES[action.entity].REGISTER_SUCCESS:
      return {
      	...state,
				[action.entity]: {
					...state[action.entity],
					created: true,
					authorized: true,
				}
      };
    case action.entity && TYPES[action.entity].REGISTER_FAILURE:
      return {
        ...state,
				[action.entity]: {
					...state[action.entity],
					isLoading: false,
					error: action.payload,
					authorized: false,
				}
			};
		case action.entity && TYPES[action.entity].VALIDATE:
			return {
				...state,
				[action.entity]: {
					...state[action.entity],
					isLoading: true,
				}
			};
		case action.entity && TYPES[action.entity].VALIDATE_SUCCESS:
      return {
      	...state,
				[action.entity]: {
					...state[action.entity],
					items: action.payload,
					isLoading: false,
					error: null,
					authorized: true
				}
      };
    case action.entity && TYPES[action.entity].VALIDATE_FAILURE:
      return {
        ...state,
				[action.entity]: {
					...state[action.entity],
					isLoading: false,
					error: action.payload,
					authorized: false,
				}
			};
    case TYPES.UPDATE:
      return {
				...state,
				[action.entity]: {
					...state[action.entity],
					isLoading: true,
				}
      };
		case action.entity && TYPES[action.entity].UPDATE_SUCCESS:
      return {
				...state,
				[action.entity]: {
					...state[action.entity],
					isLoading: false
				}
      };
		case action.entity && TYPES[action.entity].UPDATE_FAILURE:
      return {
				...state,
				[action.entity]: {
					...state[action.entity],
					error: action.payload,
					isLoading: false,
				}
      };
		case TYPES.LOGOUT:
			return {
				user: {
					items: [],
					isLoading: false,
					error: null,
					authorized: false,
					created: false,
				},
				investor: {
					created: false,
					isLoading: false,
					error: null,
					authorized: false,
					items: [],
				},
				recipient: {
					created: false,
					isLoading: false,
					error: null,
					authorized: false,
					items: [],
				}
			};
		default:
      return state;
  }
};

export default userAccountReducer;
