module Api::V1

	class UsersController < ApiController

		def create
		    user = User.new(user_params)
		    if user.save
		      render json: user.to_json(
		      	include: [:user_movie_ratings]
		      ), location: nil, status: :ok
		    else
		      render json: user.errors.full_messages, status: 422
		    end			
		end

	private
	  	def user_params
	    	params.require(:user).permit(
	    		:email,
	    		:password,
	    		:password_digest,
	    	)
	  	end  
	end
end