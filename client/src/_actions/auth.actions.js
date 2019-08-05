import { authConstants } from '../_constants';
import { authService } from '../_services';

export const authActions = {
	register,
	currentUser,
}


function register(userData) {
	return dispatch => {
		authService.register(userData).then( 
			user => {
				dispatch({ type: authConstants.REGISTER_USER_SUCCESS, user });
			},
			error => {
				dispatch({ type: authConstants.REGISTER_USER_FAILURE, error });
			}
		)
	};
};

function currentUser() {
	return dispatch => {
		authService.currentUser().then( 
			user => {
				dispatch({ type: authConstants.GET_CURRENT_USER_SUCCESS, user });
			},
			error => {
				dispatch({ type: authConstants.GET_CURRENT_USER_FAILURE });
			}
		)
	};	
}