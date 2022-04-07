import styled from 'styled-components';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { nanoid } from '@reduxjs/toolkit';
import { RootState, ItemRender, AppDispatch } from 'index';
import { Viewer } from '@toast-ui/react-editor';
import { FiChevronsUp } from 'react-icons/fi';
import '@toast-ui/editor/dist/toastui-editor.css';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import Nav from 'Components/Nav';
import Footer from 'Components/Footer';
import noneHolder from '../Image/Logo/posts.svg';

const Wrapper = styled.div`
  width: 100%;
  min-height: 618px;
  margin: 0px 0 200px 0;
  @media ${(props) => props.theme.tablet} {
    height: auto;
    min-height: 868px;
    margin: 20px 0 166px 0;
    padding: 0 0 0px 0;
  }
  @media ${(props) => props.theme.mobile} {
    height: auto;
    min-height: 713px;
    padding: 0 0 0px 0;
    margin: 30px 0 200px 0;
  }
  @media ${(props) => props.theme.mobile1} {
    height: auto;
    min-height: 607px;
    padding: 0 0 0px 0;
    margin: 18px 0 200px 0;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    height: auto;
    min-height: 536px;
    padding: 0 0 0px 0;
    margin: 18px 0 200px 0;
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
  @media ${(props) => props.theme.mobile1} {
    height: 200px;
    position: relative;
    margin-top: -200px;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    height: 200px;
    position: relative;
    margin-top: -200px;
  }
`;

const PostBox = styled.div`
  width: 740px;
  margin: 0 auto 0 auto;
  display: flex;
  flex-direction: column;
  @media ${(props) => props.theme.mobile} {
    width: 480px;
  }
  @media ${(props) => props.theme.mobile1} {
    width: 380px;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 310px;
  }
`;

const PostItem = styled.div`
  border: 2px solid ${(props) => props.theme.btnGreen};
  margin: 0 0 20px 0;
  border-radius: 20px;
  box-shadow: 3px 3px rgba(18, 62, 27, 0.3);
`;

const ItemTitleBox = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.btnGreen};
  margin: 25px 25px 10px 25px;
  padding: 0 0 10px 0;
  @media ${(props) => props.theme.mobile} {
    margin: 15px 15px 10px 15px;
  }
  @media ${(props) => props.theme.mobile1} {
    margin: 15px 15px 10px 15px;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    margin: 15px 15px 10px 15px;
  }
`;

const ItemTitle = styled.div`
  width: auto;
  max-width: 530px;
  height: 23px;
  font-size: ${(props) => props.theme.fontSize.small};
  color: ${(props) => props.theme.black};
  border: 1px solid ${(props) => props.theme.btnGreen};
  border-radius: 11px;
  display: inline-block;
  padding: 6px;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
`;

const MidBox = styled.div`
  display: flex;
  margin: 10px 25px 0 25px;
  @media ${(props) => props.theme.mobile} {
    margin: 10px 15px 0px 15px;
  }
  @media ${(props) => props.theme.mobile1} {
    margin: 10px 15px 0px 15px;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    margin: 10px 15px 0px 15px;
  }
`;

const ItemBox = styled.div`
  display: flex;
  width: 50%;
  @media ${(props) => props.theme.mobile} {
    width: 55%;
  }
  @media ${(props) => props.theme.mobile1} {
    width: 53%;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 55%;
  }
`;

const ItemBounty = styled.div`
  font-size: ${(props) => props.theme.fontSize.mini};
  margin: auto 12px auto 0px;
  padding: 6px;
  color: ${(props) => props.theme.beige};
  border: 1px solid ${(props) => props.theme.btnGreen};
  background-color: ${(props) => props.theme.btnGreen};
  border-radius: 10px;
  @media ${(props) => props.theme.mobile} {
    font-size: ${(props) => props.theme.fontSize.tiny};
    margin: auto 6px auto 0px;
  }
  @media ${(props) => props.theme.mobile1} {
    font-size: ${(props) => props.theme.fontSize.tiny};
    margin: auto 6px auto 0px;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    font-size: ${(props) => props.theme.fontSize.micro};
    margin: auto 6px auto 0px;
  }
`;

const ItemComCount = styled.div`
  font-size: ${(props) => props.theme.fontSize.mini};
  margin: auto 12px auto 0px;
  padding: 6px;
  color: ${(props) => props.theme.beige};
  border: 1px solid ${(props) => props.theme.btnGreen};
  background-color: ${(props) => props.theme.btnGreen};
  border-radius: 10px;
  @media ${(props) => props.theme.mobile} {
    font-size: ${(props) => props.theme.fontSize.tiny};
    margin: auto 6px auto 0px;
  }
  @media ${(props) => props.theme.mobile1} {
    font-size: ${(props) => props.theme.fontSize.tiny};
    margin: auto 6px auto 0px;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    font-size: ${(props) => props.theme.fontSize.micro};
    margin: auto 6px auto 0px;
  }
