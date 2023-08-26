const RoomDto = require("../dtos/room-dto");
const roomsService = require("../services/rooms-service");

class classController {
  async create(req, res) {
    const { topic, roomType,type } = req.body;


    if (!title || !description) {
      return res.status(400).json({ message: "All feilds are required !" });
    }

    const room = await roomsService.create({
        topic,
        roomType,
        type,
        ownerId: req.user._id,
    });

    return res.json(new RoomDto(room));
  }

  async index(req, res) {
    const rooms = await roomsService.getAllRooms(['open','socal']);
    const allRooms = rooms.map((room) => new RoomDto(room));
    res.json(allRooms);
  }

  async show(req, res){
    const room = await roomsService.getRoom(req.params.roomId);
    return room;
  }
}

module.exports = new classController();
