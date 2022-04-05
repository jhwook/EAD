"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatsService = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("mongoose");
const rooms_model_1 = require("./models/rooms.model");
const users_schema_1 = require("../users/users.schema");
const chattings_model_1 = require("./models/chattings.model");
let ChatsService = class ChatsService {
    constructor(roomModel, userModel, chattingModel) {
        this.roomModel = roomModel;
        this.userModel = userModel;
        this.chattingModel = chattingModel;
    }
    async newChat(param, body) {
        const { roomId } = param;
        const { userId, content } = body;
        const user = await this.userModel.findById(userId);
        const comment = await this.chattingModel.create({
            user: user.username,
            content,
            room_id: roomId,
        });
        await this.roomModel.findByIdAndUpdate(roomId, {
            $push: { chatting: { $each: [comment.id] } },
        });
    }
    async getRoomList(param) {
        const { id } = param;
        const roomList = await this.roomModel.find({ users: { $all: id } });
        console.log(roomList);
        const roomNameList = [];
        for (let i = 0; i < roomList.length; i++) {
            const roomName = roomList[i].users.find((userId) => userId !== id);
            const user = await this.userModel.findById(roomName);
            const result = {
                id: roomList[i].id,
                roomName: user.username,
                image: user.imgUrl,
            };
            await roomNameList.push(result);
        }
        return roomNameList;
    }
    async makeRoom(body) {
        const { myId, yourId } = body;
        await this.roomModel.create({ users: [myId, yourId] });
    }
    async getRoomChat(param) {
        const { id } = param;
        const room = await this.roomModel.findById(id).populate('chattings');
        return room;
    }
};
ChatsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(rooms_model_1.Room.name)),
    __param(1, (0, mongoose_1.InjectModel)(users_schema_1.User.name)),
    __param(2, (0, mongoose_1.InjectModel)(chattings_model_1.Chatting.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], ChatsService);
exports.ChatsService = ChatsService;
//# sourceMappingURL=chats.service.js.map