`;

const BtnBox = styled.div`
  display: flex;
  flex-direction: row-reverse;
  width: 50%;
  margin: 0px 0px 0 0;
  @media ${(props) => props.theme.mobile} {
    width: 45%;
  }
  @media ${(props) => props.theme.mobile1} {
    width: 47%;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 45%;
  }
`;

const ItemBtn = styled.button`
  background-color: ${(props) => props.theme.beige};
  color: ${(props) => props.theme.black};
  border: 1px solid ${(props) => props.theme.btnGreen};
  border-radius: 10px;
  margin: 10px 0px 10px 20px;
  font-size: ${(props) => props.theme.fontSize.tiny};
  width: 60px;
  height: 30px;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    background-color: ${(props) => props.theme.white};
    color: ${(props) => props.theme.pink};
    font-weight: bold;
    box-shadow: 3px 3px rgba(18, 62, 27, 0.3);
  }
  @media ${(props) => props.theme.mobile} {
    font-size: ${(props) => props.theme.fontSize.tiny};
    height: 27px;
    width: 43px;
  }
  @media ${(props) => props.theme.mobile1} {
    font-size: ${(props) => props.theme.fontSize.micro};
    margin: 5px 0px 5px 6px;
    height: 27px;
    width: 35px;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    font-size: ${(props) => props.theme.fontSize.micro};
    margin: 5px 0px 5px 6px;
    height: 27px;
    width: 35px;
  }
`;

const ViewerBox = styled.div`
  padding: 0 12px 0px 12px;
  margin: 15px auto 22px auto;
  width: 664px;
  height: auto;
  border: 1px solid ${(props) => props.theme.btnGreen};
  border-radius: 8px;
  @media ${(props) => props.theme.mobile} {
    margin: 10px auto 23px auto;
    width: 420px;
  }
  @media ${(props) => props.theme.mobile1} {
    margin: 10px auto 14px auto;
    width: 318px;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    margin: 10px auto 14px auto;
    width: 250px;
  }
`;

const PostDelModalBack = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
`;

const PostDelText = styled.div`
  font-size: ${(props) => props.theme.fontSize.small};
  width: 290px;
  margin-top: 20px;
  text-align: center;
`;

const PostDelModalBox = styled.div`
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

const PostDelModalBtnBox = styled.div``;

const PostDelModalBtn = styled.button`
  background-color: ${(props) => props.theme.white};
  color: ${(props) => props.theme.btnGreen};
  border: 1px solid ${(props) => props.theme.btnGreen};
  border-radius: 11px;
  margin: 20px;
  font-size: ${(props) => props.theme.fontSize.tiny};
  width: 80px;
  height: 30px;
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.pink};
    font-weight: bold;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  }
`;

const NoneBox = styled.div`
  margin: 0 auto 0 auto;
  height: auto;
  text-align: center;
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 300px;
  }
  @media ${(props) => props.theme.mobile1} {
    width: 400px;
  }
  @media ${(props) => props.theme.mobile} {
    width: 500px;
  }
  @media ${(props) => props.theme.tablet} {
    width: 600px;
  }
  @media ${(props) => props.theme.desktop} {
    width: 600px;
  }
  @media ${(props) => props.theme.desktop1} {
    width: 600px;
  }
  @media ${(props) => props.theme.desktop2} {
    width: 650px;
  }
`;

const NoneImg = styled.img`
  margin: 0 0 30px 0;
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 300px;
  }
  @media ${(props) => props.theme.mobile1} {
    width: 300px;
  }
  @media ${(props) => props.theme.mobile} {
    width: 400px;
  }
  @media ${(props) => props.theme.tablet} {
    width: 500px;
  }
  @media ${(props) => props.theme.desktop} {
    width: 500px;
  }
  @media ${(props) => props.theme.desktop1} {
    width: 500px;
  }
  @media ${(props) => props.theme.desktop2} {
    width: 570px;
  }
