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
exports.PostsRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const posts_schema_1 = require("./posts.schema");
const comments_schema_1 = require("./comments.schema");
let PostsRepository = class PostsRepository {
    constructor(postModel, commentModel) {
        this.postModel = postModel;
        this.commentModel = commentModel;
    }
    async getOnePost(id) {
        const post = await this.postModel.findById(id).populate('comments');
        return post;
    }
    async create(post) {
        return await this.postModel.create(post);
    }
    async findPostById(id) {
        const post = await this.postModel.findById(id);
        return post;
    }
    async findPostByIdAndUpdate(id, body) {
        const { title, content, img } = body;
        const updatedPost = await this.postModel.findByIdAndUpdate(id, {
            title,
            content,
            img,
        });
        return updatedPost;
    }
    async findPostByIdAndDelete(id) {
        const deletePost = this.postModel.findByIdAndDelete(id);
        return deletePost;
    }
    async searchPostInDB(keyword) {
        let postArray = [];
        postArray = await this.postModel
            .find({ $text: { $search: keyword } }, { score: { $meta: 'textScore' } })
            .sort({ score: { $meta: 'textScore' } });
        return postArray;
    }
    async searchPostByTag(tag) {
        let postArray = [];
        postArray = await this.postModel.find({ tag: { $all: tag } });
        return postArray;
    }
    async addComment(content, postId, id) {
        const newComment = await this.commentModel.create({
            post_id: postId,
            writer: id,
            content,
        });
        await this.postModel.findByIdAndUpdate(postId, {
            $push: { comment: { $each: [newComment._id], $position: 0 } },
        });
        const newPost = await this.postModel.findById(postId);
        return newPost;
    }
    async editComment(content, commentId) {
        await this.commentModel.findByIdAndUpdate(commentId, {
            content,
        });
        const newComment = await this.commentModel.findById(commentId);
        return newComment;
    }
    async deleteComment(commentId) {
        const comment = await this.commentModel.findById(commentId);
        if (!comment) {
            throw new common_1.HttpException('존재하지 않는 댓글입니다.', 400);
        }
        const post = await this.postModel.findById(comment.post_id);
        await this.commentModel.findByIdAndDelete(commentId);
        await this.postModel.findByIdAndUpdate(post.id, {
            $pull: { comment: commentId },
        });
        const updatedPost = await this.postModel.findById(post.id);
        return updatedPost;
    }
    async findCommentById(commentId) {
        const comment = await this.commentModel.findById(commentId);
        return comment;
    }
    async getTitle() {
        const titleArr = await this.postModel.find();
        return titleArr.map((post) => {
            return post.title;
        });
    }
    async findPostAndUpdateImg(id, fileName) {
        const post = await this.postModel.findById(id);
        post.imgUrl = `http://localhost:4000/media/${fileName}`;
        const newPost = await post.save();
        console.log(newPost);
        return newPost;
    }
    async findCommentAndUpdateImg(id, fileName) {
        const comment = await this.commentModel.findById(id);
        comment.imgUrl = `http://localhost:4000/media/${fileName}`;
        const newComment = await comment.save();
        console.log(newComment);
        return newComment;
    }
};
PostsRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(posts_schema_1.Post.name)),
    __param(1, (0, mongoose_1.InjectModel)(comments_schema_1.Comment.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], PostsRepository);
exports.PostsRepository = PostsRepository;
//# sourceMappingURL=posts.repository.js.map