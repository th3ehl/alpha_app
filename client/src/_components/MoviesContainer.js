import React from 'react';
import { connect } from 'react-redux';
import { authActions } from '../_actions';
import { movieActions } from '../_actions';

import update from 'immutability-helper';

class MoviesContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			movieTitleQuery: '',
			movieSearchResults: [],
			moviesToShow: '',
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.renderMoviesTable = this.renderMoviesTable.bind(this);
		this.setMovieRating = this.setMovieRating.bind(this);
		this.saveOrUpdateRating = this.saveOrUpdateRating.bind(this);
		this.setUserResults = this.setUserResults.bind(this);
		this.setMovieComment = this.setMovieComment.bind(this);
		this.renderMovieSearchResults = this.renderMovieSearchResults.bind(this);
		this.renderRatedMovies = this.renderRatedMovies.bind(this);
	}

	componentDidMount() {
		const { dispatch } = this.props;
		dispatch(authActions.currentUser());
	}	

	handleChange(event) {
		this.setState({ [event.target.name]: event.target.value });
	}

	handleSubmit(event) {
		event.preventDefault();

		let self = this;
		const movieQuery = 's=' + this.state.movieTitleQuery;
		movieActions.searchForMovie(movieQuery).then(function(movies) {
			self.setState({
				movieSearchResults: movies,
				movieTitleQuery: '',
				showMovieTable: true,
				moviesToShow: 'searchResults'
			})
		})
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.authentication && 
			nextProps.authentication.currentUser &&
			!this.state.ratedMoviesFetched) {
			this.setState({ ratedMoviesFetched: true });
			const { currentUser } = nextProps.authentication;
			currentUser.user_movie_ratings.forEach((movieRating, i) => {
				const movieQuery = 'i=' + movieRating.imdbID;

				movieActions.searchForMovie(movieQuery).then(function(movie) {
					currentUser.user_movie_ratings[i].Title = movie.Title;
					currentUser.user_movie_ratings[i].Year = movie.Year;
					currentUser.user_movie_ratings[i].Poster = movie.Poster;
				});
			});
			
		}
	}

	setMovieRating(e, i) {
		e.preventDefault();
		e.stopPropagation();		

		let movieResult = Object.assign({}, this.state.movieSearchResults[i]);
		movieResult.rating = Number(e.target.value);

		let movieSearchResults = this.state.movieSearchResults.slice();
		movieSearchResults[i] = movieResult;
		this.setState({ movieSearchResults: movieSearchResults })
	}

	setMovieComment(e, i) {
		e.preventDefault();
		e.stopPropagation();		
		this.state.movieSearchResults[i].comment = e.target.value;
	}	

	saveOrUpdateRating(e, i) {
		e.preventDefault();
		e.stopPropagation();

		const { dispatch } = this.props;
		const { currentUser } = this.props.authentication;
		const movie = this.state.movieSearchResults[i];

		const ratingData = {
			user_id: currentUser.id,
			imdbID: movie.imdbID,
			rating: movie.rating,
			comment: movie.comment,
		};

		dispatch(movieActions.saveMovieRating(ratingData));
	}

	setUserResults(movieResult, currentUser) {
		const userRatings = currentUser.user_movie_ratings;

		const alreadyRated = userRatings.find(rating => {
			return rating.imdbID === movieResult.imdbID;
		})

		if (alreadyRated) {
			movieResult.user_movie_rating_pkey = alreadyRated.id;
			movieResult.rating = alreadyRated.rating;
			movieResult.comment = alreadyRated.comment;
		}

		return movieResult;
	}

	renderMovieSearchResults() {
		const defaultPoster = 'https://d994l96tlvogv.cloudfront.net/uploads/film/poster/poster-image-coming-soon-placeholder-all-logos-500-x-740_19249.png';
		const { currentUser } = this.props.authentication;

		let movieSearchResultsHtml;
		if (this.state.movieSearchResults && this.state.movieSearchResults.length) {

			movieSearchResultsHtml = this.state.movieSearchResults.map((movieResult, i) => {
				movieResult = this.setUserResults(movieResult, currentUser);

				return(
					<tr key={i}>
						<td>{movieResult.Title}</td>
						<td>{movieResult.Year}</td>
						<td>
							<img src={movieResult.Poster === 'N/A' ? defaultPoster : movieResult.Poster} />
						</td>

						<td>
							<form onSubmit={(e) => this.saveOrUpdateRating(e, i)}>
								<input type="number" 
									placeholder="Rate movie (1-10)"
									onChange={(e) => this.setMovieRating(e, i)} 
									value={movieResult.rating} />

								<input type="text" 
									placeholder="comment on movie (optional)"
									onChange={(e) => this.setMovieComment(e, i)}
									value={movieResult.comment} />

						        <input type="submit"
						        	className="form-standard__submit width__100"
						        	value="Submit" 
						        	/>	
							</form>
						</td>						
					</tr>
				)
			})
		} else {
			movieSearchResultsHtml = 
				[<tr key="0">
					<td>No results to display.</td>
				</tr>]
		}

		return(movieSearchResultsHtml);	
	}

	renderMoviesTable() {
		if (this.state.moviesToShow === 'searchResults') {
			return this.renderMovieSearchResults();
		} else if (this.state.moviesToShow === 'ratedMovies') {
			return this.renderRatedMovies();
		}
	}

	renderRatedMovies() {
		const defaultPoster = 'https://d994l96tlvogv.cloudfront.net/uploads/film/poster/poster-image-coming-soon-placeholder-all-logos-500-x-740_19249.png';
		const { currentUser } = this.props.authentication;

		let ratedMoviesHtml = currentUser.user_movie_ratings.map((movieRating, i) => {
			return(
				<tr key={i}>
					<td>{movieRating.Title}</td>
					<td>{movieRating.Year}</td>
					<td>
						<img src={movieRating.Poster === 'N/A' ? defaultPoster : movieRating.Poster} />
					</td>

					<td>
						Rating: {movieRating.rating} |
						Comment: {movieRating.comment}
					</td>						
				</tr>
			)
		})

		return(ratedMoviesHtml);	
	}

	render() {
		const { currentUser } = this.props.authentication;

		return(
			<div>
				{currentUser && 

					<div>
						<a href onClick={(e) => this.setState({moviesToShow: 'ratedMovies', showMovieTable: true})}>
							View Rated Movies {this.state.moviesToShow}
						</a>
	
						<form className="form-standard form-session"
							onSubmit={this.handleSubmit}>

							<br />
						   
						    <label>
							    <input type="text"
							    	name="movieTitleQuery"
									placeholder="Search for movie title" 
									value={this.state.movieTitleQuery} 
									onChange={this.handleChange} 
									/>

						        <br/>

						        <input type="submit"
						        	className="form-standard__submit width__100"
						        	value="Submit" 
						        	/>								
							</label>
						</form>
					</div>
				}

				{this.state.showMovieTable && 
					<table>
						<thead>
							<tr>
								<th>
									Title
								</th>

								<th>
									Year
								</th>

								<th>
									Poster
								</th>

								<th>
									Rate Movie
								</th>

							</tr>
						</thead>

						<tbody>
							{ this.renderMoviesTable() }
						</tbody>
					</table>	
				}

			</div>
		)
  	}
}

function mapStateToProps(state) {
	const { authentication } = state;

	return {
		authentication
	}
}

const connectedMoviesContainer = connect(mapStateToProps)(MoviesContainer);
export { connectedMoviesContainer as MoviesContainer };






