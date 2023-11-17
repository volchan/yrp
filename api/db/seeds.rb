# frozen_string_literal: true

# rubocop:disable Rails/Output
puts '🌱 Seeding database...'

unless User.exists?(email: 'yrp.dev@gmail.com')
  user = FactoryBot.create(:user, email: 'yrp.dev@gmail.com', password: 'Yrp-dev@123')
  puts "🧑‍💻 Created user: #{user.id}"
  puts "✉️  Email: #{user.email}"
  puts "🔒 Password: #{user.password}"
end

unless Doorkeeper::Application.exists?(name: 'Web Client')
  app = Doorkeeper::Application.create(name: 'Web Client', redirect_uri: '', scopes: '')
  puts "📟 Created application: #{app.name}"
  puts "🆔 Application ID: #{app.uid}"
  puts "🤫 Secret: #{app.secret}"
end

puts '🗃️  Done!'
# rubocop:enable Rails/Output
