/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable prettier/prettier */
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
  margin: 3px 0 200px 0;
  @media ${(props) => props.theme.tablet} {
    height: auto;
    min-height: 100%;
    margin: 20px 0 166px 0;
    padding: 0 0 0px 0;
  }
  @media ${(props) => props.theme.mobile} {
    height: auto;
    min-height: 100%;
    padding: 0 0 0px 0;
    margin: 30px 0 200px 0;
  }
  @media ${(props) => props.theme.mobile1} {
    height: auto;
    min-height: 100%;
    padding: 0 0 0px 0;
    margin: 18px 0 200px 0;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    height: auto;
    min-height: 100%;
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
  height: auto;
  margin: 0 auto 30px auto;
  border: 2px solid ${(props) => props.theme.btnGreen};
  border-radius: 20px;
  box-shadow: 3px 3px rgba(18, 62, 27, 0.3);
  @media ${(props) => props.theme.tablet} {
    width: 610px;
  }
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

const PostTopBox = styled.div`
  height: 60px;
  display: flex;
  flex-direction: flex;
  align-items: center;
  margin: 8px 25px 0px 25px;
  padding: 0px 0px 8px 0px;
  border-bottom: 1px solid ${(props) => props.theme.btnGreen};
  @media ${(props) => props.theme.tablet} {
  }
  @media ${(props) => props.theme.mobile} {
    margin: 4px 15px 0px 15px;
    padding: 0px 0px 0px 0px;
  }
  @media ${(props) => props.theme.mobile1} {
    margin: 4px 15px 0px 15px;
    padding: 0px 0px 0px 0px;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    margin: 4px 15px 0px 15px;
    padding: 0px 0px 0px 0px;
    height: 50px;
  }
`;

const PostUnpkIcon = styled.div`
  font-size: ${(props) => props.theme.fontSize.tiny};
  height: 45px;
  width: 55px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0 0 0px;
  color: ${(props) => props.theme.btnGreen};
  border: 1px solid ${(props) => props.theme.btnGreen};
  background-color: ${(props) => props.theme.beige};
  @media ${(props) => props.theme.tablet} {
  }
  @media ${(props) => props.theme.mobile} {
    margin: 0 0 0 14px;
    font-size: ${(props) => props.theme.fontSize.micro};
    height: 35px;
    width: 40px;
  }
  @media ${(props) => props.theme.mobile1} {
    margin: 0 0 0 10px;
    font-size: ${(props) => props.theme.fontSize.micro};
    height: 35px;
    width: 40px;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    margin: 0 0 0 6px;
    font-size: ${(props) => props.theme.fontSize.micro};
    height: 30px;
    width: 33px;
  }
`;

const PostPickIcon = styled.div`
  font-size: ${(props) => props.theme.fontSize.tiny};
  height: 45px;
  width: 55px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0 0 0px;
  color: ${(props) => props.theme.beige};
  border: 1px solid ${(props) => props.theme.btnGreen};
  background-color: ${(props) => props.theme.btnGreen};
  @media ${(props) => props.theme.tablet} {
  }
  @media ${(props) => props.theme.mobile} {
    font-size: ${(props) => props.theme.fontSize.micro};
    height: 35px;
    width: 40px;
  }
  @media ${(props) => props.theme.mobile1} {
    font-size: ${(props) => props.theme.fontSize.micro};
    height: 35px;
    width: 40px;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    font-size: ${(props) => props.theme.fontSize.micro};
    height: 30px;
    width: 33px;
  }
`;

const WriterImgBox = styled.div`
  height: 45px;
  width: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1px solid ${(props) => props.theme.btnGreen};
  margin: auto 0px auto 5px;
  overflow: hidden;
  @media ${(props) => props.theme.tablet} {
  }
  @media ${(props) => props.theme.mobile} {
    height: 35px;
    width: 40px;
  }
  @media ${(props) => props.theme.mobile1} {
    height: 35px;
    width: 40px;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    height: 30px;
    width: 30px;
  }
`;

const WriterImg = styled.img`
  height: 45px;
  border-radius: 50%;
  @media ${(props) => props.theme.tablet} {
  }
  @media ${(props) => props.theme.mobile} {
    height: 35px;
  }
  @media ${(props) => props.theme.mobile1} {
    height: 35px;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    height: 30px;
  }
`;

const PostWriter = styled.div`
  width: 400px;
  font-size: ${(props) => props.theme.fontSize.small};
  color: ${(props) => props.theme.black};
  font-weight: bold;
  margin: auto 20px auto 8px;
  overflow: hidden;
  @media ${(props) => props.theme.tablet} {
    width: 270px;
  }
  @media ${(props) => props.theme.mobile} {
    width: 206px;
  }
  @media ${(props) => props.theme.mobile1} {
    font-size: ${(props) => props.theme.fontSize.tiny};
    width: 144px;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    font-size: ${(props) => props.theme.fontSize.tiny};
    margin: auto 20px auto 5px;
    width: 108px;
  }
`;

const PostBtnBox = styled.div`
  display: flex;
  margin: 0px;
`;

const PostMidBox = styled.div`
  // height: 46px;
  margin: 20px 0 14px 0;
  display: flex;
  // align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
  @media ${(props) => props.theme.tablet} {
    margin: 17px 0 14px 0;
  }
  @media ${(props) => props.theme.mobile} {
    margin: 13px 0 10px 0;
  }
  @media ${(props) => props.theme.mobile1} {
    margin: 13px 0 10px 0;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    margin: 13px 0 10px 0;
  }
`;

const PostTitle = styled.div`
  width: auto;
  max-width: 670px;
  font-size: ${(props) => props.theme.fontSize.medium};
  color: ${(props) => props.theme.black};
  border: 1px solid ${(props) => props.theme.btnGreen};
  border-radius: 11px;
  padding: 7px;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  margin: auto auto auto 24px;
  @media ${(props) => props.theme.tablet} {
    max-width: 500px;
    font-size: ${(props) => props.theme.fontSize.small};
  }
  @media ${(props) => props.theme.mobile} {
    max-width: 440px;
    font-size: ${(props) => props.theme.fontSize.mini};
    margin: auto auto auto 14px;
  }
  @media ${(props) => props.theme.mobile1} {
    max-width: 340px;
    font-size: ${(props) => props.theme.fontSize.tiny};
    margin: auto auto auto 14px;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    max-width: 270px;
    font-size: ${(props) => props.theme.fontSize.micro};
    margin: auto auto auto 14px;
  }
`;

const PostBounty = styled.div`
  font-size: ${(props) => props.theme.fontSize.mini};
  width: auto;
  margin: 15px auto auto 24px;
  padding: 8px 8px 6px 8px;
  float: right;
  color: ${(props) => props.theme.beige};
  border: 1px solid ${(props) => props.theme.btnGreen};
  background-color: ${(props) => props.theme.btnGreen};
  border-radius: 10px;
  text-align: center;
  font-family: 'Hanna';
  @media ${(props) => props.theme.tablet} {
    font-size: ${(props) => props.theme.fontSize.tiny};
    padding: 8px 8px 6px 8px;
  }
  @media ${(props) => props.theme.mobile} {
    margin: 10px auto auto 15px;
    padding: 8px 8px 6px 8px;
    font-size: ${(props) => props.theme.fontSize.micro};
  }
  @media ${(props) => props.theme.mobile1} {
    margin: 10px auto auto 15px;
    padding: 8px 8px 6px 8px;
    font-size: ${(props) => props.theme.fontSize.micro};
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    margin: 10px auto auto 15px;
    padding: 8px 8px 6px 8px;
    font-size: ${(props) => props.theme.fontSize.micro};
  }
`;

const PostTagBox = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  width: 690px;
  margin: auto;
  @media ${(props) => props.theme.tablet} {
    width: 560px;
  }
  @media ${(props) => props.theme.mobile} {
    width: 450px;
  }
  @media ${(props) => props.theme.mobile1} {
    width: 350px;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 280px;
  }
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

const PostViewBox = styled.div`
  margin: 15px auto 22px auto;
  padding: 0 12px;
  width: 664px;
  height: auto;
  min-height: 100px;
  font-size: ${(props) => props.theme.fontSize.mini};
  border: 1px solid ${(props) => props.theme.btnGreen};
  border-radius: 8px;
  @media ${(props) => props.theme.tablet} {
    width: 534px;
  }
  @media ${(props) => props.theme.mobile} {
    width: 424px;
    margin: 10px auto 15px auto;
  }
  @media ${(props) => props.theme.mobile1} {
    width: 326px;
    margin: 5px auto 13px auto;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 256px;
    margin: 5px auto 13px auto;
  }
`;

const CommentBox = styled.div`
  width: 740px;
  margin: 0 auto 0 auto;
  display: flex;
  flex-direction: column;
  @media ${(props) => props.theme.tablet} {
    width: 610px;
  }
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

const CommentWriteForm = styled.form`
  border: 2px solid ${(props) => props.theme.btnGreen};
  padding: 0 0 15px 0;
  margin: 0 0 20px 0;
  border-radius: 20px;
  box-shadow: 3px 3px rgba(18, 62, 27, 0.3);
  @media ${(props) => props.theme.tablet} {
  }
  @media ${(props) => props.theme.mobile} {
    padding: 0px;
  }
  @media ${(props) => props.theme.mobile1} {
    padding: 5px 0 5px 0;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    padding: 5px 0 5px 0;
  }
`;

const CommentWriteBox = styled.div`
  display: flex;
  flex-direction: flex;
  align-items: center;
  padding: 10px 25px 0 0;
  @media ${(props) => props.theme.tablet} {
  }
  @media ${(props) => props.theme.mobile} {
    padding: 5px 17px 0px 0px;
  }
  @media ${(props) => props.theme.mobile1} {
    padding: 5px 9px 0px 0px;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    padding: 5px 9px 0px 0px;
  }
`;

const CommentWriteName = styled.div`
  width: 650px;
  padding: 0px 0 0px 25px;
  font-size: ${(props) => props.theme.fontSize.mini};
  @media ${(props) => props.theme.tablet} {
    width: 518px;
  }
  @media ${(props) => props.theme.mobile} {
    width: 400px;
    padding: 0px 0 0px 20px;
  }
  @media ${(props) => props.theme.mobile1} {
    width: 300px;
    padding: 0px 0 0px 15px;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 240px;
    padding: 0px 0 0px 15px;
  }
`;

const CommentTitle = styled.input`
  width: 680px;
  height: 25px;
  border: 2px solid ${(props) => props.theme.btnGreen};
  border-radius: 10px;
  padding: 5px 0 5px 5px;
  font-size: ${(props) => props.theme.fontSize.small};
  color: ${(props) => props.theme.black};
  font-weight: bold;
  margin: 0 0px 10px 23px;
  @media ${(props) => props.theme.tablet} {
    width: 552px;
  }
  @media ${(props) => props.theme.mobile} {
    width: 432px;
    margin: 0 0px 10px 18px;
  }
  @media ${(props) => props.theme.mobile1} {
    width: 341px;
    margin: 5px 0px 10px 14px;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 270px;
    margin: 5px 0px 10px 15px;
  }
`;

const EditorBox = styled.div`
  padding: 0 0 10px 0;
  margin: 0 auto 5px auto;
  width: 690px;
  height: auto;
  @media ${(props) => props.theme.tablet} {
    width: 560px;
  }
  @media ${(props) => props.theme.mobile} {
    width: 442px;
  }
  @media ${(props) => props.theme.mobile1} {
    width: 350px;
    padding: 0 0 6px 0;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 280px;
    padding: 0 0 6px 0;
  }
`;

const CommentItemList = styled.ul``;

const CommentItem = styled.li`
  border: 2px solid ${(props) => props.theme.btnGreen};
  margin: 0 0 10px 0;
  border-radius: 20px;
  box-shadow: 3px 3px rgba(18, 62, 27, 0.3);
`;

const CommentItemHead = styled.div`
  display: flex;
  flex-direction: flex;
  align-items: center;
  padding: 0px 0 10px 0;
  margin: 23px 23px 10px 23px;
  border-bottom: 1px solid ${(props) => props.theme.btnGreen};
  @media ${(props) => props.theme.tablet} {
    margin: 23px 23px 10px 23px;
  }
  @media ${(props) => props.theme.mobile} {
    margin: 23px 23px 10px 23px;
  }
  @media ${(props) => props.theme.mobile1} {
    margin: 10px 15px 10px 15px;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    margin: 10px 15px 10px 15px;
  }
`;

const CommentWriter = styled.div`
  width: 400px;
  margin: 0 0 0 10px;
  font-size: ${(props) => props.theme.fontSize.mini};
  overflow: hidden;
  @media ${(props) => props.theme.tablet} {
    width: 272px;
  }
  @media ${(props) => props.theme.mobile} {
    font-size: ${(props) => props.theme.fontSize.tiny};
    width: 205px;
  }
  @media ${(props) => props.theme.mobile1} {
    font-size: ${(props) => props.theme.fontSize.tiny};
    margin: 0 0 0 4px;
    width: 145px;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    font-size: ${(props) => props.theme.fontSize.micro};
    margin: 0 0 0 3px;
    width: 105px;
  }
`;

const CommentItemBtnBox = styled.div`
  display: flex;
  flex-direction: flex;
  margin: auto 0px auto 0;
  @media ${(props) => props.theme.tablet} {
  }
  @media ${(props) => props.theme.mobile} {
  }
  @media ${(props) => props.theme.mobile1} {
    margin: auto 8px auto 0;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    margin: auto 4px auto 0;
  }
`;

const CommentItemTitle = styled.div`
  width: auto;
  max-width: 650px;
  font-size: ${(props) => props.theme.fontSize.small};
  color: ${(props) => props.theme.black};
  border: 1px solid ${(props) => props.theme.btnGreen};
  border-radius: 11px;
  display: inline-block;
  padding: 8px;
  font-weight: bold;
  margin: 10px 0 20px 24px;
  white-space: nowrap;
  overflow: hidden;
  @media ${(props) => props.theme.tablet} {
    max-width: 500px;
  }
  @media ${(props) => props.theme.mobile} {
    font-size: ${(props) => props.theme.fontSize.small};
    margin: 3px 0 0px 14px;
  }
  @media ${(props) => props.theme.mobile1} {
    font-size: ${(props) => props.theme.fontSize.mini};
    margin: 6px 0 0px 10px;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    font-size: ${(props) => props.theme.fontSize.mini};
    margin: 6px 0 0px 4px;
  }
`;

const ViewerBox = styled.div`
  padding: 0 12px 0px 12px;
  margin: 0px auto 22px auto;
  width: 664px;
  height: auto;
  border: 1px solid ${(props) => props.theme.btnGreen};
  border-radius: 8px;
  @media ${(props) => props.theme.tablet} {
    width: 532px;
  }
  @media ${(props) => props.theme.mobile} {
    width: 442px;
  }
  @media ${(props) => props.theme.mobile1} {
    width: 350px;
    padding: 0 0 0px 0;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 290px;
    padding: 0 0 0px 0;
  }
`;

const CommonHideBtn = styled.div`
  width: 60px;
  height: 30px;
  margin: 10px 10px 10px 10px;
  @media ${(props) => props.theme.tablet} {
  }
  @media ${(props) => props.theme.mobile} {
    height: 25px;
    width: 43px;
  }
  @media ${(props) => props.theme.mobile1} {
    margin: 5px;
    height: 27px;
    width: 35px;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    margin: 2px;
    height: 27px;
    width: 35px;
  }
`;

const CommonBtn = styled.button`
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
  @media ${(props) => props.theme.tablet} {
  }
  @media ${(props) => props.theme.mobile} {
    font-size: ${(props) => props.theme.fontSize.tiny};
    height: 27px;
    width: 43px;
  }
  @media ${(props) => props.theme.mobile1} {
    font-size: ${(props) => props.theme.fontSize.micro};
    margin: 5px;
    height: 27px;
    width: 35px;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    font-size: ${(props) => props.theme.fontSize.micro};
    margin: 2px;
    height: 27px;
    width: 35px;
  }
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
  border: 1px solid ${(props) => props.theme.btnGreen};
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
    width: 25px;
    height: 25px;
    right: 4px;
    bottom: 240px;
    border-radius: 10px;
  }
  @media ${(props) => props.theme.mobile1} {
    width: 25px;
    height: 25px;
    right: 4px;
    bottom: 240px;
    border-radius: 10px;
  }
  @media ${(props) => props.theme.mobile} {
    width: 25px;
    height: 25px;
    right: 8px;
    bottom: 240px;
    border-radius: 10px;
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

export const BackBtn = styled.button`
  background-color: ${(props) => props.theme.beige};
  color: ${(props) => props.theme.btnGreen};
  font-size: ${(props) => props.theme.fontSize.mini};
  font-weight: bold;
  border: none;
  position: absolute;
  top: 125px;
  left: 50px;
  cursor: pointer;
  @media ${(props) => props.theme.tablet} {
    font-size: ${(props) => props.theme.fontSize.mini};
    top: 100px;
    left: 30px;
  }
  @media ${(props) => props.theme.mobile} {
    font-size: ${(props) => props.theme.fontSize.tiny};
    top: 100px;
    left: 15px;
  }
  @media ${(props) => props.theme.mobile1} {
    font-size: ${(props) => props.theme.fontSize.tiny};
    top: 70px;
    left: 15px;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    font-size: ${(props) => props.theme.fontSize.tiny};
    top: 70px;
    left: 35px;
  }
`;

const PostBtn = styled(CommonBtn)``;

function PostView() {
  const { userData, itemData } = useSelector((state: RootState) => state);
  const { userInfo, accessToken, isLogin } = userData;
  const [comments, setComments] = useState<any[]>([]);
  const [comId, setComId] = useState('');
  const [comWriterId, setComWriterId] = useState('');
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
    selection: boolean;
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
    selection: false,
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
  }, [comModalView, comDelModalView, comPickModalView, setComPickModalView]);

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

  const pickComOnClick = async () => {
    await axios.post(
      `${process.env.REACT_APP_SERVER}/posts/select/comment`,
      {
        myId: data.writer,
        yourId: comWriterId,
        postId: data.id,
        commentId: comId,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      },
    );
    setComPickModalView(!comPickModalView);
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

  const comPickOnClick = (id: string, comId: any) => {
    setComWriterId(id);
    setComId(comId);
    setComPickModalView(!comPickModalView);
  };

  const comPickModalClick = () => {
    setComPickModalView(!comPickModalView);
  };

  const goBackOnClick = () => {
    navigate(`/search`);
  };

  interface IComState {
    post_id: string;
    writer: string;
    title: string;
    content: string;
    writerName: string;
    writerImg: string;
    selection: boolean;
    _id: number;
  }

  return (
    <>
      <Nav />
      <BackBtn onClick={goBackOnClick}>{`< 목록으로 돌아가기`}</BackBtn>
      <Wrapper>
        <PostBox>
          <PostTopBox>
            {data.selection ? (
              <PostPickIcon>채택</PostPickIcon>
            ) : (
              <PostUnpkIcon>채택중</PostUnpkIcon>
            )}
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
            {userInfo.id === data?.writer ? (
              <PostBtnBox>
                <CommonBtn onClick={postModifyOnClick}>수정</CommonBtn>
                <CommonBtn onClick={delPostModalClick}>삭제</CommonBtn>
              </PostBtnBox>
            ) : (
              <PostBtnBox>
                {isLogin ? (
                  <>
                    <CommonHideBtn />
                    <PostBtn onClick={postChatOnClick}>채팅</PostBtn>
                  </>
                ) : (
                  <>
                    <CommonHideBtn />
                    <CommonHideBtn />
                  </>
                )}
              </PostBtnBox>
            )}
          </PostTopBox>
          <PostMidBox>
            <PostTitle>{data.title}</PostTitle>
            <PostBounty>현상금 : {data.bounty}원</PostBounty>
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
          <PostViewBox>
            <Viewer
              initialValue={postCon.content}
              plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
            />
          </PostViewBox>
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
                maxLength={36}
                placeholder="제목은 여기에"
                onChange={conTitleOnChange}
              />
              <EditorBox>
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
              </EditorBox>
            </CommentWriteForm>
          ) : null}
          <>
            <CommentItemList>
              {comments.map((com: IComState) => (
                <CommentItem key={nanoid()}>
                  <CommentItemHead>
                    {com.selection ? (
                      <PostPickIcon>채택글</PostPickIcon>
                    ) : (
                      <PostUnpkIcon>미채택</PostUnpkIcon>
                    )}
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
                        {userInfo.id === com.writer ? (
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
                          <CommentItemBtnBox>
                            {userInfo.id === data.writer && !data.selection ? (
                              <CommonBtn
                                onClick={() =>
                                  comPickOnClick(com.writer, com._id)
                                }
                              >
                                채택
                              </CommonBtn>
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
                          </CommentItemBtnBox>
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
          </>
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
                채택하시면 이를 취소할 수 없고, 현상금만큼 보유금이 차감되어
                채택자에게 전달됩니다
              </ModalText>
              <ModalBtnBox>
                <ModalBtn onClick={pickComOnClick}>네</ModalBtn>
                <ModalBtn onClick={comPickModalClick}>아니요</ModalBtn>
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
