class AddIndexToTweets < ActiveRecord::Migration[5.0]
  def change
  	add_reference :tweets, :bot, index: true
  end
end
