# frozen_string_literal: true

class User < ApplicationRecord
  has_secure_password

  EMAIL_REGEX = /\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+/

  PASSWORD_REQUIREMENTS = /\A
    (?=.{8,})          # Must contain 8 or more characters
    (?=.*\d)           # Must contain a digit
    (?=.*[a-z])        # Must contain a lower case character
    (?=.*[A-Z])        # Must contain an upper case character
    (?=.*[[:^alnum:]]) # Must contain a symbol
  /x

  validates :email, presence: true, uniqueness: true, format: { with: EMAIL_REGEX }
  validates :password, presence: true, confirmation: true, format: { with: PASSWORD_REQUIREMENTS }
  validates :password_confirmation, presence: true

  normalizes :email, with: -> { _1.downcase.strip }
end
