# frozen_string_literal: true

class User < ApplicationRecord
  has_secure_password

  PASSWORD_REQUIREMENTS = /\A
    (?=.{8,})          # Must contain 8 or more characters
    (?=.*\d)           # Must contain a digit
    (?=.*[a-z])        # Must contain a lower case character
    (?=.*[A-Z])        # Must contain an upper case character
    (?=.*[[:^alnum:]]) # Must contain a symbol
  /x

  before_validation :sanitize_email, if: :will_save_change_to_email?

  validates :email, presence: true, uniqueness: true
  validates :password, presence: true, confirmation: true, format: PASSWORD_REQUIREMENTS
  validates :password_confirmation, presence: true

  class << self
    def find_for_authentication(email:)
      find_by(email:)
    end

    def authenticate(email, password)
      user = find_for_authentication(email:)
      user&.authenticate(password) ? user : nil
    end
  end

  private

  def sanitize_email
    self.email = email.downcase.strip
  end
end
