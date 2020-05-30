json.array! @messages do |message|
  json.text message.text
  json.image message.image.url
  json.created_at message.created_at.strftime("%Y年%m月%d日 %H時%M分")
  json_user_name message.user.json_user_name
  json.id message.id
end