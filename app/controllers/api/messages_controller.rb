class Api::MessagesController < ApplicationController
  def index
    # ルーティングでの設定によりparamsの中に
    # group_idというキーでグループのidが入るので
    # これを基にDBからグループを取得する
    group = Group.find(params[:group_id])
    # ajaxで送られてくる最後のメッセージのid番号を変数に代入
    last_message_id = params[:id].to_i
    # 取得したグループでのメッセージから
    # idがlast_message_idよりも
    # 新しい(大きい)メッセージのみを取得
    @messages = group.messages.includes(:user).where("id > ?", last_message_id)
  end
end