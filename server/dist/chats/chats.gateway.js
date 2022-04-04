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
let ChatsGateway = class ChatsGateway {
    constructor(chattingModel, roomModel) {
        this.chattingModel = chattingModel;
        this.roomModel = roomModel;
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
    handleEnterRoom(data, socket) {
        console.log(socket.rooms);
        console.log(data);
        socket.join(data);
        socket.to(data).emit('welcome', data);
        return data;
    }
    handleMakeRoom(room, socket) {
        socket.to(room).emit('bye', room);
    }
    handleSubmitChat(data, socket) {
        const [message, room, myUsername] = data;
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
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], ChatsGateway.prototype, "handleMakeRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('new_message'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], ChatsGateway.prototype, "handleSubmitChat", null);
ChatsGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(),
    __param(0, (0, mongoose_1.InjectModel)(chattings_model_1.Chatting.name)),
    __param(1, (0, mongoose_1.InjectModel)(rooms_model_1.Room.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], ChatsGateway);
exports.ChatsGateway = ChatsGateway;
//# sourceMappingURL=chats.gateway.js.map