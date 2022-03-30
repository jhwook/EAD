import styled from 'styled-components';
import react, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { nanoid } from '@reduxjs/toolkit';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
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

const PostTopBox = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: flex;
  align-items: center;
`;

const PostWriter = styled.div`
  width: 600px;
  font-size: ${(props) => props.theme.fontSize.small};
  color: ${(props) => props.theme.black};
  font-weight: bold;
  margin: 0 100px 0 50px;
`;

const PostMidBox = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: flex;
  margin: 0 0 0px 15px;
`;

const PostTitle = styled.input`
  width: 500px;
  height: 25px;
  border: 2px solid ${(props) => props.theme.grey};
  border-radius: 10px;
  padding: 5px 0 5px 5px;
  font-size: ${(props) => props.theme.fontSize.small};
  color: ${(props) => props.theme.black};
  font-weight: bold;
  margin: 0 52px 0 30px;
`;

const PostBountyBox = styled.div`
  display: flex;
  align-items: flex-start;
  margin: 10px 0 0 0;
`;

const PostText = styled.span`
  font-size: ${(props) => props.theme.fontSize.mini};
  width: 65px;
  margin-top: 5px;
`;

const PostBounty = styled.select`
  font-size: ${(props) => props.theme.fontSize.tiny};
  color: ${(props) => props.theme.black};
  width: 90px;
  border: 2px solid ${(props) => props.theme.grey};
  border-radius: 10px;
  padding: 3px;
`;

const PostBotBox = styled.div`
  width: 100%;
  height: 420px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PostBtn = styled.button`
  background-color: ${(props) => props.theme.white};
  color: ${(props) => props.theme.black};
  border: 1px solid ${(props) => props.theme.grey};
  border-radius: 11px;
  margin: 20px;
  font-size: ${(props) => props.theme.fontSize.tiny};
  width: 80px;
  height: 30px;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    color: ${(props) => props.theme.pink};
    font-weight: bold;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  }
`;

const TagBox = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  width: 710px;
  margin: 0 0 20px 47px;
`;

const TagList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: 0 0 0 0;
`;

const TagItem = styled.li`
  width: auto;
  height: 30px;
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.beige};
  padding: 0 8px 0 8px;
  font-size: ${(props) => props.theme.fontSize.tiny};
  list-style: none;
  border-radius: 6px;
  margin: 0 8px 4px 0px;
  background: ${(props) => props.theme.btnGreen};
`;

const TagTitle = styled.span`
  font-size: ${(props) => props.theme.fontSize.tiny};
  padding: 3px;
`;

const TagCloseIcon = styled.span`
  display: block;
  width: 16px;
  height: 16px;
  margin: 2px;
  text-align: center;
  font-size: ${(props) => props.theme.fontSize.tiny};
  color: ${(props) => props.theme.black};
  border-radius: 50%;
  background-color: ${(props) => props.theme.beige};
  cursor: pointer;
`;

const TagInput = styled.input`
  width: 80px;
  background-color: ${(props) => props.theme.beige};
  color: ${(props) => props.theme.black};
  border: 2px solid ${(props) => props.theme.grey};
  padding: 6px;
  border-radius: 10px;
`;
const PostModalBack = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
`;

const PostModalBox = styled.div`
  position: absolute;
  width: 320px;
  height: 150px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${(props) => props.theme.beige};
  box-shadow: 0 2px 7px rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const PostModalText = styled.div`
  font-size: ${(props) => props.theme.fontSize.small};
  width: 290px;
  margin-top: 20px;
  text-align: center;
`;

const PostModalBtn = styled.button`
  background-color: ${(props) => props.theme.white};
  color: ${(props) => props.theme.btnGreen};
  border: 1px solid ${(props) => props.theme.grey};
  border-radius: 11px;
  margin: 20px;
  font-size: ${(props) => props.theme.fontSize.tiny};
  width: 80px;
  height: 30px;
  cursor: pointer;
  transition: all 0.5s;
  &:hover {
    color: ${(props) => props.theme.pink};
    font-weight: bold;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  }
`;

const FailModalBack = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
`;

const FailModalBox = styled.div`
  position: absolute;
  width: 320px;
  height: 150px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${(props) => props.theme.beige};
  box-shadow: 0 2px 7px rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const FailModalText = styled.div`
  font-size: ${(props) => props.theme.fontSize.small};
  width: 290px;
  margin-top: 20px;
  text-align: center;
