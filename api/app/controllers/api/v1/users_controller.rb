# frozen_string_literal: true

module Api
  module V1
    class UsersController < ApplicationController
      skip_before_action :doorkeeper_authorize!, only: %i[create]

      def create
        user = User.new(user_params.except(:client_id))
        if user.save
          client_app = Doorkeeper::Application.find_by(uid: user_params[:client_id])

          render(json: { error: 'Invalid client ID' }, status: :forbidden) unless client_app

          token = user.generate_doorkeeper_token(client_app.id)
          render json: DoorkeeperTokenSerializer.one(token), status: :created
        else
          render json: { errors: user.errors }, status: :unprocessable_entity
        end
      end

      def me
        render json: UserSerializer.one(current_user), status: :ok
      end

      private

      def user_params
        params.require(:user).permit(:client_id, :email, :password, :password_confirmation)
      end
    end
  end
end
