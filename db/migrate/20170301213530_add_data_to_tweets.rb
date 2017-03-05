class AddDataToTweets < ActiveRecord::Migration[5.0]
  def change
  	add_column :tweets, :url, :string
  	add_column :tweets, :followers_count, :integer
  	add_column :tweets, :friends_count, :integer
  	add_column :tweets, :location, :string
  	add_column :tweets, :country, :string
  	add_column :tweets, :place, :jsonb
  	add_column :tweets, :time_created, :string
  	add_column :tweets, :favorite_count, :integer
  	add_column :tweets, :lang, :string
  	add_column :tweets, :retweet_count, :integer
  end
end
