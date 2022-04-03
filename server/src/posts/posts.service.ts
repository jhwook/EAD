/* eslint-disable object-shorthand */
/* eslint-disable prefer-const */
/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
/* eslint-disable prefer-const */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-else-return */
import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UsersRepository } from 'src/users/users.repository';
import { Model } from 'mongoose';
import { User } from 'src/users/users.schema';
import { PostsRepository } from './posts.repository';
import { Post } from './posts.schema';
import { Comment } from './comments.schema';

@Injectable()
export class PostsService {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private readonly postsRepository: PostsRepository,
    private readonly usersRepository: UsersRepository,
    @InjectModel(Post.name) private readonly postModel: Model<Post>,
    @InjectModel(Comment.name) private readonly commentModel: Model<Comment>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  // 포스트 하나만 가져오기
  async getOnePost(id) {
    const post = await this.postModel.findById(id).populate('comments');
    return post;
  }

  // async getAllComments() {}

  // 포스트 작성
  async createPost(body) {
    const { id, title, content, tags, bounty } = body;

    const user = await this.userModel.findById(id);

    const post = await this.postModel.create({
      // eslint-disable-next-line no-underscore-dangle
      writer: user.id,
      writerName: user.username,
      title,
      content,
      tag: tags,
      bounty,
    });

    return post;
  }

  // 포스트 수정
  async updatePost(body, param) {
    const { id, title, content, tag, img } = body;
    const { postId } = param;
    const post = await this.postModel.findById(postId);

    if (post.writer !== id) {
      throw new HttpException('you are not post owner', 401);
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

  // 포스트 삭제
  async deletePost(param, body) {
    const { postId } = param;
    const { id } = body;
    const post = await this.postsRepository.findPostById(postId);

    if (post.writer !== id) {
      throw new HttpException('it is not your post', 401);
    }

    if (post) {
      await this.postModel.findByIdAndDelete(postId);
      return { message: 'successfully deleted' };
    } else {
      throw new HttpException('존재하지 않는 포스트입니다', 400);
    }
  }

  // 포스트 이미지 저장
  async uploadPostImg(body, param, files: Express.Multer.File[]) {
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
    throw new HttpException('작성자가 일치하지 않습니다.', 401);
  }

  // 검색 (키워드)
  async searchPost(keyword) {
    console.log(keyword);
    if (keyword !== '') {
      let postArray = [];
      postArray = await this.postModel
        .find(
          { $text: { $search: keyword } },
          { score: { $meta: 'textScore' } },
        )
        .sort({ score: { $meta: 'textScore' } });
      console.log(postArray);
      return postArray.map((post) => {
        return { id: post.id, title: post.title, tag: post.tag };
      });
    }
    const allPost = await this.postModel.find();

    return allPost.map((post) => {
      return { id: post.id, title: post.title, tag: post.tag };
    });
  }

  // 검색 (태그)
  async searchPostByTag(body) {
    const { tag } = body;

    let postArray = [];
    postArray = await this.postModel.find({ tag: { $all: tag } });

    return postArray;
  }

  // 댓글 작성
  async createComment(body, param) {
    const { id, content, title } = body;
    const { postId } = param;

    const user = await this.userModel.findById(id);
    const post = await this.postModel.findById(postId);

    const newComment = await this.commentModel.create({
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

  // 댓글 수정
  async modifyComment(body, param) {
    const { id, content } = body;
    const { commentId } = param;

    await this.commentModel.findByIdAndUpdate(commentId, {
      content,
    });
    const newComment = await this.commentModel.findById(commentId);
    return newComment;
  }

  // 댓글 삭제
  async deleteComment(param) {
    const { commentId } = param;
    const comment = await this.commentModel.findById(commentId);
    console.log(String(comment.post_id));
    const postId = String(comment.post_id);
    const post = await this.postModel.findById(postId);

    if (!comment) {
      throw new HttpException('존재하지 않는 댓글입니다.', 400);
    }
    // 댓글 삭제
    await this.commentModel.findByIdAndDelete(commentId);

    // 포스트에 있는 댓글 삭제
    await this.postModel.findByIdAndUpdate(post.id, {
      $pull: { comment: commentId },
    });

    const updatedPost = await this.postModel.findById(post.id);

    return updatedPost;
  }

  // 댓글 하나 가져오기
  async getOneComment(param) {
    const { commentId } = param;
    const comment = await this.commentModel.findById(commentId);

    return comment;
  }

  // 댓글에 이미지 저장
  async uploadCommentImg(body, param, files: Express.Multer.File[]) {
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
    throw new HttpException('작성자가 일치하지 않습니다.', 401);
  }

  // 포스트 제목만 주기
  async getPostTitle() {
    const postTitles = await this.postsRepository.getTitle();
    return postTitles;
  }

  async getOnePostContent(id) {
    const post = await this.postModel.findById(id);
    // const post = await this.postModel.findById(id).populate('comments');
    // console.log(post);
    let result = [];
    const commentArr = post.comment;

    for (let i = 0; i < commentArr.length; i++) {
      let comment = await this.commentModel.findById(commentArr[i]);
      result.push(comment);
    }
    const content = post.content;

    return [{ content: content }];
  }

  // 유저의 포스트
  async getMyPost(body) {
    const { id } = body;
    const mypost = await this.postModel.find({ writer: id });
    return mypost;
  }

  // 유저의 댓글
  async getMyComment(body) {
    const { id } = body;
    const mycomment = await this.commentModel.find({ writer: id });
    return mycomment;
  }
}
