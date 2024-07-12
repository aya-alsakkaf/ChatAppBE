const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  chatRooms: [
    {
      type: Schema.Types.ObjectId,
      ref: "ChatRoom",
    },
  ],
});

module.exports = model("User", userSchema);
