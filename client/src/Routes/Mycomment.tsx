/* eslint-disable no-underscore-dangle */
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { nanoid } from '@reduxjs/toolkit';
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import { RootState, ItemRender, ComRender, AppDispatch } from 'index';
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
  margin: 0 auto 0 auto;
  height: auto;
  width: 600px;
`;

const ComItem = styled.div`
  border: 1px solid ${(props) => props.theme.grey};
  margin: 0 auto 30px auto;
`;

const ItemTitle = styled.div`
  width: auto;
  max-width: 530px;
  height: 23px;
  font-size: ${(props) => props.theme.fontSize.small};
  color: ${(props) => props.theme.black};
  border: 1px solid ${(props) => props.theme.grey};
  border-radius: 11px;
  display: inline-block;
  padding: 6px;
  font-weight: bold;
  margin: 25px 25px 20px 25px;
  white-space: nowrap;
  overflow: hidden;
`;

const ViewerBox = styled.div`
  margin: 0 auto 0 auto;
  width: 542px;
  height: auto;
`;

const ComBot = styled.div`
  width: 576px;
  height: 60px;
  margin: 5px 0 0 0;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
`;

const ItemBtn = styled.button`
  background-color: ${(props) => props.theme.white};
  color: ${(props) => props.theme.btnGreen};
  border: 1px solid ${(props) => props.theme.grey};
  border-radius: 11px;
  margin: 10px;
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

const ComDelModalBack = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
`;

const ComDelText = styled.div`
  font-size: ${(props) => props.theme.fontSize.small};
  width: 290px;
  margin-top: 20px;
  text-align: center;
`;

const ComDelModalBox = styled.div`
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

const ComDelModalBtnBox = styled.div``;

const ComDelModalBtn = styled.button`
  background-color: ${(props) => props.theme.white};
  color: ${(props) => props.theme.btnGreen};
  border: 1px solid ${(props) => props.theme.grey};
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

const ComPlaceholder = styled.div``;

function Mycomment() {
  const { userData } = useSelector((state: RootState) => state);
  const { userInfo, accessToken } = userData;
  const [coms, setComs] = useState<any[]>([]);
  const [comId, setComId] = useState(0);
  const [postId, setPostId] = useState(0);
  const [comDelModalView, setComDelModalView] = useState(false);
  const [comMoveModalView, setComMoveModalView] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  interface ICom {
    content: string;
    createdAt: string;
    post_id: number;
    title: string;
    updatedAt: string;
    writer: number;
    writerName: string;
    __v: number;
    _id: number;
  }

  useEffect(() => {
    const getComs = async () => {
      const data = await axios.post(
        `${process.env.REACT_APP_SERVER}/posts/mycomment`,
        { id: userInfo.id },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        },
      );
      // console.log(data);
      const item = data.data.data;
      setComs(item);
    };
    getComs();
  }, [comDelModalView]);
  // console.log(coms);

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

  const modComOnClick = (id: number, con: string) => {
    dispatch(ComRender([con]));
    navigate(`/comment/${id}`);
  };

  const delComModalClick = (id: number) => {
    setComId(id);
    setComDelModalView(!comDelModalView);
  };

  const delComClick = () => {
    setComDelModalView(!comDelModalView);
  };

  const moveConfirmPostClick = (id: number) => {
    setPostId(id);
    setComMoveModalView(!comMoveModalView);
  };

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

  const dontComClick = () => {
    setComMoveModalView(!comMoveModalView);
  };

  return (
    <>
      <Nav />
      <Wrapper>
        {coms.length !== 0 ? (
          <ComBox>
            {coms.map((com: ICom) => (
              <ComItem key={nanoid()}>
                <ItemTitle>{com.title}</ItemTitle>
                <ViewerBox>
                  <Viewer
                    initialValue={com.content}
                    plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
                  />
                </ViewerBox>
                <ComBot>
                  <ItemBtn onClick={() => moveConfirmPostClick(com.post_id)}>
                    이동
                  </ItemBtn>
                  <ItemBtn onClick={() => modComOnClick(com._id, com.content)}>
                    수정
                  </ItemBtn>
                  <ItemBtn onClick={() => delComModalClick(com._id)}>
                    삭제
                  </ItemBtn>
                </ComBot>
              </ComItem>
            ))}
          </ComBox>
        ) : (
          <ComPlaceholder>작성한 답글이 없네요</ComPlaceholder>
        )}
        {comDelModalView ? (
          <ComDelModalBack>
            <ComDelModalBox>
              <ComDelText>답글을 삭제하실 건가요?</ComDelText>
              <ComDelModalBtnBox>
                <ComDelModalBtn onClick={delComOnClick}>네</ComDelModalBtn>
                <ComDelModalBtn onClick={delComClick}>아니요</ComDelModalBtn>
              </ComDelModalBtnBox>
            </ComDelModalBox>
          </ComDelModalBack>
        ) : null}
        {comMoveModalView ? (
          <ComDelModalBack>
            <ComDelModalBox>
              <ComDelText>해당 게시글로 이동하실건가요?</ComDelText>
              <ComDelModalBtnBox>
                <ComDelModalBtn onClick={movePostClick}>네</ComDelModalBtn>
                <ComDelModalBtn onClick={dontComClick}>아니요</ComDelModalBtn>
              </ComDelModalBtnBox>
            </ComDelModalBox>
          </ComDelModalBack>
        ) : null}
      </Wrapper>
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    </>
  );
}

export default Mycomment;
