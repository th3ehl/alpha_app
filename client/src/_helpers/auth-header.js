import { authConstants } from '../_constants';

export function authHeader() {
	let currentUser = JSON.parse(localStorage.getItem(authConstants.CURRENT_USER));

	if (currentUser && currentUser.session_token) {
		return { 'Authorization': 'Bearer ' + currentUser.session_token };
	} else {
		return {};
	}
}