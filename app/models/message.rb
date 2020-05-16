class Message < ApplicationRecord
  belongs_to :user
  belongs_to :group

  validates :text, presense: true, unless: :image?

  mount_uploader :image, ImageUploader
end
