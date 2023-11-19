# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'API::V1::Users' do
  describe 'POST /api/v1/users' do
    let(:password) { Faker::Internet.password(min_length: 8, max_length: 20, mix_case: true, special_characters: true) }
    let(:email) { Faker::Internet.email }
    let(:client_id) { create(:doorkeeper_application).uid }
    let(:do_request) { post '/api/v1/users', params: }

    context 'when valid parameters are provided' do
      let(:params) do
        {
          user: {
            email:,
            password:,
            password_confirmation: password,
            client_id:,
          },
        }
      end

      it 'creates a new user' do
        expect do
          do_request
        end.to change(User, :count).by(1)
      end

      it 'returns a successful response' do
        do_request
        expect(response).to have_http_status(:created)
      end

      it 'returns the created Doorkeeper::AccessToken' do
        do_request
        expect(response.body).to eq(
          DoorkeeperTokenSerializer.one(User.order(:created_at).last.access_tokens.first).to_json,
        )
      end
    end

    context 'when invalid parameters are provided' do # rubocop:disable RSpec/MultipleMemoizedHelpers
      let(:params) do
        {
          user: {
            email:,
            password:,
            password_confirmation: 'do not match',
            client_id:,
          },
        }
      end

      let(:error_response) do
        {
          errors: {
            password_confirmation: ["doesn't match Password"],
          },
        }
      end

      it 'does not create a new user' do
        expect do
          do_request
        end.not_to change(User, :count)
      end

      it 'returns an unprocessable entity response' do
        do_request
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it 'returns the validation errors' do
        do_request
        expect(response.body).to eq(error_response.to_json)
      end
    end
  end

  describe 'GET /api/v1/users/me' do
    context 'when a user is authenticated' do
      let(:user) { create(:user) }
      let(:client_id) { create(:doorkeeper_application).id }
      let(:access_token) { user.generate_doorkeeper_token(client_id).token }
      let(:auth_headers) do
        {
          Authorization: "Bearer #{access_token}",
        }
      end
      let(:test_response) { UserSerializer.one(user).to_json }

      it 'returns the current user' do # rubocop:disable RSpec/MultipleExpectations
        get '/api/v1/users/me', headers: auth_headers
        expect(response).to have_http_status(:ok)
        expect(response.body).to eq(test_response)
      end
    end

    context 'when a user is not authenticated' do
      it 'returns an unauthorized response' do
        get '/api/v1/users/me'
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end
