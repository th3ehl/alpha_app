module Api::V1

	class SessionsController < ApiController

		def get_current_user
		    curr_user = current_user_from_token(request.headers['Authorization'])

		    render json: curr_user.to_json(
		    	include: [:user_movie_ratings]
		    ) 
		end

	end

end