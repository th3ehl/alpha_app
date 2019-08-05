Rails.application.routes.draw do

	namespace :api, defaults: { format: :json }  do
		namespace :v1 do 
			resources :users, only: [:create]
			resources :user_movie_ratings, only: [:create, :update]
			
			resources :sessions, only: [] do 
				collection { get :get_current_user }
			end

		end
	end

end
