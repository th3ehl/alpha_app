module Api::V1

	class UserMovieRatingsController < ApiController

		def create
		    user_movie_rating = UserMovieRating.new(user_movie_ratings_params)
		    if user_movie_rating.save
		      render json: user_movie_rating, location: nil, status: :ok
		    else
		      render json: user_movie_rating.errors.full_messages, status: 422
		    end	
		end	

	private
	  	def user_movie_ratings_params
	    	params.require(:user_movie_ratings).permit(
	    		:user_id,
	    		:imdbID,
	    		:rating,
	    		:comment
	    	)
	  	end  
	end
end