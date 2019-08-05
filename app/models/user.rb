class User < ApplicationRecord
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  attr_reader :password

  validates :email, presence: true, format: { with: VALID_EMAIL_REGEX }, uniqueness: { case_sensitive: false }
  validates :password, length: { minimum: 6 }, allow_nil: true
  validates :session_token, presence: true

  before_validation :refresh_session_token, on: :create
  before_save :downcase_case_insensitive_fields

  has_many :user_movie_ratings

  def password=(password_string)
    @password = password_string # for password length validation
    self.password_digest = BCrypt::Password.create(password_string)
  end

private
  def refresh_session_token
    self.session_token = SecureRandom.urlsafe_base64
  end

  def downcase_case_insensitive_fields
    email.downcase!
  end
end