import { apiConstants } from '../_constants';
import { authConstants } from '../_constants';
import { movieService } from '../_services';

const axios = require('axios');

export const movieActions = {
	searchForMovie,
	saveMovieRating,
	updateMovieRating
}

function searchForMovie(movieQuery) {
	const apiQuery = apiConstants.OMDB_API_URL + "?apikey=" +
		apiConstants.OMDB_KEY + '&' + movieQuery;


	return axios.get(apiQuery).then(function (response) {
		if (response.data && response.data.Search) {
			return response.data.Search
		} else {
			return response.data	
		}
	  }).catch(function (error) {
	    console.log(error);
	  }); 
};	


function saveMovieRating(ratingData) {
	return dispatch => {
		movieService.createRating(ratingData).then(
			rating => {
				dispatch({ type: authConstants.CREATE_RATINGS_SUCCESS, rating });
			}
		)
	}
};	


function updateMovieRating(ratingId, ratingData) {
	return dispatch => {
		movieService.updateRating(ratingId, ratingData).then(
			rating => {
				dispatch({ type: authConstants.UPDATE_RATINGS_SUCCESS, rating });
			}
		)
	}
};	