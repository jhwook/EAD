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
exports.PostsController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const aws_service_1 = require("../aws.service");
const auth_service_1 = require("../auth/auth.service");
const http_exception_filter_1 = require("../common/exceptions/http-exception.filter");
const success_interceptor_1 = require("../common/interceptors/success.interceptor");
const posts_service_1 = require("./posts.service");
let PostsController = class PostsController {
    constructor(postsService, authService, awsService) {
        this.postsService = postsService;
        this.authService = authService;
        this.awsService = awsService;
    }
    createPost(body) {
        return this.postsService.createPost(body);
    }
    getPostTitle() {
        return this.postsService.getPostTitle();
    }
    searchPost(keyword) {
        console.log(keyword);
        return this.postsService.searchPost(keyword);
    }
    searchPostByTag(body) {
        return this.postsService.searchPostByTag(body);
    }
    getMyPost(body) {
        return this.postsService.getMyPost(body);
    }
    getMyComment(body) {
        return this.postsService.getMyComment(body);
    }
    async getOnePostContent(id) {
        return this.postsService.getOnePostContent(id);
    }
    async getOnePost(id) {
        return this.postsService.getOnePost(id);
    }
    updatePost(body, param) {
        return this.postsService.updatePost(body, param);
    }
    deletePost(param, body) {
        return this.postsService.deletePost(param, body);
    }
    createComment(body, param) {
        return this.postsService.createComment(body, param);
    }
    modifyComment(body, param) {
        return this.postsService.modifyComment(body, param);
    }
    deleteComment(param) {
        return this.postsService.deleteComment(param);
    }
    getOneComment(param) {
        return this.postsService.getOneComment(param);
    }
    async uploadPostImage(file) {
        console.log(file);
        const result = await this.awsService.uploadFileToS3('posts', file);
        const imgUrl = await this.awsService.getAwsS3FileUrl(result.key);
        return imgUrl;
    }
    async uploadCommentImage(file) {
        console.log(file);
        const result = await this.awsService.uploadFileToS3('comments', file);
        const imgUrl = await this.awsService.getAwsS3FileUrl(result.key);
        return imgUrl;
    }
    selectComment(body) {
        return this.postsService.selectComment(body);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "createPost", null);
__decorate([
    (0, common_1.Post)('/title'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "getPostTitle", null);
__decorate([
    (0, common_1.Post)('/search'),
    __param(0, (0, common_1.Query)('keyword')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "searchPost", null);
__decorate([
    (0, common_1.Post)('/search/tag'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "searchPostByTag", null);
__decorate([
    (0, common_1.Post)('/mypost'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "getMyPost", null);
__decorate([
    (0, common_1.Post)('/mycomment'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "getMyComment", null);
__decorate([
    (0, common_1.Get)('/:postId/content'),
    __param(0, (0, common_1.Param)('postId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "getOnePostContent", null);
__decorate([
    (0, common_1.Get)('/:postId'),
    __param(0, (0, common_1.Param)('postId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "getOnePost", null);
__decorate([
    (0, common_1.Patch)('/:postId'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "updatePost", null);
__decorate([
    (0, common_1.Post)('/:postId'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "deletePost", null);
__decorate([
    (0, common_1.Post)('/:postId/add/comment'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "createComment", null);
__decorate([
    (0, common_1.Patch)('/:commentId/modify/comment'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "modifyComment", null);
__decorate([
    (0, common_1.Delete)('/:commentId/delete/comment'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "deleteComment", null);
__decorate([
    (0, common_1.Get)('/comments/:commentId'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "getOneComment", null);
__decorate([
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    (0, common_1.Post)('/upload/post'),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "uploadPostImage", null);
__decorate([
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    (0, common_1.Post)('/upload/comment'),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "uploadCommentImage", null);
__decorate([
    (0, common_1.Post)('/select/comment'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "selectComment", null);
PostsController = __decorate([
    (0, common_1.Controller)('posts'),
    (0, common_1.UseInterceptors)(success_interceptor_1.SuccessInterceptor),
    (0, common_1.UseFilters)(http_exception_filter_1.HttpExceptionFilter),
    __metadata("design:paramtypes", [posts_service_1.PostsService,
        auth_service_1.AuthService,
        aws_service_1.AwsService])
], PostsController);
exports.PostsController = PostsController;
//# sourceMappingURL=posts.controller.js.map