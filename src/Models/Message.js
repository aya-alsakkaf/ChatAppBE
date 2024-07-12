const { Schema, model } = require("mongoose");

const messageSchema = new Schema(
  {
    from: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    to: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    chatRoom: {
      type: Schema.Types.ObjectId,
      ref: "ChatRoom",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Message", messageSchema);
