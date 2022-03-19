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
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const posts_repository_1 = require("./posts.repository");
let PostsService = class PostsService {
    constructor(postsRepository) {
        this.postsRepository = postsRepository;
    }
    async createPost(req) {
        const { title, content, tag, img } = req.body;
        const { username } = req.user;
        const post = await this.postsRepository.create({
            writer: username,
            title,
            content,
            tag,
            img,
        });
        return post;
    }
    async updatePost(req, param) {
        const { postId } = param;
        await this.postsRepository.findPostByIdAndUpdate(postId, req.body);
        const updatedPost = await this.postsRepository.findPostById(postId);
        return updatedPost;
    }
    async deletePost(param) {
        const { postId } = param;
        const isExistPost = await this.postsRepository.findPostById(postId);
        if (isExistPost) {
            await this.postsRepository.findPostByIdAndDelete(postId);
        }
        else {
            throw new common_1.HttpException('존재하지 않는 포스트입니다', 400);
        }
    }
    async searchPost(body) {
        const { keyword } = body;
        return await this.postsRepository.searchPostInDB(keyword);
    }
    async searchPostByTag(body) {
        const { tag } = body;
        return await this.postsRepository.searchPostByTag(tag);
    }
};
PostsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [posts_repository_1.PostsRepository])
], PostsService);
exports.PostsService = PostsService;
//# sourceMappingURL=posts.service.js.map