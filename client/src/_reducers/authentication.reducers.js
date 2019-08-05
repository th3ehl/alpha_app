import { authConstants } from '../_constants';

let currentUser = JSON.parse(localStorage.getItem(authConstants.CURRENT_USER));
const initialState = currentUser ? { loggedIn: true, currentUser } : {};

export function authentication(state = initialState, action) {

	switch(action.type) {

		case authConstants.REGISTER_USER_SUCCESS:
			return {
				...state,
				currentUser: action.user
			};

		case authConstants.GET_CURRENT_USER_SUCCESS:
			return {
				...state,
				currentUser: action.user
			};		

		case authConstants.CREATE_RATINGS_SUCCESS:
			currentUser.user_movie_ratings = currentUser.user_movie_ratings || [];
			currentUser.user_movie_ratings.push(action.rating);

			return {
				...state,
				currentUser: currentUser
			};		
			
		default: 
			return state;			
	}
}
