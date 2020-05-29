json.array! @users do |user|
  json.id user.id
  json.user user.name
end