import styled from 'styled-components';
import react, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { nanoid } from '@reduxjs/toolkit';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor, Viewer } from '@toast-ui/react-editor';
import { AppDispatch, RootState, UserLogout, UserModify } from 'index';

const Wrapper = styled.div`
  width: 100%;
  height: 71vh; // 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  .dot {
    font-size: ${(props) => props.theme.fontSize.medium};
    cursor: pointer;
  }
  .viewer {
    font-size: ${(props) => props.theme.fontSize.mini};
  }
`;

const PostBox = styled.div`
  width: 800px;
  height: 600px;
  display: flex;
  flex-direction: column;
  margin-bottom: 0px;
  border: 2px solid ${(props) => props.theme.grey};
  box-shadow: rgba(128, 128, 128, 0.3) 3px 3px;
`;

const PostTopBox = styled.div``;

const PostWriter = styled.div``;

const PostMidBox = styled.div``;

const PostTitle = styled.div``;

const PostBounty = styled.div``;

const PostTags = styled.div``;

const PostBotBox = styled.div``;

const CommentBox = styled.div`
  width: 800px;
  height: auto;
  display: flex;
  flex-direction: column;
  margin-bottom: 0px;
  border: 2px solid ${(props) => props.theme.grey};
  box-shadow: rgba(128, 128, 128, 0.3) 3px 3px;
`;

function PostView() {
  const { userData } = useSelector((state: RootState) => state);
  const { userInfo, accessToken, isLogin } = userData;
  const [writer, setWriter] = useState('');
  const [title, setTitle] = useState('');
  const [tag, setTag] = useState<string[]>([]);
  const [bounty, setBounty] = useState(0);
  const [content, setContent] = useState('');
  const [postModalView, setPostModalView] = useState(false);
  const [failModalView, setFailModalView] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const editRef = useRef<Editor>(null);

  useEffect(() => {
    console.log('id', id);
    axios
      .get(`${process.env.REACT_APP_SERVER}/posts/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      .then((res) => {
        const post = res.data.data;
        console.log('post', post);
        // setWriter(post.username);
        setWriter(post.writer);
        setTitle(post.title);
        setTag(post.tag);
        // setBounty(post.bounty)
        setContent(post.content);
      });
  }, []);

  return (
    <Wrapper>
      <PostBox>
        <PostTopBox>
          <PostWriter>{writer}</PostWriter>
          <HiOutlineDotsHorizontal className="dot" />
        </PostTopBox>
        <PostMidBox>
          <PostTitle>{title}</PostTitle>
          <PostBounty>Bounty</PostBounty>
          <PostTags>{tag}</PostTags>
        </PostMidBox>
        <PostBotBox>
          <Viewer initialValue={content} />
        </PostBotBox>
      </PostBox>
      <CommentBox>comment</CommentBox>
    </Wrapper>
  );
}

export default PostView;
