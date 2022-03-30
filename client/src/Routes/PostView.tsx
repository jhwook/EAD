import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { nanoid } from '@reduxjs/toolkit';
import { RootState } from 'index';

import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor, Viewer } from '@toast-ui/react-editor';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Nav from 'Components/Nav';

const Wrapper = styled.div`
  width: 100%;
  height: 71vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  .dot {
    font-size: ${(props) => props.theme.fontSize.medium};
    cursor: pointer;
  }
`;

const PostBox = styled.div`
  width: 835px;
  height: 600px;
  display: flex;
  flex-direction: column;
  margin-bottom: 0px;
  border: 2px solid ${(props) => props.theme.grey};
  box-shadow: rgba(128, 128, 128, 0.3) 3px 3px;
`;

const PostTopBox = styled.div`
  border: 2px solid ${(props) => props.theme.grey};
`;

const PostWriter = styled.div``;

const PostMidBox = styled.div`
  border: 2px solid ${(props) => props.theme.grey};
`;

const PostTitle = styled.div``;

const PostBounty = styled.div``;

const PostTags = styled.div``;

const PostBotBox = styled.div`
  width: 830px;
  font-size: ${(props) => props.theme.fontSize.small};
  border: 2px solid ${(props) => props.theme.grey};
`;

const CommentBox = styled.div`
  width: 800px;
  height: auto;
  display: flex;
  flex-direction: column;
  margin-bottom: 0px;
  border: 2px solid ${(props) => props.theme.grey};
  box-shadow: rgba(128, 128, 128, 0.3) 3px 3px;
`;

const CommentItem = styled.div``;

const CommentWriter = styled.div``;

const CommentContent = styled.div``;

function PostView() {
  const { userData } = useSelector((state: RootState) => state);
  const { accessToken } = userData;
  const [writer, setWriter] = useState('');
  const [title, setTitle] = useState('');
  const [tag, setTag] = useState<string[]>([]);
  // const [bounty, setBounty] = useState(0);
  const [content, setContent] = useState('');
  const [comments, setComments] = useState<any[]>([]);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER}/posts/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      .then((res) => {
        const item = res.data.data;
        // console.log('item', item);
        // setWriter(item.username);
        setWriter(item.writer);
        setTitle(item.title);
        setTag(item.tag);
        // setBounty(item.bounty)
        setContent(item.content);
        setComments(item.comments);
      });
  }, []);

  const test = `
  # mk1
  ## mk2
  ### mk3
  \`\`\`
    asd
  \`\`\`
  `;

  return (
    <>
      <Nav />
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
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{test}</ReactMarkdown>
            {/* <Viewer initialValue={content} /> */}
          </PostBotBox>
        </PostBox>
        <CommentBox>
          {comments.map((com) => (
            <CommentItem key={nanoid()}>
              <CommentWriter>{com.writer}</CommentWriter>
              <CommentContent>{com.content}</CommentContent>
            </CommentItem>
          ))}
        </CommentBox>
      </Wrapper>
    </>
  );
}

export default PostView;
