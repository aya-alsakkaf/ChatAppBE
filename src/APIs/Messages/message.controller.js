const Message = require("../../Models/Message");
const User = require("../../Models/User");
const ChatRoom = require("../../Models/ChatRoom");
const addMessage = async (req, res, next) => {
  try {
    const senderID = req.user.id;
    const { receiverID, message, chatRoomID } = req.body;
    const chatRoom = await ChatRoom.findById(chatRoomID);
    const sender = await User.findById(senderID);
    const receiver = await User.findById(receiverID);
    const newMessage = await Message.create({
      from: sender._id,
      to: receiver._id,
      content: message,
      chatRoom: chatRoom._id,
    });

    console.log(newMessage);

    chatRoom.messages.push(newMessage._id);
    await chatRoom.save();
    return res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addMessage,
};