`;

const NoneText = styled.div`
  font-size: ${(props) => props.theme.fontSize.medium};
  font-weight: bold;
  width: auto;
  color: ${(props) => props.theme.btnGreen};
  @media ${(props) => props.theme.iPhone12Pro} {
    font-size: ${(props) => props.theme.fontSize.small};
  }
  @media ${(props) => props.theme.mobile1} {
    font-size: ${(props) => props.theme.fontSize.small};
  }
  @media ${(props) => props.theme.mobile} {
    font-size: ${(props) => props.theme.fontSize.small};
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

function Mypost() {
  const { userData } = useSelector((state: RootState) => state);
  const { userInfo, accessToken } = userData;
  const [posts, setPosts] = useState<any[]>([]);
  const [postId, setPostId] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [postDelModalView, setPostDelModalView] = useState(false);
  const [postMoveModalView, setPostMoveModalView] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  interface IPost {
    bounty: number;
    comment: string[];
    content: string;
    createdAt: string;
    id: number;
    tag: string[];
    title: string;
    updatedAt: string;
    writer: number;
    writerName: string;
    __v: number;
    _id: number;
  }

  useEffect(() => {
    const getPosts = async () => {
      const data = await axios.post(
        `${process.env.REACT_APP_SERVER}/posts/mypost`,
        { id: userInfo.id },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        },
      );
      const item = data.data.data;
      setPosts(item);
    };
    getPosts();
  }, [postDelModalView]);

  const handleFollow = () => {
    setScrollY(window.pageYOffset); // window 스크롤 값을 ScrollY에 저장
  };

  const UpScrollOnClick = () => {
    if (!window.scrollY) {
      return;
    }
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
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

  const delPostOnClick = async () => {
    await axios.post(
      `${process.env.REACT_APP_SERVER}/posts/${postId}`,
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
    setPostDelModalView(!postDelModalView);
  };

  const delPostModalClick = useCallback(
    (id: number) => {
      setPostId(id);
      setPostDelModalView(!postDelModalView);
    },
    [postId, setPostId, postDelModalView, setPostDelModalView],
  );

  const delPostClick = () => {
    setPostDelModalView(!postDelModalView);
  };

  const moveConfirmPostClick = useCallback(
    (id: number) => {
      setPostId(id);
      setPostMoveModalView(!postMoveModalView);
    },
    [postId, setPostId, postMoveModalView, setPostMoveModalView],
  );

  const movePostClick = async () => {
    const data = await axios.get(
      `${process.env.REACT_APP_SERVER}/posts/${postId}/content`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      },
    );
    dispatch(ItemRender(data.data.data));
    navigate(`/post/${postId}`);
  };

  const dontPostClick = () => {
    setPostMoveModalView(!postMoveModalView);
  };

  const postModifyOnClick = (id: number, con: string) => {
    dispatch(ItemRender([{ content: con }]));
    navigate(`/post/modify/${id}`);
  };

  return (
    <>
      <Nav />
      <Wrapper>
        {posts.length !== 0 ? (
          <PostBox>
            {posts.map((post: IPost) => (
              <PostItem key={nanoid()}>
                <ItemTitleBox>
                  <ItemTitle>{post.title}</ItemTitle>
                </ItemTitleBox>
                <MidBox>
                  <ItemBox>
                    <ItemBounty>현상금: {post.bounty}원</ItemBounty>
                    <ItemComCount>답글수: {post.comment.length}개</ItemComCount>
                  </ItemBox>
                  <BtnBox>
                    <ItemBtn onClick={() => delPostModalClick(post.id)}>
                      삭제
                    </ItemBtn>
                    <ItemBtn
                      onClick={() => postModifyOnClick(post.id, post.content)}
                    >
                      수정
                    </ItemBtn>
                    <ItemBtn onClick={() => moveConfirmPostClick(post.id)}>
                      이동
                    </ItemBtn>
                  </BtnBox>
                </MidBox>
                <ViewerBox>
                  <Viewer
                    initialValue={post.content}
                    plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
                  />
                </ViewerBox>
              </PostItem>
            ))}
          </PostBox>
        ) : (
          <NoneBox>
            <NoneImg src={noneHolder} />
            <NoneText>작성한 게시글이 없네요</NoneText>
          </NoneBox>
        )}
        {postDelModalView ? (
          <PostDelModalBack>
            <PostDelModalBox>
              <PostDelText>게시글을 삭제하실 건가요?</PostDelText>
              <PostDelModalBtnBox>
                <PostDelModalBtn onClick={delPostOnClick}>네</PostDelModalBtn>
                <PostDelModalBtn onClick={delPostClick}>아니요</PostDelModalBtn>
              </PostDelModalBtnBox>
            </PostDelModalBox>
          </PostDelModalBack>
        ) : null}
        {postMoveModalView ? (
          <PostDelModalBack>
            <PostDelModalBox>
              <PostDelText>해당 게시글로 이동하실건가요?</PostDelText>
              <PostDelModalBtnBox>
                <PostDelModalBtn onClick={movePostClick}>네</PostDelModalBtn>
                <PostDelModalBtn onClick={dontPostClick}>
                  아니요
                </PostDelModalBtn>
              </PostDelModalBtnBox>
            </PostDelModalBox>
          </PostDelModalBack>
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

export default Mypost;
