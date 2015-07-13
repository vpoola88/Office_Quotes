class Character < ActiveRecord::Base
  has_many :quotes
  accepts_nested_attributes_for :quotes
end
