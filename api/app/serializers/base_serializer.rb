# frozen_string_literal: true

class BaseSerializer < Oj::Serializer
  include TypesFromSerializers::DSL

  transform_keys :camelize

  identifier :id

  attributes :id, :created_at, :updated_at

  attribute :created_at do
    send(serializer_object_name).created_at.to_i
  end

  attribute :updated_at do
    send(serializer_object_name).updated_at.to_i
  end

  private

  def serializer_object_name
    self.class.name.underscore.split('_').first
  end
end
