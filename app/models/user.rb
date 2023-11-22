class User < ApplicationRecord
  has_secure_password

  EMAIL_REGEX = /\A\w+([\.\-+]?\w+)*@\w+([\.-]?\w+)*(\.\w{1,})+\z/

  PASSWORD_REQUIREMENTS = /\A
    (?=.{8,})          # Must contain 8 or more characters
    (?=.*\d)           # Must contain a digit
    (?=.*[a-z])        # Must contain a lower case character
    (?=.*[A-Z])        # Must contain an upper case character
    (?=.*[[:^alnum:]]) # Must contain a symbol
    .*                 # Any characters
  \z/x

  has_many :access_tokens, # rubocop:disable Rails/InverseOf
           class_name:  'Doorkeeper::AccessToken',
           foreign_key: :resource_owner_id,
           dependent:   :destroy

  validates :email, presence: true, uniqueness: true, format: { with: EMAIL_REGEX }
  validates :password, presence: true, confirmation: true, format: { with: PASSWORD_REQUIREMENTS }
  validates :password_confirmation, presence: true

  normalizes :email, with: -> { _1.downcase.strip }

  def generate_doorkeeper_token(client_id)
    Doorkeeper::AccessToken.create!(
      resource_owner_id: id,
      application_id:    client_id,
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
