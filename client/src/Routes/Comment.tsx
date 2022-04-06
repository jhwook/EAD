import styled from 'styled-components';
import { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
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
  min-height: 618px;
  margin: 0 0 200px 0;
  .dot {
    font-size: ${(props) => props.theme.fontSize.medium};
    cursor: pointer;
  }
  .dotS {
    font-size: ${(props) => props.theme.fontSize.small};
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

const ComBox = styled.div`
  width: 740px;
  height: auto;
  margin: 0 auto 0 auto;
  display: flex;
  flex-direction: column;
  border: 2px solid ${(props) => props.theme.grey};
  border-radius: 20px;
  box-shadow: 2px 2px rgba(0, 0, 0, 0.3);
`;

const ComTopBox = styled.div`
  height: 80px;
  display: flex;
  flex-direction: flex;
  align-items: center;
`;

const ComWriter = styled.div`
  width: 590px;
  font-size: ${(props) => props.theme.fontSize.small};
  color: ${(props) => props.theme.black};
  font-weight: bold;
  margin: auto 65px auto 25px;
`;

const ComBtn = styled.button`
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

const ComTitle = styled.input`
  width: 500px;
  height: 25px;
  border: 2px solid ${(props) => props.theme.grey};
  border-radius: 10px;
  padding: 5px 0 5px 5px;
  font-size: ${(props) => props.theme.fontSize.small};
  color: ${(props) => props.theme.black};
  font-weight: bold;
  margin: auto 52px auto 24px;
`;

const ViewerBox = styled.div`
  padding: 0 0 20px 0;
  margin: 20px auto 0px auto;
  width: 695px;
  height: auto;
`;

const ComModalBack = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
`;

const ComModalBox = styled.div`
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

const ComModalText = styled.div`
  font-size: ${(props) => props.theme.fontSize.small};
  width: 290px;
  margin-top: 20px;
  text-align: center;
`;

const ComModalBtn = styled.button`
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

function Comment() {
  const { userData, comData } = useSelector((state: RootState) => state);
  const { userInfo, accessToken, isLogin } = userData;
  const [writer, setWriter] = useState(userInfo?.username);
  const [title, setTitle] = useState('');
  const [postId, setPostId] = useState('');
  const [postModalView, setPostModalView] = useState(false);
  const [failModalView, setFailModalView] = useState(false);
  const navigate = useNavigate();
  const editorRef = useRef<Editor>(null);
  const [con, setCon] = useState(comData[0]);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER}/posts/comments/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      .then((res) => {
        const item = res.data.data;
        setWriter(item.writerName);
        setTitle(item.title);
        setPostId(item.post_id);
      });
  }, []);

  const registOnClick = async () => {
    const editorInstance = editorRef.current?.getInstance();
    const content = editorInstance?.getMarkdown();
    if (content !== '') {
      await axios.patch(
        `${process.env.REACT_APP_SERVER}/posts/${id}/modify/comment`,
        {
          id: userInfo.id,
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
    } else if (content === '') {
      setFailModalView(!failModalView);
    }
  };

  const uploadComImg = async (blob: string | Blob) => {
    const formData = new FormData();
    formData.append('image', blob);
    const url = await axios.post(
      `${process.env.REACT_APP_SERVER}/posts/upload/comment`,
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
    navigate(`/post/${postId}`);
  };

  const failModalOnClick = () => {
    setFailModalView(!failModalView);
  };

  const titleOnChange = useCallback(
    (e: any) => {
      setTitle(e.target.value);
    },
    [title, setTitle],
  );

  return (
    <>
      <Nav />
      <Wrapper>
        <ComBox>
          {isLogin ? (
            <ComTopBox>
              <ComWriter>{writer}</ComWriter>
              <ComBtn onClick={registOnClick}>완료</ComBtn>
            </ComTopBox>
          ) : (
            <ComTopBox>
              <ComWriter>로그인을 해야합니다</ComWriter>
            </ComTopBox>
          )}
          <ComTitle type="text" value={title} onChange={titleOnChange} />
          <ViewerBox>
            <Editor
              height="438px"
              initialEditType="markdown"
              initialValue={con}
              ref={editorRef}
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
                  const imgUrl = uploadComImg(blob);
                  callback(await imgUrl, 'Image');
                },
              }}
            />
          </ViewerBox>
        </ComBox>
        {postModalView ? (
          <ComModalBack>
            <ComModalBox>
              <ComModalText>답글이 수정되었습니다</ComModalText>
              <ComModalBtn onClick={postModalOnClick}>확인</ComModalBtn>
            </ComModalBox>
          </ComModalBack>
        ) : null}
        {failModalView ? (
          <FailModalBack>
            <FailModalBox>
              <FailModalText>본문에 내용이 있어야 합니다</FailModalText>
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

export default Comment;
