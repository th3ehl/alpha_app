module Api::V1
	class ApiController < ApplicationController

	 	def current_user_from_token(token)
	 		token = bearer_token(request.headers['Authorization'])
	   		user = User.find_by_session_token(token)
	   		session[:session_token] = user.session_token if user
	   		user
	 	end


		def bearer_token(header)
		    pattern = /^Bearer /
		    header  = request.headers['Authorization']
		    header.gsub(pattern, '') if header && header.match(pattern)
		end	 	
	end
end