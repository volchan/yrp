Rails.logger.info '🔎 Validating environment'
DotenvValidator.check!
Rails.logger.info '✅ Environment is valid'
