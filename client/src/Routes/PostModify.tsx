import styled from 'styled-components';
import { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { RootState } from 'index';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import Nav from 'Components/Nav';
import Footer from 'Components/Footer';

const Wrapper = styled.div`
  width: 100%;
  height: 818px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .dot {
    font-size: ${(props) => props.theme.fontSize.medium};
    cursor: pointer;
  }
`;

const FooterWrapper = styled.div`
  height: 150px;
  position: relative;
  margin-top: -150px;
  @media ${(props) => props.theme.mobile} {
    height: 200px;
    position: relative;
    margin-top: -200px;
  }
`;

const PostBox = styled.div`
  width: 740px;
  height: 620px;
  display: flex;
  padding: 10px;
  flex-direction: column;
  border: 2px solid ${(props) => props.theme.grey};
  border-radius: 20px;
  box-shadow: 2px 2px rgba(0, 0, 0, 0.3);
`;

const PostTopBox = styled.div`
  height: 60px;
  display: flex;
  flex-direction: flex;
  align-items: center;
`;

const PostWriter = styled.div`
  width: 590px;
  font-size: ${(props) => props.theme.fontSize.small};
  color: ${(props) => props.theme.black};
  font-weight: bold;
  margin: 0 0px 0 25px;
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
  margin: auto 27px auto 8px;
`;

const PostBountyBox = styled.div`
  display: flex;
  align-items: flex-start;
  margin: auto 0 auto 0;
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
  width: 690px;
  margin: auto;
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

const PostBotBox = styled.div`
  margin: 0 auto 0px auto;
  padding: 0 0 5px 0;
  width: 690px;
  height: auto;
  min-height: 100px;
  font-size: ${(props) => props.theme.fontSize.mini};
  .mk {
    margin: 0 0 0 20px;
    overflow: scroll;
  }
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

function PostModify() {
  const { userData, itemData } = useSelector((state: RootState) => state);
  const { accessToken, userInfo, isLogin } = userData;
  const [writer, setWriter] = useState(userInfo?.username);
  const initialTag: string[] = [];
  const [tag, setTag] = useState(initialTag);
  const [title, setTitle] = useState('');
  const [bounty, setBounty] = useState(0);
  const [postModalView, setPostModalView] = useState(false);
  const [failModalView, setFailModalView] = useState(false);
  const [postCon, setPostCon] = useState(itemData[0]);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const editorRef = useRef<Editor>(null);

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
        setWriter(item.writerName);
        setTitle(item.title);
        setTag(item.tag);
        setBounty(item.bounty);
      });
  }, [postModalView]);

  const delTag = useCallback(
    (targetIdx: any) => {
      setTag(tag.filter((_: string, idx: number) => idx !== targetIdx));
    },
    [tag, setTag],
  );

  const addTag = useCallback(
    (e: any) => {
      const filtered = tag.filter((el) => el === e.target.value);
      if (e.target.value !== '' && filtered.length === 0) {
        setTag([...tag, e.target.value]);
        e.target.value = '';
      }
    },
    [tag, setTag],
  );

  const bountyOnChange = useCallback(
    (e: any) => {
      setBounty(e.target.value);
    },
    [bounty, setBounty],
  );

  const titleOnChange = useCallback(
    (e: any) => {
      setTitle(e.target.value);
    },
    [title, setTitle],
  );

  const modifyOnClick = async () => {
    const editorInstance = editorRef.current?.getInstance();
    const content = editorInstance?.getMarkdown();
    if (tag.length !== 0 && title !== '' && content !== '') {
      await axios.patch(
        `${process.env.REACT_APP_SERVER}/posts/${id}`,
        {
          id: userInfo.id,
          title,
          tag,
          content,
          bounty,
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
  };

  const uploadPostImg = async (blob: string | Blob) => {
    const formData = new FormData();
    formData.append('image', blob);
    const url = await axios.post(
      `${process.env.REACT_APP_SERVER}/posts/upload/post`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      },
    );
    return url.data.data;
  };

  const postModalOnClick = () => {
    navigate('/search');
  };

  const failModalOnClick = () => {
    setFailModalView(!failModalView);
  };

  return (
    <>
      <Nav />
      <Wrapper>
        <PostBox>
          {isLogin ? (
            <PostTopBox>
              <PostWriter>{writer}</PostWriter>
              <PostBtn onClick={modifyOnClick}>완료</PostBtn>
            </PostTopBox>
          ) : (
            <PostTopBox>
              <PostWriter>로그인을 해야합니다</PostWriter>
            </PostTopBox>
          )}
          <PostMidBox>
            <PostTitle type="text" value={title} onChange={titleOnChange} />
            <PostBountyBox>
              <PostText>현상금 :</PostText>
              <PostBounty value={bounty} onChange={bountyOnChange}>
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
              height="420px"
              initialEditType="markdown"
              initialValue={postCon.content}
              ref={editorRef}
              placeholder="마크다운 양식으로 작성하세요"
              plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
              toolbarItems={[
                ['bold', 'italic', 'strike'],
                ['hr'],
                ['image', 'link'],
                ['ul', 'ol'],
                ['code', 'codeblock'],
              ]}
              hooks={{
                addImageBlobHook: async (blob, callback) => {
                  const imgUrl = uploadPostImg(blob);
                  callback(await imgUrl, 'Image');
                },
              }}
            />
          </PostBotBox>
        </PostBox>
        {postModalView ? (
          <PostModalBack>
            <PostModalBox>
              <PostModalText>게시글이 수정되었습니다</PostModalText>
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
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    </>
  );
}

export default PostModify;
