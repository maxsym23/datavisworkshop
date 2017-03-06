Rails.application.routes.draw do
  devise_for :users
  resources :bots
  resources :tweets do
     get 'data'
  end

  root to: 'landing#index'

  post "tweets/scrape" => "tweets#scrape"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
