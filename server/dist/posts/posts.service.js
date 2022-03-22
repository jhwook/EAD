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
const users_repository_1 = require("../users/users.repository");
const posts_repository_1 = require("./posts.repository");
let PostsService = class PostsService {
    constructor(postsRepository, usersRepository) {
        this.postsRepository = postsRepository;
        this.usersRepository = usersRepository;
    }
    async getOnePost(id) {
        const post = this.postsRepository.getOnePost(id);
        return post;
    }
    async createPost(req) {
        const { title, content, tag, img } = req.body;
        const { id } = req.user;
        const post = await this.postsRepository.create({
            writer: id,
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
    async uploadPostImg(req, param, files) {
        const { user } = req;
        const { postId } = param;
        const post = await this.postsRepository.findPostById(postId);
        if (user.username === post.writer) {
            const fileName = `posts/${files[0].filename}`;
            const newPost = await this.postsRepository.findPostAndUpdateImg(postId, fileName);
            return newPost;
        }
        throw new common_1.HttpException('작성자가 일치하지 않습니다.', 401);
    }
    async searchPost(keyword) {
        return await this.postsRepository.searchPostInDB(keyword);
    }
    async searchPostByTag(body) {
        const { tag } = body;
        return await this.postsRepository.searchPostByTag(tag);
    }
    async createComment(req, param) {
        const { content } = req.body;
        const { username } = req.user;
        const { postId } = param;
        const validatedWriter = await this.usersRepository.findUserByUsername(username);
        const validatedPost = await this.postsRepository.findPostById(postId);
        console.log(validatedPost._id);
        console.log(validatedWriter._id);
        const post = await this.postsRepository.addComment(content, validatedPost._id, validatedWriter._id);
        return post;
    }
    async modifyComment(req, param) {
        const { content } = req.body;
        const { commentId } = param;
        const newComment = await this.postsRepository.editComment(content, commentId);
        return newComment;
    }
    async deleteComment(param) {
        const { commentId } = param;
        const updatedPost = await this.postsRepository.deleteComment(commentId);
        return updatedPost;
    }
    async uploadCommentImg(req, param, files) {
        const { user } = req;
        const { commentId } = param;
        const comment = await this.postsRepository.findCommentById(commentId);
        if (user.username === comment.writer) {
            const fileName = `comments/${files[0].filename}`;
            const newComment = await this.postsRepository.findCommentAndUpdateImg(commentId, fileName);
            return newComment;
        }
        throw new common_1.HttpException('작성자가 일치하지 않습니다.', 401);
    }
    async getPostTitle() {
        const postTitles = await this.postsRepository.getTitle();
        return postTitles;
    }
};
PostsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [posts_repository_1.PostsRepository,
        users_repository_1.UsersRepository])
], PostsService);
exports.PostsService = PostsService;
//# sourceMappingURL=posts.service.js.map