import { authHeader } from '../_helpers';
import { apiConstants } from '../_constants';

const axios = require('axios');

export const movieService = {
	createRating,
	updateRating
}

function createRating(ratingData) {
	const options = {
		method: 'POST',
		headers: authHeader(),
		url: (apiConstants.API_QUERY_PREFIX + '/user_movie_ratings'),
		data: { user_movie_ratings: ratingData },
	}

	return axios(options).then(function(resp) {
		return resp.data;
	}).catch(function(error) {
		return { error: error.response.data }
	});
}


function updateRating(ratingId, ratingData) {
	const options = {
		method: 'PUT',
		headers: authHeader(),
		url: (apiConstants.API_QUERY_PREFIX + '/user_movie_ratings/' + ratingId),
		data: { user_movie_ratings: ratingData },
	}

	return axios(options).then(function(resp) {
		return resp.data;
	}).catch(function(error) {
		return { error: error.response.data }
	});
}
