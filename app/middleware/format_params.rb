class FormatParams
  def initialize(app)
    @app = app
  end

  def call(env)
    request = ActionDispatch::Request.new(env)

    request.params.deep_transform_keys!(&:underscore)

    @app.call(env)
  end
end
