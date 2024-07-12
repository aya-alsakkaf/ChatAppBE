const ChatRoom = require("../../Models/ChatRoom");
const Messages = require("../../Models/Message");
const User = require("../../Models/User");

//Get all chat rooms for a particular user
const getAllChatRooms = async (req, res, next) => {
  try {
    const foundChatRooms = await ChatRoom.find({
      participants: { $in: [req.user._id] },
    })
      .populate({
        path: "participants",
        match: { _id: { $ne: req.user._id } },
      })
      .populate("messages");
    return res.status(200).json(foundChatRooms);
  } catch (error) {
    next(error);
  }
};

//Get one chatroom between one user and another

//I can also get chatroom by the room's id.
const getChatRoom = async (req, res, next) => {
  try {
    const chatRoom = await ChatRoom.findOne({
      participants: { $all: [req.user._id, req.params.id] },
    }).populate("messages");
    if (!chatRoom)
      return res.status(404).json({ message: "Chat Room Not Found" });
    return res.status(200).json(chatRoom);
  } catch (error) {
    next(error);
  }
};

//Create a new chat room
const createChatRoom = async (req, res, next) => {
  try {
    const fromUser = await User.findById(req.user.id);
    const toUser = await User.findById(req.params.id);
    const { message } = req.body;
    const chatRoom = await ChatRoom.create({
      participants: [fromUser._id, toUser._id],
    });
    const newMessage = await Messages.create({
      from: fromUser._id,
      to: toUser._id,
      content: message,
      chatRoom: chatRoom._id,
    });
    chatRoom.messages.push(newMessage._id);
    await chatRoom.save();

    fromUser.chatRooms.push(chatRoom._id);
    await fromUser.save();
    toUser.chatRooms.push(chatRoom._id);
    await toUser.save();
    return res.status(201).json(chatRoom);
  } catch (error) {
    next(error);
  }
};

const getChatRoomByID = async (req, res, next) => {
  try {
    const chatRoom = await ChatRoom.findById(req.params.id).populate(
      "messages"
    );
    if (!chatRoom)
      return res.status(404).json({ message: "Chat Room Not Found" });
    return res.status(200).json(chatRoom);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllChatRooms,
  getChatRoom,
  createChatRoom,
  getChatRoomByID,
};
