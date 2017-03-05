json.extract! tweet, :id, :screen_name, :text, :created_at, :updated_at
json.url tweet_url(tweet, format: :json)