`;

const FailModalBtn = styled.button`
  background-color: ${(props) => props.theme.white};
  color: ${(props) => props.theme.btnGreen};
  border: 1px solid ${(props) => props.theme.grey};
  border-radius: 11px;
  margin: 20px;
  font-size: ${(props) => props.theme.fontSize.tiny};
  width: 80px;
  height: 30px;
  cursor: pointer;
  transition: all 0.5s;
  &:hover {
    color: ${(props) => props.theme.pink};
    font-weight: bold;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  }
`;

function Post() {
  const { userData } = useSelector((state: RootState) => state);
  const { userInfo, accessToken, isLogin } = userData;
  const [writer, setWriter] = useState('');
  const initialTag: string[] = [];
  const [tag, setTag] = useState(initialTag);
  const [title, setTitle] = useState('');
  const [bounty, setBounty] = useState(0);
  const [postModalView, setPostModalView] = useState(false);
  const [failModalView, setFailModalView] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const editRef = useRef<Editor>(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER}/users/auth`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        const user = res.data.data.userInfo;
        setWriter(user.username);
      });
  }, []);

  const delTag = (targetIdx: any) => {
    setTag(tag.filter((_: string, idx: number) => idx !== targetIdx));
  };

  const addTag = (e: any) => {
    const filtered = tag.filter((el) => el === e.target.value);
    if (e.target.value !== '' && filtered.length === 0) {
      setTag([...tag, e.target.value]);
      e.target.value = '';
    }
  };

  const bountyOnChange = (e: any) => {
    setBounty(e.target.value);
  };

  const titleOnChange = (e: any) => {
    setTitle(e.target.value);
  };

  const registOnClick = async () => {
    const editorInstance = editRef.current?.getInstance();
    const content = editorInstance?.getMarkdown();
    try {
      if (tag.length !== 0 && title !== '' && content !== '') {
        await axios.post(
          `${process.env.REACT_APP_SERVER}/posts`,
          {
            title,
            tag,
            bounty,
            content,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
          },
        );
        setPostModalView(!postModalView);
      } else if (tag.length === 0 || title === '' || content === '') {
        setFailModalView(!failModalView);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const postModalOnClick = () => {
    navigate('/search');
  };

  const failModalOnClick = () => {
    setFailModalView(!failModalView);
    navigate('/post');
  };

  return (
    <Wrapper>
      <PostBox>
        <PostTopBox>
          <PostWriter>{writer}</PostWriter>
          <PostBtn onClick={registOnClick}>등록</PostBtn>
        </PostTopBox>
        <PostMidBox>
          <PostTitle
            type="text"
            placeholder="제목은 여기에"
            onChange={titleOnChange}
          />
          <PostBountyBox>
            <PostText>현상금 :</PostText>
            <PostBounty onChange={bountyOnChange}>
              <option value="0">0</option>
              <option value="1000">1,000</option>
              <option value="2000">2,000</option>
              <option value="3000">3,000</option>
              <option value="4000">4,000</option>
              <option value="5000">5,000</option>
              <option value="6000">6,000</option>
              <option value="7000">7,000</option>
              <option value="8000">8,000</option>
              <option value="9000">9,000</option>
              <option value="10000">10,000</option>
            </PostBounty>
          </PostBountyBox>
        </PostMidBox>
        <TagBox>
          <TagList>
            {tag.map((tag, idx) => (
              <TagItem key={nanoid()}>
                <TagTitle>{tag}</TagTitle>
                <TagCloseIcon onClick={() => delTag(idx)}>x</TagCloseIcon>
              </TagItem>
            ))}
          </TagList>
          <TagInput
            type="text"
            onKeyUp={(e) => (e.key === 'Enter' ? addTag(e) : null)}
            placeholder="태그는 여기에"
          />
        </TagBox>
        <PostBotBox>
          <Editor
            // previewStyle="vertical"
            height="420px"
            initialEditType="markdown"
            ref={editRef}
            // usageStatistics={false}
          />
        </PostBotBox>
      </PostBox>
      {postModalView ? (
        <PostModalBack>
          <PostModalBox>
            <PostModalText>게시글이 등록되었습니다</PostModalText>
            <PostModalBtn onClick={postModalOnClick}>확인</PostModalBtn>
          </PostModalBox>
        </PostModalBack>
      ) : null}
      {failModalView ? (
        <FailModalBack>
          <FailModalBox>
            <FailModalText>
              제목, 태그, 본문에 모두 내용이 있어야 합니다
            </FailModalText>
            <FailModalBtn onClick={failModalOnClick}>확인</FailModalBtn>
          </FailModalBox>
        </FailModalBack>
      ) : null}
    </Wrapper>
  );
}

export default Post;
