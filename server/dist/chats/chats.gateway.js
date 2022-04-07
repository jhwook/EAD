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
exports.ChatsGateway = void 0;
const common_1 = require("@nestjs/common");
const socket_io_1 = require("socket.io");
const websockets_1 = require("@nestjs/websockets");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const chattings_model_1 = require("./models/chattings.model");
const rooms_model_1 = require("./models/rooms.model");
const users_schema_1 = require("../users/users.schema");
let ChatsGateway = class ChatsGateway {
    constructor(chattingModel, roomModel, userModel) {
        this.chattingModel = chattingModel;
        this.roomModel = roomModel;
        this.userModel = userModel;
        this.logger = new common_1.Logger('chat');
        this.logger.log('constructor');
    }
    afterInit() {
        this.logger.log('init');
    }
    handleDisconnect(socket) {
        this.logger.log(`disconnected : ${socket.id} ${socket.nsp.name}`);
    }
    handleConnection(socket) {
        this.logger.log(`connected : ${socket.id} ${socket.nsp.name}`);
    }
    async handleMakeRoom(data) {
        const [myId, yourId] = data;
        const userI = await this.userModel.findById(myId);
        const isExistRoom = await this.roomModel.find({ users: [myId, yourId] });
        if (isExistRoom.length === 0) {
            const room = await this.roomModel.create({ users: [myId, yourId] });
            const chat = await this.chattingModel.create({
                room_id: room.id,
                user: userI.username,
                content: `${userI.username}님이 채팅을 요청했습니다.`,
                userImg: userI.imgUrl,
            });
            await this.roomModel.findByIdAndUpdate(room.id, {
                $push: { chatting: { $each: [chat.id], $position: 0 } },
            });
            return room.id;
        }
        return isExistRoom[0].id;
    }
    handleEnterRoom(data, socket) {
        socket.join(data);
        socket.to(data).emit('welcome', data);
        return data;
    }
    async handleExitRoom(data) {
        const [room, roomId, userId] = data;
        const user = await this.userModel.findById(userId);
        const roomInfo = await this.roomModel.findById(roomId);
        if (roomInfo.users.length > 1) {
            const chat = await this.chattingModel.create({
                room_id: roomId,
                user: user.username,
                content: `${user.username}님이 채팅방을 떠났습니다.`,
                userImg: user.imgUrl,
            });
            await this.roomModel.findByIdAndUpdate(roomInfo.id, {
                $push: { chatting: { $each: [chat.id], $position: 0 } },
            });
            await this.roomModel.findByIdAndUpdate(roomInfo.id, {
                $pull: { users: user.id },
            });
            await this.roomModel.findByIdAndUpdate(roomInfo.id, {
                leftUser: userId,
            });
        }
        else {
            for (let i = 0; i < roomInfo.chatting.length; i++) {
                await this.chattingModel.findByIdAndDelete(roomInfo.chatting[i]);
            }
            await this.roomModel.findByIdAndDelete(roomId);
        }
        return room;
    }
    async handleSubmitChat(data, socket) {
        const [message, room, roomId, myUsername] = data;
        const myUser = await this.userModel.findOne({ username: myUsername });
        const chat = await this.chattingModel.create({
            user: myUsername,
            content: message,
            room_id: roomId,
            userImg: myUser.imgUrl,
        });
        await this.roomModel.findByIdAndUpdate(roomId, {
            $push: { chatting: { $each: [chat.id], $position: 0 } },
        });
        socket.to(room).emit('new_message', `${myUsername}: ${message}`);
        return message;
    }
};
__decorate([
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], ChatsGateway.prototype, "handleDisconnect", null);
__decorate([
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], ChatsGateway.prototype, "handleConnection", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(`make_room`),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ChatsGateway.prototype, "handleMakeRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('enter_room'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], ChatsGateway.prototype, "handleEnterRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('bye'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChatsGateway.prototype, "handleExitRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('new_message'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], ChatsGateway.prototype, "handleSubmitChat", null);
ChatsGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(),
    __param(0, (0, mongoose_1.InjectModel)(chattings_model_1.Chatting.name)),
    __param(1, (0, mongoose_1.InjectModel)(rooms_model_1.Room.name)),
    __param(2, (0, mongoose_1.InjectModel)(users_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], ChatsGateway);
exports.ChatsGateway = ChatsGateway;
//# sourceMappingURL=chats.gateway.js.map