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
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const users_schema_1 = require("../users/users.schema");
const posts_schema_1 = require("./posts.schema");
const comments_schema_1 = require("./comments.schema");
let PostsService = class PostsService {
    constructor(postModel, commentModel, userModel) {
        this.postModel = postModel;
        this.commentModel = commentModel;
        this.userModel = userModel;
    }
    async getOnePost(id) {
        const post = await this.postModel.findById(id).populate('comments');
        return post;
    }
    async createPost(body) {
        const { id, title, content, tag, bounty } = body;
        const user = await this.userModel.findById(id);
        const post = await this.postModel.create({
            writer: user.id,
            writerImg: user.imgUrl,
            writerName: user.username,
            title,
            content,
            tag,
            bounty,
        });
        return post;
    }
    async updatePost(body, param) {
        const { id, title, content, tag, img, bounty } = body;
        const { postId } = param;
        const post = await this.postModel.findById(postId);
        if (post.writer !== id) {
            throw new common_1.HttpException('you are not post owner', 401);
        }
        await this.postModel.findByIdAndUpdate(postId, {
            title,
            content,
            img,
            tag,
            bounty,
        });
        const updatedPost = await this.postModel.findById(postId);
        return updatedPost;
    }
    async deletePost(param, body) {
        const { postId } = param;
        const { id } = body;
        const post = await this.postModel.findById(postId);
        if (post.writer !== id) {
            throw new common_1.HttpException('it is not your post', 401);
        }
        if (post) {
            for (let i = 0; i < post.comment.length; i++) {
                await this.commentModel.findByIdAndDelete(post.comment[i]);
            }
            await this.postModel.findByIdAndDelete(postId);
            return { message: 'successfully deleted' };
        }
        else {
            throw new common_1.HttpException('존재하지 않는 포스트입니다', 400);
        }
    }
    async uploadPostImg(files) {
        const fileName = `posts/${files[0].filename}`;
        const imgUrl = `http://localhost:4000/media/${fileName}`;
        return imgUrl;
    }
    async searchPost(keyword) {
        const postArray = await this.postModel.find();
        return postArray.filter((post) => {
            if (post.title.includes(keyword)) {
                return { id: post.id, title: post.title, tag: post.tag };
            }
        });
    }
    async searchPostByTag(body) {
        const { tag } = body;
        let postArray = [];
        postArray = await this.postModel.find({ tag: { $all: tag } });
        return postArray;
    }
    async createComment(body, param) {
        const { id, content, title } = body;
        const { postId } = param;
        const user = await this.userModel.findById(id);
        const post = await this.postModel.findById(postId);
        const newComment = await this.commentModel.create({
            writerImg: user.imgUrl,
            writerName: user.username,
            post_id: post._id,
            writer: user.id,
            title,
            content,
        });
        await this.postModel.findByIdAndUpdate(postId, {
            $push: { comment: { $each: [newComment._id], $position: 0 } },
        });
        const newPost = await this.postModel.findById(postId);
        return newPost;
    }
    async modifyComment(body, param) {
        const { content, title } = body;
        const { commentId } = param;
        await this.commentModel.findByIdAndUpdate(commentId, {
            content,
            title,
        });
        const newComment = await this.commentModel.findById(commentId);
        return newComment;
    }
    async deleteComment(param) {
        const { commentId } = param;
        const comment = await this.commentModel.findById(commentId);
        const postId = String(comment.post_id);
        const post = await this.postModel.findById(postId);
        if (!comment) {
            throw new common_1.HttpException('존재하지 않는 댓글입니다.', 400);
        }
        await this.commentModel.findByIdAndDelete(commentId);
        await this.postModel.findByIdAndUpdate(post.id, {
            $pull: { comment: commentId },
        });
        const updatedPost = await this.postModel.findById(post.id);
        return updatedPost;
    }
    async getOneComment(param) {
        const { commentId } = param;
        const comment = await this.commentModel.findById(commentId);
        return comment;
    }
    async uploadCommentImg(files) {
        const fileName = `comments/${files[0].filename}`;
        const imgUrl = `http://localhost:4000/media/${fileName}`;
        return imgUrl;
    }
    async getPostTitle() {
        const titleArr = await this.postModel.find({});
        const postTitles = titleArr.map((post) => {
            return { id: post.id, title: post.title, tag: post.tag };
        });
        return postTitles;
    }
    async getOnePostContent(id) {
        const post = await this.postModel.findById(id);
        let result = [];
        const commentArr = post.comment;
        for (let i = 0; i < commentArr.length; i++) {
            let comment = await this.commentModel.findById(commentArr[i]);
            result.push(comment);
        }
        const content = post.content;
        return [{ content: content }];
    }
    async getMyPost(body) {
        const { id } = body;
        const mypost = await this.postModel.find({ writer: id });
        return mypost;
    }
    async getMyComment(body) {
        const { id } = body;
        const mycomment = await this.commentModel.find({ writer: id });
        return mycomment;
    }
    async selectComment(body) {
        const { myId, yourId, postId, commentId } = body;
        const post = await this.postModel.findById(postId);
        await this.userModel.findByIdAndUpdate(myId, {
            $inc: { money: -1 * post.bounty },
        });
        await this.userModel.findByIdAndUpdate(yourId, {
            $inc: { money: post.bounty },
        });
        await this.postModel.findByIdAndUpdate(postId, { selection: true });
        await this.commentModel.findByIdAndUpdate(commentId, { selection: true });
    }
};
PostsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(posts_schema_1.Post.name)),
    __param(1, (0, mongoose_1.InjectModel)(comments_schema_1.Comment.name)),
    __param(2, (0, mongoose_1.InjectModel)(users_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], PostsService);
exports.PostsService = PostsService;
//# sourceMappingURL=posts.service.js.map