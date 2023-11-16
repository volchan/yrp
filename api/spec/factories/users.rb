# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    email { Faker::Internet.unique.email }
    password do
      Faker::Internet.unique.password(min_length: 8, max_length: 20, mix_case: true, special_characters: true)
    end
    password_confirmation { password }
  end
end
