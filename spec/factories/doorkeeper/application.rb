FactoryBot.define do
  factory :doorkeeper_application, class: 'Doorkeeper::Application' do
    name { Faker::App.unique.name }
    redirect_uri { nil }
    uid { SecureRandom.hex(16) }
    secret { SecureRandom.hex(16) }
  end
end
