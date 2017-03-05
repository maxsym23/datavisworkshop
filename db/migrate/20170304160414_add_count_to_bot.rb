class AddCountToBot < ActiveRecord::Migration[5.0]
  def change
  	add_column :bots, :count, :integer
  end
end
