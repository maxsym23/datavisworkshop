#json.array! @tweets, partial: 'tweets/tweet', as: :tweet


json.tweets @tweets do |document| 
	json.(document, :id, :screen_name, :text, :created_at)
end


