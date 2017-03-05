Rails.application.routes.draw do
  resources :bots
  resources :tweets do
     get 'data'
  end

  root to: "tweets#index"

  post "tweets/scrape" => "tweets#scrape"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
