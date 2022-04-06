/* eslint-disable react/no-children-prop */
/* eslint-disable no-underscore-dangle */
import styled from 'styled-components';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { RootState, ComRender, AppDispatch } from 'index';
import { FiChevronsUp } from 'react-icons/fi';
import { Editor, Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import Nav from 'Components/Nav';
import Footer from 'Components/Footer';
import io from 'socket.io-client';
import userHolder from '../Image/Logo/welcome.png';

const socket = io(`${process.env.REACT_APP_SERVER}`);

const Wrapper = styled.div`
  width: 100%;
  min-height: 618px;
  margin: 0 0 200px 0;
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
  height: auto;
  margin: 0 auto 30px auto;
  border: 2px solid ${(props) => props.theme.grey};
  border-radius: 20px;
  box-shadow: 3px 3px rgba(0, 0, 0, 0.3);
  @media ${(props) => props.theme.mobile} {
  }
  @media ${(props) => props.theme.iPhone12Pro} {
  }
`;

const PostTopBox = styled.div`
  height: 60px;
  display: flex;
  flex-direction: flex;
  align-items: center;
  margin: 12px 0 0 0;
`;

const PostUnpkIcon = styled.div`
  font-size: ${(props) => props.theme.fontSize.tiny};
  height: 45px;
  width: 55px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0 0 25px;
  color: ${(props) => props.theme.btnGreen};
  border: 1px solid ${(props) => props.theme.btnGreen};
  background-color: ${(props) => props.theme.beige};
`;

const PostPickIcon = styled.div`
  font-size: ${(props) => props.theme.fontSize.tiny};
  height: 45px;
  width: 55px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0 0 25px;
  color: ${(props) => props.theme.beige};
  border: 1px solid ${(props) => props.theme.btnGreen};
  background-color: ${(props) => props.theme.btnGreen};
`;

const PostEmptyIcon = styled.div`
  height: 45px;
  width: 55px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0 0 25px;
`;

const WriterImgBox = styled.div`
  height: 45px;
  width: 55px;
  border-radius: 50%;
  border: 1px solid ${(props) => props.theme.grey};
  margin: auto 0px auto 5px;
`;

const WriterImg = styled.img`
  height: 45px;
  width: 55px;
  border-radius: 50%;
`;

const PostWriter = styled.div`
  width: 330px;
  font-size: ${(props) => props.theme.fontSize.small};
  color: ${(props) => props.theme.black};
  font-weight: bold;
  margin: auto 20px auto 8px;
`;

const PostBtnBox = styled.div`
  display: flex;
  margin: 0 10px 0 0;
`;

const PostMidBox = styled.div`
  height: 46px;
  margin: 7px 0 14px 0;
  flex-wrap: wrap;
`;

const PostTitle = styled.div`
  width: auto;
  max-width: 490px;
  font-size: ${(props) => props.theme.fontSize.medium};
  color: ${(props) => props.theme.black};
  border: 1px solid ${(props) => props.theme.grey};
  border-radius: 11px;
  display: inline-block;
  padding: 7px;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  margin: auto 0px auto 24px;
`;

const PostBounty = styled.div`
  font-size: ${(props) => props.theme.fontSize.mini};
  width: 130px;
  margin: auto 21px auto 0px;
  padding: 12.5px;
  float: right;
  color: ${(props) => props.theme.beige};
  border: 1px solid ${(props) => props.theme.btnGreen};
  background-color: ${(props) => props.theme.btnGreen};
  border-radius: 10px;
`;

const PostTagBox = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  width: 690px;
  margin: auto;
`;

const PostTagList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: 0 0 0 0;
`;

const PostTagItem = styled.li`
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

const PostTagTitle = styled.span`
  font-size: ${(props) => props.theme.fontSize.tiny};
  padding: 3px;
`;

const PostBotBox = styled.div`
  margin: 0 auto 0 auto;
  padding: 0 0 5px 0;
  width: 690px;
  height: auto;
  min-height: 100px;
  font-size: ${(props) => props.theme.fontSize.mini};
`;

const ViewerBox = styled.div`
  padding: 0 0 10px 0;
  margin: 0 auto 5px auto;
  width: 690px;
  height: auto;
`;

const CommentBox = styled.div`
  width: 740px;
  margin: 0 auto 0 auto;
  display: flex;
  flex-direction: column;
`;

const CommentWriteForm = styled.form`
  border: 2px solid ${(props) => props.theme.grey};
  padding: 0 0 15px 0;
  margin: 0 0 20px 0;
  border-radius: 20px;
  box-shadow: 3px 3px rgba(0, 0, 0, 0.3);
`;

const CommentWriteBox = styled.div`
  display: flex;
  flex-direction: flex;
  align-items: center;
  padding: 10px 10px 0 0;
`;

const CommentWriteName = styled.div`
  width: 650px;
  padding: 0px 0 0px 25px;
  font-size: ${(props) => props.theme.fontSize.mini};
`;

const CommentTitle = styled.input`
  width: 500px;
  height: 25px;
  border: 2px solid ${(props) => props.theme.grey};
  border-radius: 10px;
  padding: 5px 0 5px 5px;
  font-size: ${(props) => props.theme.fontSize.small};
  color: ${(props) => props.theme.black};
  font-weight: bold;
  margin: 0 0px 10px 23px;
`;

const CommentItemBox = styled.div``;

const CommentItemList = styled.ul``;

const CommentItem = styled.li`
  border: 1px solid ${(props) => props.theme.grey};
  margin: 0 0 10px 0;
  border-radius: 20px;
  box-shadow: 3px 3px rgba(0, 0, 0, 0.3);
`;

const CommentItemHead = styled.div`
  display: flex;
  flex-direction: flex;
  align-items: center;
  padding: 10px 0 0 0;
`;

const CommentWriter = styled.div`
  width: 236px;
  margin: 0 0 0 25px;
  font-size: ${(props) => props.theme.fontSize.mini};
`;

const CommentItemEmptyBox = styled.div`
  height: 50px;
  display: flex;
  flex-direction: flex;
  margin: auto 14px auto 0;
`;

const CommentItemBtnBox = styled.div`
  display: flex;
  flex-direction: flex;
  margin: auto 14px auto 0;
`;

const CommentItemTitle = styled.div`
  width: auto;
  max-width: 650px;
  font-size: ${(props) => props.theme.fontSize.small};
  color: ${(props) => props.theme.black};
  border: 1px solid ${(props) => props.theme.grey};
  border-radius: 11px;
  display: inline-block;
  padding: 8px;
  font-weight: bold;
  margin: 10px 0 20px 24px;
  white-space: nowrap;
  overflow: hidden;
`;

const ModalBack = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
`;

const ModalBox = styled.div`
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

const ModalText = styled.div`
  font-size: ${(props) => props.theme.fontSize.small};
  width: 290px;
  margin-top: 20px;
  text-align: center;
`;

const ModalBtnBox = styled.div``;

const ModalBtn = styled.button`
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

const UpScrollBtn = styled.div`
  width: 60px;
  height: 60px;
  position: fixed;
  right: 160px;
  bottom: 170px;
  border: 2px solid ${(props) => props.theme.btnGreen};
  border-radius: 15px;
  transition: all 1s;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.3) 3px 3px;
  .upscroll {
    width: 100%;
    height: 100%;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 35px;
    height: 35px;
    right: 20px;
    bottom: 240px;
  }
  @media ${(props) => props.theme.mobile} {
    width: 35px;
    height: 35px;
    right: 20px;
    bottom: 240px;
  }
  @media ${(props) => props.theme.tablet} {
    width: 40px;
    height: 40px;
    right: 20px;
  }
  @media ${(props) => props.theme.desktop} {
    width: 50px;
    height: 50px;
    right: 20px;
  }
  @media ${(props) => props.theme.desktop1} {
    width: 50px;
    height: 50px;
    right: 20px;
  }
`;

const CommonHideBtn = styled.div`
  width: 60px;
  height: 30px;
  margin: 10px 10px 10px 10px;
`;

const CommonBtn = styled.button`
  background-color: ${(props) => props.theme.white};
  color: ${(props) => props.theme.black};
  border: 1px solid ${(props) => props.theme.grey};
  border-radius: 10px;
  margin: 10px 10px 10px 10px;
  font-size: ${(props) => props.theme.fontSize.tiny};
  width: 60px;
  height: 30px;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    color: ${(props) => props.theme.pink};
    font-weight: bold;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  }
`;

const PostBtn = styled(CommonBtn)``;

function PostView() {
  const { userData, itemData } = useSelector((state: RootState) => state);
  const { userInfo, accessToken, isLogin } = userData;
  const [comments, setComments] = useState<any[]>([]);
  const [comId, setComId] = useState('');
  const [postFuncView, setPostFuncView] = useState(false);
  const [postWriterView, setPostWriterView] = useState(false);
  const [comModalView, setComModalView] = useState(false);
  const [failModalView, setFailModalView] = useState(false);
  const [comDelModalView, setComDelModalView] = useState(false);
  const [postDelModalView, setPostDelModalView] = useState(false);
  const [comPickModalView, setComPickModalView] = useState(false);
  const [postCon, setPostCon] = useState(itemData[0]);
  const [conTitle, setConTitle] = useState('');
  const [scrollY, setScrollY] = useState(0);

  const dispatch = useDispatch<AppDispatch>();

  interface Data {
    bounty: number;
    comment: string[];
    comments: object[];
    content: string;
    createdAt: string;
    id: number;
    tag: string[];
    title: string;
    updatedAt: string;
    writer: string;
    writerImg: string;
    writerName: string;
    __v: number;
    _id: number;
  }

  const [data, setData] = useState<Data>({
    bounty: 0,
    comment: [''],
    comments: [{}],
    content: '',
    createdAt: '',
    id: 0,
    tag: [''],
    title: '',
    updatedAt: '',
    writer: '',
    writerImg: '',
    writerName: '',
    __v: 0,
    _id: 0,
  });

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const editorRef = useRef<Editor>(null);

  useEffect(() => {
    const getPost = async () => {
      const data = await axios.get(
        `${process.env.REACT_APP_SERVER}/posts/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      );
      const item = data.data.data;
      setData(item);
      setComments(item.comments);
    };
    getPost();
  }, [comModalView, comDelModalView]);

  const handleFollow = () => {
    setScrollY(window.pageYOffset); // window 스크롤 값을 ScrollY에 저장
  };

  useEffect(() => {
    const watch = () => {
      window.addEventListener('scroll', handleFollow);
    };
    watch(); // addEventListener 함수를 실행
    return () => {
      window.removeEventListener('scroll', handleFollow); // addEventListener 함수를 삭제
    };
  });

  const UpScrollOnClick = () => {
    if (!window.scrollY) {
      return;
    }

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const regComOnClick = async () => {
    const editorInstance = editorRef.current?.getInstance();
    const content = editorInstance?.getMarkdown();
    if (content !== '' && conTitle !== '') {
      await axios.post(
        `${process.env.REACT_APP_SERVER}/posts/${id}/add/comment`,
        {
          id: userInfo.id,
          title: conTitle,
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
      setComModalView(!comModalView);
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

  const conTitleOnChange = (e: any) => {
    setConTitle(e.target.value);
  };

  const delComOnClick = async () => {
    await axios.delete(
      `${process.env.REACT_APP_SERVER}/posts/${comId}/delete/comment`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      },
    );
    setComDelModalView(!comDelModalView);
  };

  const delComModalClick = (id: any) => {
    setComId(id);
    setComDelModalView(!comDelModalView);
  };

  const delPostOnClick = async () => {
    await axios.post(
      `${process.env.REACT_APP_SERVER}/posts/${id}`,
      {
        id: userInfo.id,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      },
    );
    navigate('/');
  };

  const delPostModalClick = () => {
    setPostDelModalView(!postDelModalView);
  };

  const postWriterOnClick = () => {
    setPostWriterView(!postWriterView);
  };

  const comModalOnClick = () => {
    setComModalView(!comModalView);
  };

  const failModalOnClick = () => {
    setFailModalView(!failModalView);
  };

  const comOnClick = (id: number, con: string) => {
    dispatch(ComRender([con]));
    navigate(`/comment/${id}`);
  };

  const postModifyOnClick = () => {
    navigate(`/post/modify/${id}`);
  };

  const postChatOnClick = () => {
    socket.emit(
      'make_room',
      userData.userInfo.id,
      data.writer,
      (roomId: string) => {
        navigate(`/chat/${roomId}/${data.writerName}`);
      },
    );
  };

  const comChatOnClick = (id: string, username: string) => {
    socket.emit('make_room', userData.userInfo.id, id, (roomId: string) => {
      navigate(`/chat/${roomId}/${username}`);
    });
  };

  const comPickOnClick = () => {
    setComPickModalView(!comPickModalView);
    navigate(`/chat/${data.writer}`);
  };

  interface IComState {
    post_id: string;
    writer: string;
    title: string;
    content: string;
    writerName: string;
    writerImg: string;
    _id: number;
  }

  return (
    <>
      <Nav />
      <Wrapper>
        <PostBox>
          <PostTopBox>
            <PostPickIcon>채택완료</PostPickIcon>
            {/* <PostUnpkIcon>채택중</PostUnpkIcon> */}
            {data.writerImg ? (
              <WriterImgBox>
                <WriterImg src={data.writerImg} onClick={postWriterOnClick} />
              </WriterImgBox>
            ) : (
              <WriterImgBox>
                <WriterImg src={userHolder} onClick={postWriterOnClick} />
              </WriterImgBox>
            )}
            <PostWriter>{data.writerName}</PostWriter>
            {postWriterView ? (
              <PostBtn onClick={postChatOnClick}>채팅</PostBtn>
            ) : (
              <CommonHideBtn />
            )}
            {userInfo.id === data?.writer ? (
              <PostBtnBox>
                <CommonBtn onClick={postModifyOnClick}>수정</CommonBtn>
                <CommonBtn onClick={delPostModalClick}>삭제</CommonBtn>
              </PostBtnBox>
            ) : null}
          </PostTopBox>
          <PostMidBox>
            <PostTitle>{data.title}</PostTitle>
            <PostBounty>현상금: {data.bounty}원</PostBounty>
          </PostMidBox>
          <PostTagBox>
            <PostTagList>
              {data.tag.map((el) => (
                <PostTagItem key={nanoid()}>
                  <PostTagTitle>{el}</PostTagTitle>
                </PostTagItem>
              ))}
            </PostTagList>
          </PostTagBox>
          <PostBotBox>
            <Viewer
              initialValue={postCon.content}
              plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
            />
          </PostBotBox>
        </PostBox>
        <CommentBox>
          {isLogin ? (
            <CommentWriteForm>
              <CommentWriteBox>
                <CommentWriteName>{userInfo.username}</CommentWriteName>
                <CommonBtn onClick={regComOnClick}>등록</CommonBtn>
              </CommentWriteBox>
              <CommentTitle
                type="text"
                placeholder="제목은 여기에"
                onChange={conTitleOnChange}
              />
              <ViewerBox>
                <Editor
                  height="250px"
                  initialEditType="markdown"
                  initialValue=""
                  ref={editorRef}
                  placeholder="마크다운 양식으로 작성하세요"
                  plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
                  toolbarItems={[
                    ['bold', 'italic'],
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
            </CommentWriteForm>
          ) : null}
          <CommentItemBox>
            <CommentItemList>
              {comments.map((com: IComState) => (
                <CommentItem key={nanoid()}>
                  <CommentItemHead>
                    <PostPickIcon>채택글</PostPickIcon>
                    {/* <PostEmptyIcon /> */}
                    {com.writerImg ? (
                      <WriterImgBox>
                        <WriterImg src={com.writerImg} />
                      </WriterImgBox>
                    ) : (
                      <WriterImgBox>
                        <WriterImg src={userHolder} />
                      </WriterImgBox>
                    )}
                    <CommentWriter>{com.writerName}</CommentWriter>
                    {isLogin ? (
                      <>
                        {userInfo.id === data.writer ? (
                          <CommonBtn onClick={comPickOnClick}>채택</CommonBtn>
                        ) : (
                          <CommonHideBtn />
                        )}
                        <CommonBtn
                          onClick={() =>
                            comChatOnClick(com.writer, com.writerName)
                          }
                        >
                          채팅
                        </CommonBtn>
                        {userInfo.id === com.writer ||
                        userInfo.id === data.writer ? (
                          <CommentItemBtnBox>
                            <CommonBtn
                              onClick={() => comOnClick(com._id, com.content)}
                            >
                              수정
                            </CommonBtn>
                            <CommonBtn
                              onClick={() => delComModalClick(com._id)}
                            >
                              삭제
                            </CommonBtn>
                          </CommentItemBtnBox>
                        ) : (
                          <CommentItemEmptyBox />
                        )}
                      </>
                    ) : null}
                  </CommentItemHead>
                  <CommentItemTitle>{com.title}</CommentItemTitle>
                  <ViewerBox>
                    <Viewer
                      initialValue={com.content}
                      plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
                    />
                  </ViewerBox>
                </CommentItem>
              ))}
            </CommentItemList>
          </CommentItemBox>
        </CommentBox>
        {comModalView ? (
          <ModalBack>
            <ModalBox>
              <ModalText>답글이 등록되었습니다</ModalText>
              <ModalBtn onClick={comModalOnClick}>확인</ModalBtn>
            </ModalBox>
          </ModalBack>
        ) : null}
        {failModalView ? (
          <ModalBack>
            <ModalBox>
              <ModalText>제목과 본문에 모두 내용이 있어야 합니다</ModalText>
              <ModalBtn onClick={failModalOnClick}>확인</ModalBtn>
            </ModalBox>
          </ModalBack>
        ) : null}
        {comDelModalView ? (
          <ModalBack>
            <ModalBox>
              <ModalText>답글을 삭제하실 건가요?</ModalText>
              <ModalBtnBox>
                <ModalBtn onClick={delComOnClick}>네</ModalBtn>
                <ModalBtn onClick={delComModalClick}>아니요</ModalBtn>
              </ModalBtnBox>
            </ModalBox>
          </ModalBack>
        ) : null}
        {postDelModalView ? (
          <ModalBack>
            <ModalBox>
              <ModalText>게시글을 삭제하실 건가요?</ModalText>
              <ModalBtnBox>
                <ModalBtn onClick={delPostOnClick}>네</ModalBtn>
                <ModalBtn onClick={delPostModalClick}>아니요</ModalBtn>
              </ModalBtnBox>
            </ModalBox>
          </ModalBack>
        ) : null}
        {comPickModalView ? (
          <ModalBack>
            <ModalBox>
              <ModalText>
                현재 답변을 채택하시겠습니까? 현상금만큼 보유금이 차감되고
                채택자에게 전달됩니다
              </ModalText>
              <ModalBtnBox>
                <ModalBtn onClick={comPickOnClick}>네</ModalBtn>
                <ModalBtn onClick={comPickOnClick}>아니요</ModalBtn>
              </ModalBtnBox>
            </ModalBox>
          </ModalBack>
        ) : null}
      </Wrapper>
      {scrollY > 500 ? (
        <UpScrollBtn>
          <FiChevronsUp
            className="upscroll"
            type="button"
            onClick={UpScrollOnClick}
          >
            위로가기
          </FiChevronsUp>
        </UpScrollBtn>
      ) : null}
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    </>
  );
}

export default PostView;
