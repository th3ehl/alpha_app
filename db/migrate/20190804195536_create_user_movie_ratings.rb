class CreateUserMovieRatings < ActiveRecord::Migration[5.2]
  def change
    create_table :user_movie_ratings do |t|
    	t.integer :user_id, null: false
    	t.string :imdbID, null: false
    	t.integer :rating
    	t.text :comment
    	
    	t.timestamps
    end

    add_index :user_movie_ratings, :user_id
    add_index :user_movie_ratings, :imdbID
  end
end
