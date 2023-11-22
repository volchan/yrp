class DoorkeeperTokenSerializer < Oj::Serializer
  transform_keys :camelize

  attributes :expires_in, :refresh_token

  attribute :access_token do
    doorkeeper_token.token
  end

  attribute :token_type do
    'Bearer'
  end

  attribute :created_at do
    doorkeeper_token.created_at.to_i
  end
end
