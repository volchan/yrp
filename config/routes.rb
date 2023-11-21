# frozen_string_literal: true

Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get :health, to: 'rails/health#show', as: :rails_health_check

  # Defines the root path route ("/")
  root to: 'home#index'

  scope :api do
    scope :v1 do
      use_doorkeeper do
        skip_controllers :authorizations, :applications, :authorized_applications
      end
    end
  end

  namespace :api do
    namespace :v1 do
      resources :users, only: %i[create]
      resource :users, only: [] do
        get :me
      end
    end
  end

  # Defines the catch-all route that renders the React app.
  match '*path', to: 'home#index', via: :all
end
