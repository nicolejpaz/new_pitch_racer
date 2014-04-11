NewPitchRacer::Application.routes.draw do
  root 'games#index'

  resources :games
end
