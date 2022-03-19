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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostSchema = exports.Post = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const class_validator_1 = require("class-validator");
const options = {
    timestamps: true,
};
let Post = class Post extends mongoose_2.Document {
};
__decorate([
    (0, mongoose_1.Prop)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Post.prototype, "writer", void 0);
__decorate([
    (0, mongoose_1.Prop)({ index: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], Post.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], Post.prototype, "content", void 0);
__decorate([
    (0, mongoose_1.Prop)([String]),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Array)
], Post.prototype, "tag", void 0);
__decorate([
    (0, mongoose_1.Prop)([String]),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Array)
], Post.prototype, "comment", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Post.prototype, "imgUrl", void 0);
Post = __decorate([
    (0, mongoose_1.Schema)(options)
], Post);
exports.Post = Post;
const PostSchema = mongoose_1.SchemaFactory.createForClass(Post);
exports.PostSchema = PostSchema;
PostSchema.index({ title: 'text', content: 'text' });
//# sourceMappingURL=posts.schema.js.map