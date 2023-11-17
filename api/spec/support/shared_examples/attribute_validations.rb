# frozen_string_literal: true

RSpec.shared_examples 'when validating attributes' do |validations|
  validations.each do |validation|
    it validation[:desc] do
      user = build(:user)
      user.password_confirmation = validation[:value] if validation[:attribute] == :password
      user.send("#{validation[:attribute]}=", validation[:value])
      user.valid?
      expect(user.errors[validation[:attribute]]).to be_present unless validation[:valid]
    end
  end
end
