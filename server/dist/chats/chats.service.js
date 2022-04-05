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
let ChatsService = class ChatsService {
    constructor(roomModel) {
        this.roomModel = roomModel;
    }
    async getRoomList(param) {
        const { id } = param;
        const roomList = await this.roomModel.find({ users: { $all: id } });
        const roomNameList = roomList.map((room) => {
            const roomName = room.users.find((userId) => userId !== id);
            const result = { id: room.id, roomName };
            return result;
        });
        return roomNameList;
    }
    async makeRoom(body) {
        const { myId, yourId } = body;
        await this.roomModel.create({ users: [myId, yourId] });
    }
};
ChatsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(rooms_model_1.Room.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ChatsService);
exports.ChatsService = ChatsService;
//# sourceMappingURL=chats.service.js.map