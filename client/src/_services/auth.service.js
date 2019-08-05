import { authHeader } from '../_helpers';
import { authConstants } from '../_constants';
import { apiConstants } from '../_constants';

const axios = require('axios');

export const authService = {
	register,
	currentUser,
}

function register(userData) {
	const options = {
		method: 'POST',
		headers: authHeader(),
		url: (apiConstants.API_QUERY_PREFIX + '/users'),
		data: userData,
	}

	return axios(options).then(function(resp) {
		setCurrentUserLocalStorage(resp.data)
		return resp.data;
	}).catch(function(error) {
		return { error: error.response.data }
	});
}

function currentUser() {
	const options = {
		method: 'GET',
		headers: authHeader(),
		url: (apiConstants.API_QUERY_PREFIX + '/sessions/get_current_user'),
	}

	return axios(options).then(function(resp) {
		return resp.data;
	}).catch(function(error) {
		return { error: error.response.data }
	});
}


function setCurrentUserLocalStorage(userData) {
	localStorage.setItem(authConstants.CURRENT_USER, JSON.stringify(userData));
}