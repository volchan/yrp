# frozen_string_literal: true

# rubocop:disable Rails/Output
puts '🌱 Seeding database...'

unless User.exists?(email: 'admin@yrp.com')
  user = FactoryBot.create(:user, email: 'admin@yrp.com', password: 'Yrp-admin-2023')
  puts "Created default admin user: #{user.email}"
  puts "Password: #{user.password}"
end

unless Doorkeeper::Application.exists?(name: 'Web Client')
  app = Doorkeeper::Application.create(name: 'Web Client', redirect_uri: '', scopes: '')
  puts "📟 Created application: #{app.name}"
  puts "🆔 Application ID: #{app.uid}"
  puts "🤫 Secret: #{app.secret}"
  puts '🔒 Adding application ID and secret to .env file for vite'
  env_file_exists = File.exist?('.env')
  FileUtils.touch('.env') unless env_file_exists
  env_file_value = File.read('.env')
  env_file_value.gsub!(/VITE_CLIENT_ID=.*\n/, '')
  env_file_value.gsub!(/VITE_CLIENT_SECRET=.*\n/, '')
  env_file_value << "VITE_CLIENT_ID=#{app.uid}\n"
  env_file_value << "VITE_CLIENT_SECRET=#{app.secret}\n"
  open('.env', 'w') { |f| f.puts env_file_value }
end

puts '🗃️  Done!'
# rubocop:enable Rails/Output
