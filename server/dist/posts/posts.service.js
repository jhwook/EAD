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
const users_repository_1 = require("../users/users.repository");
const mongoose_2 = require("mongoose");
const users_schema_1 = require("../users/users.schema");
const posts_repository_1 = require("./posts.repository");
const posts_schema_1 = require("./posts.schema");
const comments_schema_1 = require("./comments.schema");
let PostsService = class PostsService {
    constructor(postsRepository, usersRepository, postModel, commentModel, userModel) {
        this.postsRepository = postsRepository;
        this.usersRepository = usersRepository;
        this.postModel = postModel;
        this.commentModel = commentModel;
        this.userModel = userModel;
    }
    async getOnePost(id) {
        const post = await this.postModel.findById(id).populate('comments');
        return post;
    }
    async createPost(body) {
        const { id, title, content, tags, bounty } = body;
        const user = await this.userModel.findById(id);
        const post = await this.postModel.create({
            writer: user.id,
            writerName: user.username,
            title,
            content,
            tag: tags,
            bounty,
        });
        return post;
    }
    async updatePost(body, param) {
        const { id, title, content, tag, img } = body;
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
        });
        const updatedPost = await this.postModel.findById(postId);
        return updatedPost;
    }
    async deletePost(param, body) {
        const { postId } = param;
        const { id } = body;
        const post = await this.postsRepository.findPostById(postId);
        if (post.writer !== id) {
            throw new common_1.HttpException('it is not your post', 401);
        }
        if (post) {
            await this.postModel.findByIdAndDelete(postId);
            return { message: 'successfully deleted' };
        }
        else {
            throw new common_1.HttpException('존재하지 않는 포스트입니다', 400);
        }
    }
    async uploadPostImg(body, param, files) {
        const { id } = body;
        const { postId } = param;
        const post = await this.postModel.findById(postId);
        if (id === post.writer) {
            const fileName = `posts/${files[0].filename}`;
            post.imgUrl = `http://localhost:4000/media/${fileName}`;
            const newPost = await post.save();
            console.log(newPost);
            return newPost;
        }
        throw new common_1.HttpException('작성자가 일치하지 않습니다.', 401);
    }
    async searchPost(keyword) {
        if (keyword !== '') {
            let postArray = [];
            postArray = await this.postModel
                .find({ $text: { $search: keyword } }, { score: { $meta: 'textScore' } })
                .sort({ score: { $meta: 'textScore' } });
            return postArray.map((post) => {
                return { id: post.id, title: post.title, tag: post.tag };
            });
        }
        const allPost = await this.postModel.find();
        return allPost.map((post) => {
            return { id: post.id, title: post.title, tag: post.tag };
        });
    }
    async searchPostByTag(body) {
        const { tag } = body;
        let postArray = [];
        postArray = await this.postModel.find({ tag: { $all: tag } });
        return postArray;
    }
    async createComment(body, param) {
        const { id, content } = body;
        const { postId } = param;
        const user = await this.userModel.findById(id);
        const post = await this.postModel.findById(postId);
        const newComment = await this.commentModel.create({
            writerName: user.username,
            post_id: post._id,
            writer: user.id,
            content,
        });
        await this.postModel.findByIdAndUpdate(postId, {
            $push: { comment: { $each: [newComment._id], $position: 0 } },
        });
        const newPost = await this.postModel.findById(postId);
        return newPost;
    }
    async modifyComment(body, param) {
        const { id, content } = body;
        const { commentId } = param;
        await this.commentModel.findByIdAndUpdate(commentId, {
            content,
        });
        const newComment = await this.commentModel.findById(commentId);
        return newComment;
    }
    async deleteComment(param) {
        const { commentId } = param;
        const comment = await this.commentModel.findById(commentId);
        const post = await this.postModel.findById(comment.post_id);
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
    async uploadCommentImg(body, param, files) {
        const { id } = body;
        const { commentId } = param;
        const comment = await this.commentModel.findById(commentId);
        if (id === comment.writer) {
            const fileName = `comments/${files[0].filename}`;
            const comment = await this.commentModel.findById(id);
            comment.imgUrl = `http://localhost:4000/media/${fileName}`;
            const newComment = await comment.save();
            console.log(newComment);
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
    __param(2, (0, mongoose_1.InjectModel)(posts_schema_1.Post.name)),
    __param(3, (0, mongoose_1.InjectModel)(comments_schema_1.Comment.name)),
    __param(4, (0, mongoose_1.InjectModel)(users_schema_1.User.name)),
    __metadata("design:paramtypes", [posts_repository_1.PostsRepository,
        users_repository_1.UsersRepository,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], PostsService);
exports.PostsService = PostsService;
//# sourceMappingURL=posts.service.js.map