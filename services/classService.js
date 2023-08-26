const roomModel = require("../models/room-model");

class roomService {
  async create(payload) {
    const { title, ownerId ,description} = payload;

    const room = await classModel.create({
      title,
      description,
      ownerId,
      speakers: [ownerId],
    });
    return room;
  }

  async getAllRooms(types) {
    const rooms = await roomModel.find({ roomType: { $in: types } })
      .populate("speakers")
      .populate("ownerId")
      .exec();
    return rooms;
  }

  async getRoom(roomId) {
    const room = await roomModel.findOne({ _id: roomId });
    return room;
  }
}

module.exports = new roomService();
