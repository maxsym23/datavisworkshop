class CreateTweets < ActiveRecord::Migration[5.0]
  def change
    create_table :tweets do |t|
      t.string :screen_name
      t.string :text

      t.timestamps
    end
  end
end
