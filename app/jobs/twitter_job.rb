require 'twitter'

class TwitterJob < ApplicationJob
  queue_as :default

  def perform(bot)

	bot = Bot.last

	client = Twitter::REST::Client.new do |config|
		config.consumer_key        = "hM208celecZDpzxMXxIw4bDoZ"
		config.consumer_secret     = "J0wXTCOT1duScHJf5hBBEmrp1ABb3px7cy7nU7siEgbI69lA9q"
		config.access_token        = "628590046-3oAEip0LzVHiLcmuWhfCmkRwPSV8AjhF0ACiF5PQ"
		config.access_token_secret = "9fq1AxbUAYEH9YMBw2r1oSouXW38lO7gmiqJsB4iuFLHd"
    end

	client.search("to:#{bot.query}", result_type: "recent").take(bot.count).collect do |tweet|
	  puts "#{tweet.user.screen_name}: #{tweet.text}"
	  Tweet.create(
	  	url: "#{tweet.url}",
	  	screen_name: "#{tweet.user.screen_name}", 
	  	text: "#{tweet.text}", 
	  	followers_count: "#{tweet.user.followers_count}", 
	  	friends_count: "#{tweet.user.friends_count}", 
	  	country: "#{tweet.place.country_code}",
	  	location: "#{tweet.place.bounding_box.coordinates}",
	  	time_created: "#{tweet.created_at}",
	  	favorite_count: "#{tweet.favorite_count}",
	  	lang: "#{tweet.lang}",
	  	retweet_count: "#{tweet.retweet_count}",
	  	place: "#{tweet.place}",
	  	bot_id: bot.id
	  	)
	end
    # Do something later
  end
end
