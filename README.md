# アプリケーション名
ChatSpace

# アプリケーション概要
チャットアプリケーションです。
以下のような機能があります。
- deviseを用いたsignup/login機能
![chatspace_signup](https://user-images.githubusercontent.com/64793100/90398236-0c2a2a80-e0d4-11ea-9930-6c94cf173af4.png)
![chatspace_signin](https://user-images.githubusercontent.com/64793100/90398300-27953580-e0d4-11ea-9003-7479efbe129f.png)
- ユーザ編集機能
![chatspace_useredit](https://user-images.githubusercontent.com/64793100/90398922-1862b780-e0d5-11ea-84ba-3e9e8d99b10b.png)
- グループ作成編集機能
![chatspace_creategroup](https://user-images.githubusercontent.com/64793100/90399176-8313f300-e0d5-11ea-8d88-fa5258b11ab0.png)
![chatspace_editgroup](https://user-images.githubusercontent.com/64793100/90399471-f3bb0f80-e0d5-11ea-9c3d-664ef5d375ad.png)
- 複数人によるグループチャット機能(メッセージ投稿、画像投稿)
![chatspace_post](https://user-images.githubusercontent.com/64793100/90399722-61673b80-e0d6-11ea-8047-d03c4fd5d6cf.png)
- チャット相手の検索機能
- チャットグループへのユーザ招待機能
- 非同期通信によるチャットの自動更新機能

# URL
http://54.199.0.61/

# 製作背景
このアプリケーションを製作することを通して以下のことを学ぶ。
- Webサービスの開発フロー
- Githubを用いた開発のやり方
- データベースの設計方法
- Ruby on Railsを用いたアプリケーションの実装方法
- javascriptを使った動的なアプリケーションの実装方法
- WebアプリケーションをWeb上に公開する方法

# 開発環境
- Ruby (ver.2.5.1)
- Ruby on Rails (ver.5.0.7.2)
- MySQL (ver.14.14)
- unicorn
- Nginx
- capistrano
- haml
- sass
- javascript
- jquery
- git (ver.2.26.2)
- github
- AWS(EC2 S3)

# データベース設計

## ER図
![01_erd_chatspace](https://user-images.githubusercontent.com/64793100/90401936-a6d93800-e0d9-11ea-98c1-684c54fae8b1.png)

## usersテーブル
|Column|Type  |Options                               |
|------|------|--------------------------------------|
|name  |string|null: false, index: true, unique: true|
|mail  |string|null: false                           |
|pass  |string|null: false                           |

### Association
- has_many :groups, through: group_users
- has_many :messages
- has_many :group_users

## groupsテーブル
|Column|Type  |Options                               |
|------|------|--------------------------------------|
|name  |string|null: false, index: true, unique: true|

### Association
- has_many :users, through: group_users
- has_many :group_users
- has_many :messages

## group_usersテーブル
|Column  |Type   |Options                       |
|--------|-------|------------------------------|
|user_id |integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group

## messagesテーブル
|Column  |Type   |Options                       |
|--------|-------|------------------------------|
|text    |string |                              |
|image   |string |                              |
|user_id |integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group
