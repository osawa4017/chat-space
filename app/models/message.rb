class Message < ApplicationRecord
  belongs_to :user
  belongs_to :group

  validates :text, presense: true, unless: :image?
end
