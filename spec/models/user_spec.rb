require 'rails_helper'

RSpec.describe User do
  subject { build(:user) }

  it 'has a valid factory' do
    expect(build(:user)).to be_valid
  end

  it { is_expected.to have_secure_password }

  it 'normalizes emails' do
    user = build(:user, email: 'EmailWithCAPS@gmail.com')
    expect(user.email).to eq('emailwithcaps@gmail.com')
  end

  it { is_expected.to validate_presence_of(:email) }
  it { is_expected.to validate_uniqueness_of(:email).case_insensitive }

  it { is_expected.to validate_presence_of(:password) }
  it { is_expected.to validate_confirmation_of(:password) }
  it { is_expected.to validate_presence_of(:password_confirmation) }

  it { expect(described_class::PASSWORD_REQUIREMENTS).to be_a(Regexp) }

  validations = [
    {
      attribute: :email,
      desc:      'is valid when email is test@gmail.com',
      value:     'test@gmail.com',
      valid:     true,
    },
    {
      attribute: :email,
      desc:      'is valid when email is test.test@gmail.com',
      value:     'test.test@gmail.com',
      valid:     true,
    },
    {
      attribute: :email,
      desc:      'is valid when email is test+test@gmail.com',
      value:     'test+test@gmail.com',
      valid:     true,
    },
    {
      attribute: :email,
      desc:      'is invalid when email is a string',
      value:     'not_an_email',
      valid:     false,
    },
    {
      attribute: :email,
      desc:      'is valid when email is test.test@gmail.com',
      value:     'test test@gmail.com',
      valid:     true,
    },
    {
      attribute: :email,
      desc:      'is invalid when email is not_an_email.gmail.com',
      value:     'not_an_email.gmail.com',
      valid:     false,
    },
    {
      attribute: :email,
      desc:      'is invalid when email is @gmail.com',
      value:     '@gmail.com',
      valid:     false,
    },
    {
      attribute: :email,
      desc:      'is invalid when email is qyzudg$@gmail.com',
      value:     'qyzudg$@gmail.com',
      valid:     false,
    },
    {
      attribute: :password,
      desc:      'is valid when password complies with User::PASSWORD_REQUIREMENTS',
      value:     'aB1$cdefg',
      valid:     true,
    },
    {
      attribute: :password,
      desc:      'is invalid when password is too short',
      value:     'aB1$',
      valid:     false,
    },
    {
      attribute: :password,
      desc:      'is invalid when password does not contain a digit',
      value:     'aBc$defg',
      valid:     false,
    },
    {
      attribute: :password,
      desc:      'is invalid when password does not contain a lower case character',
      value:     'AB1$CDEFG',
      valid:     false,
    },
    {
      attribute: :password,
      desc:      'is invalid when password does not contain an upper case character',
      value:     'ab1$cdefg',
      valid:     false,
    },
    {
      attribute: :password,
      desc:      'is invalid when password does not contain a symbol',
      value:     'ab1cdefg',
      valid:     false,
    },
  ]

  include_examples 'when validating attributes', validations
end
