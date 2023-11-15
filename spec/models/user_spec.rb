# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User do
  subject { build(:user) }

  it 'has a valid factory' do
    expect(build(:user)).to be_valid
  end

  it { is_expected.to have_secure_password }

  describe 'validations' do
    it { is_expected.to validate_presence_of(:email) }
    it { is_expected.to validate_uniqueness_of(:email).case_insensitive }

    it { is_expected.to validate_presence_of(:password) }
    it { is_expected.to validate_confirmation_of(:password) }
    it { is_expected.to validate_presence_of(:password_confirmation) }

    describe 'password requirements' do
      it 'is valid when password complies with User.PASSWORD_REQUIREMENTS' do
        user = build(:user, password: 'aB1$cdefg')
        expect(user).to be_valid
      end

      it 'is invalid when password is too short' do
        user = build(:user, password: 'aB1$')
        user.valid?
        expect(user.errors[:password]).to include('is invalid')
      end

      it 'is invalid when password does not contain a digit' do
        user = build(:user, password: 'aBc$defg')
        user.valid?
        expect(user.errors[:password]).to include('is invalid')
      end

      it 'is invalid when password does not contain a lower case character' do
        user = build(:user, password: 'AB1$CDEFG')
        user.valid?
        expect(user.errors[:password]).to include('is invalid')
      end

      it 'is invalid when password does not contain an upper case character' do
        user = build(:user, password: 'ab1$cdefg')
        user.valid?
        expect(user.errors[:password]).to include('is invalid')
      end

      it 'is invalid when password does not contain a symbol' do
        user = build(:user, password: 'ab1cdefg')
        user.valid?
        expect(user.errors[:password]).to include('is invalid')
      end
    end
  end
end
