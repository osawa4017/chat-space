require 'rails_helper'
describe Message, type: :model do
  describe '#create' do

    context 'messageを保存できる場合' do
      it "textがあれば保存できる" do
        expect(build(:message, image: nil)).to be_valid
      end
      it "imageがあれば保存できる" do
        expect(build(:message, text: nil)).to be_valid
      end
      it "textとimageがあれば保存できる" do
        expect(build(:message)).to be_valid
      end
    end

    context 'messageを保存できない場合' do
      it "textもimageもないと保存できない" do
        message = build(:message, text: nil, image: nil)
        message.valid?
        expect(message.errors[:text]).to include("を入力してください")
      end
      it "group_idがないと保存できない" do
        message = build(:message, group_id: nil)
        message.valid?
        expect(message.errors[:group]).to include("を入力してください")
      end
      it "user_idがないと保存できない" do
        message = build(:message, user_id: nil)
        message.valid?
        expect(message.errors[:user]).to include("を入力してください")
      end
    end

  end
end