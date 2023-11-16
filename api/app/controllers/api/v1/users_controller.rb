# frozen_string_literal: true

module Api
  module V1
    class UsersController < ApplicationController
      skip_before_action :doorkeeper_authorize!, only: %i[create]

      def create
        user = User.new(user_params)
        if user.save
          client_app = Doorkeeper::Application.find_by(uid: params[:client_id])

          render(json: { error: 'Invalid client ID' }, status: :forbidden) unless client_app

          token = generate_doorkeeper_token(user, client_app)
          render json: { access_token: DoorkeeperTokenSerializer.one(token) }
        else
          render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def me
        render json: { user: UserSerializer.one(current_user) }
      end

      private

      def user_params
        params.require(:user).permit(:email, :password, :password_confirmation)
      end

      def generate_doorkeeper_token(user, client_app)
        Doorkeeper::AccessToken.create!(
          resource_owner_id: user.id,
          application_id:    client_app.id,
          refresh_token:     generate_refresh_token,
          expires_in:        Doorkeeper.configuration.access_token_expires_in.to_i,
          scopes:            '',
        )
      end

      def generate_refresh_token
        loop do
          token = SecureRandom.hex(32)
          break token unless Doorkeeper::AccessToken.exists?(refresh_token: token)
        end
      end
    end
  end
end
