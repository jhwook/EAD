import axios from 'axios';
import { useState } from 'react';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import { nanoid } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, inSearch, RootState } from 'index';

interface IStackProps {
  bgColor: string;
  color: string;
}

const StackWrapper = styled.div`
  width: 70%;
  padding: 30px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const UpBox = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;
const DownBox = styled.div`
  display: flex;
  justify-content: center;
`;

const Stack = styled.div<IStackProps>`
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.color};
  font-size: ${(props) => props.theme.fontSize.small};
  font-weight: bold;
  padding: 10px;
  margin: 0px 5px;
  border: 2px solid ${(props) => props.theme.btnGreen};
  box-shadow: rgba(0, 0, 0, 0.3) 3px 3px;
  border-radius: 10px;
  cursor: pointer;
`;

const Searchbar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 0;
  .search {
    font-size: ${(props) => props.theme.fontSize.large};
  }
`;
const SearchInput = styled.input`
  width: 700px;
  height: 20px;
  border: 3px solid ${(props) => props.theme.green};
  padding: 10px 10px 10px 15px;
  margin-right: 5px;
  font-size: ${(props) => props.theme.fontSize.small};
  box-shadow: rgba(0, 0, 0, 0.3) 3px 3px;
`;

const Form = styled.form`
  display: flex;
  align-items: center;
`;

const SearchBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Button = styled.button`
  border: none;
  background-color: inherit;
  cursor: pointer;
`;

const DeleteBtn = styled.div`
  font-size: ${(props) => props.theme.fontSize.small};
  font-weight: bold;
  position: absolute;
  top: 12px;
  right: 35px;
  cursor: pointer;
`;

const ListWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Lists = styled.ul`
  width: 50vw;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  text-align: center;
  place-items: center;
  margin-top: 50px;
  margin-bottom: 50px;
`;
const List = styled.li`
  width: 250px;
  height: 250px;
  border: 2px solid ${(props) => props.theme.btnGreen};
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.3) 3px 3px;
  cursor: pointer;
`;

const UpSide = styled.div`
  width: 100%;
  height: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const DownSide = styled.div`
  width: 100%;
  height: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const Title = styled.div`
  font-size: ${(props) => props.theme.fontSize.medium};
`;
const Tag = styled.div`
  width: 70px;
  color: ${(props) => props.theme.btnGreen};
  font-size: ${(props) => props.theme.fontSize.tiny};
  font-weight: bold;
  padding: 3px 4px;
  border: 2px solid ${(props) => props.theme.btnGreen};
  border-radius: 15px;
  margin: 5px;
`;

function Search() {
  const [value, setValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [html, setHtml] = useState(false);
  const [js, setJs] = useState(false);
  const [css, setCss] = useState(false);
  const [react, setReact] = useState(false);
  const [redux, setRedux] = useState(false);
  const [ts, setTs] = useState(false);
  const [sc, setSc] = useState(false);
  const [node, setNode] = useState(false);
  const [express, setExpress] = useState(false);
  const [aws, setAws] = useState(false);
  const [git, setGit] = useState(false);
  const [all, setAll] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { postData } = useSelector((state: RootState) => state);
  const [post, setPost] = useState(postData);

  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await axios.post(
      `${process.env.REACT_APP_SERVER}/posts/search?keyword=${value}`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      },
    );
    dispatch(inSearch(data.data.data));
    setPost(postData);
    setErrorMessage('여기에 입력해주세요!');
    setValue('');
    navigate(`/search?keyword=${value}`);
  };

  const deleteValueOnClick = () => {
    setValue('');
  };

  const checkOnClick = async (el: string) => {
    const filteredPost = postData.filter((post) => {
      return post.tag.includes(el);
    });

    if (el === 'all') {
      setPost(postData);
    } else {
      setPost(filteredPost);
    }

    if (el === 'html') {
      setHtml(!html);
      setAll(false);
      setCss(false);
      setJs(false);
      setReact(false);
      setRedux(false);
      setTs(false);
      setSc(false);
      setNode(false);
      setExpress(false);
      setAws(false);
      setGit(false);
    } else if (el === 'css') {
      setCss(!css);
      setAll(false);
      setHtml(false);
      setJs(false);
      setReact(false);
      setRedux(false);
      setTs(false);
      setSc(false);
      setNode(false);
      setExpress(false);
      setAws(false);
      setGit(false);
    } else if (el === 'javascript') {
      setJs(!js);
      setAll(false);
      setHtml(false);
      setCss(false);
      setReact(false);
      setRedux(false);
      setTs(false);
      setSc(false);
      setNode(false);
      setExpress(false);
      setAws(false);
      setGit(false);
    } else if (el === 'react') {
      setReact(!react);
      setAll(false);
      setHtml(false);
      setCss(false);
      setJs(false);
      setRedux(false);
      setTs(false);
      setSc(false);
      setNode(false);
      setExpress(false);
      setAws(false);
      setGit(false);
    } else if (el === 'redux') {
      setRedux(!redux);
      setAll(false);
      setHtml(false);
      setCss(false);
      setJs(false);
      setReact(false);
      setTs(false);
      setSc(false);
      setNode(false);
      setExpress(false);
      setAws(false);
      setGit(false);
    } else if (el === 'typescript') {
      setTs(!ts);
      setAll(false);
      setHtml(false);
      setCss(false);
      setJs(false);
      setReact(false);
      setRedux(false);
      setSc(false);
      setNode(false);
      setExpress(false);
      setAws(false);
      setGit(false);
    } else if (el === 'styledcomponents') {
      setSc(!sc);
      setAll(false);
      setHtml(false);
      setCss(false);
      setJs(false);
      setReact(false);
      setRedux(false);
      setTs(false);
      setNode(false);
      setExpress(false);
      setAws(false);
      setGit(false);
    } else if (el === 'node') {
      setNode(!node);
      setAll(false);
      setHtml(false);
      setCss(false);
      setJs(false);
      setReact(false);
      setRedux(false);
      setTs(false);
      setSc(false);
      setExpress(false);
      setAws(false);
      setGit(false);
    } else if (el === 'express') {
      setExpress(!express);
      setAll(false);
      setHtml(false);
      setCss(false);
      setJs(false);
      setReact(false);
      setRedux(false);
      setTs(false);
      setSc(false);
      setNode(false);
      setAws(false);
      setGit(false);
    } else if (el === 'aws') {
      setAws(!aws);
      setAll(false);
      setHtml(false);
      setCss(false);
      setJs(false);
      setReact(false);
      setRedux(false);
      setTs(false);
      setSc(false);
      setNode(false);
      setExpress(false);
      setGit(false);
    } else if (el === 'git') {
      setGit(!git);
      setAll(false);
      setHtml(false);
      setCss(false);
      setJs(false);
      setReact(false);
      setRedux(false);
      setTs(false);
      setSc(false);
      setNode(false);
      setExpress(false);
      setAws(false);
    } else if (el === 'all') {
      setAll(false);
      setAll(!all);
      setHtml(false);
      setCss(false);
      setJs(false);
      setReact(false);
      setRedux(false);
      setTs(false);
      setSc(false);
      setNode(false);
      setExpress(false);
      setAws(false);
      setGit(false);
    }
  };

  const postOnClick = (id: number) => {
    navigate(`/post/${id}`);
  };

  return (
    <>
      <StackWrapper>
        <UpBox>
          {all ? (
            <Stack
              bgColor="#5A9E7A"
              color="white"
              onClick={() => checkOnClick('all')}
            >
              All
            </Stack>
          ) : (
            <Stack
              bgColor="white"
              color="#5A9E7A"
              onClick={() => checkOnClick('all')}
            >
              All
            </Stack>
          )}
          {html ? (
            <Stack
              bgColor="#5A9E7A"
              color="white"
              onClick={() => checkOnClick('html')}
            >
              HTML
            </Stack>
          ) : (
            <Stack
              bgColor="white"
              color="#5A9E7A"
              onClick={() => checkOnClick('html')}
            >
              HTML
            </Stack>
          )}
          {css ? (
            <Stack
              bgColor="#5A9E7A"
              color="white"
              onClick={() => checkOnClick('css')}
            >
              CSS
            </Stack>
          ) : (
            <Stack
              bgColor="white"
              color="#5A9E7A"
              onClick={() => checkOnClick('css')}
            >
              CSS
            </Stack>
          )}
          {js ? (
            <Stack
              bgColor="#5A9E7A"
              color="white"
              onClick={() => checkOnClick('javascript')}
            >
              JavaScript
            </Stack>
          ) : (
            <Stack
              color="#5A9E7A"
              bgColor="white"
              onClick={() => checkOnClick('javascript')}
            >
              JavaScript
            </Stack>
          )}
          {react ? (
            <Stack
              bgColor="#5A9E7A"
              color="white"
              onClick={() => checkOnClick('react')}
            >
              React
            </Stack>
          ) : (
            <Stack
              color="#5A9E7A"
              bgColor="white"
              onClick={() => checkOnClick('react')}
            >
              React
            </Stack>
          )}
          {redux ? (
            <Stack
              bgColor="#5A9E7A"
              color="white"
              onClick={() => checkOnClick('redux')}
            >
              Redux
            </Stack>
          ) : (
            <Stack
              color="#5A9E7A"
              bgColor="white"
              onClick={() => checkOnClick('redux')}
            >
              Redux
            </Stack>
          )}
        </UpBox>
        <DownBox>
          {ts ? (
            <Stack
              bgColor="#5A9E7A"
              color="white"
              onClick={() => checkOnClick('typescript')}
            >
              TypeScript
            </Stack>
          ) : (
            <Stack
              color="#5A9E7A"
              bgColor="white"
              onClick={() => checkOnClick('typescript')}
            >
              TypeScript
            </Stack>
          )}
          {sc ? (
            <Stack
              bgColor="#5A9E7A"
              color="white"
              onClick={() => checkOnClick('styledcomponents')}
            >
              Styled-Component
            </Stack>
          ) : (
            <Stack
              color="#5A9E7A"
              bgColor="white"
              onClick={() => checkOnClick('styledcomponents')}
            >
              Styled-Component
            </Stack>
          )}
          {node ? (
            <Stack
              bgColor="#5A9E7A"
              color="white"
              onClick={() => checkOnClick('node')}
            >
              Node.js
            </Stack>
          ) : (
            <Stack
              color="#5A9E7A"
              bgColor="white"
              onClick={() => checkOnClick('node')}
            >
              Node.js
            </Stack>
          )}
          {express ? (
            <Stack
              bgColor="#5A9E7A"
              color="white"
              onClick={() => checkOnClick('express')}
            >
              Express
            </Stack>
          ) : (
            <Stack
              color="#5A9E7A"
              bgColor="white"
              onClick={() => checkOnClick('express')}
            >
              Express
            </Stack>
          )}
          {aws ? (
            <Stack
              bgColor="#5A9E7A"
              color="white"
              onClick={() => checkOnClick('aws')}
            >
              AWS
            </Stack>
          ) : (
            <Stack
              color="#5A9E7A"
              bgColor="white"
              onClick={() => checkOnClick('aws')}
            >
              AWS
            </Stack>
          )}
          {git ? (
            <Stack
              bgColor="#5A9E7A"
              color="white"
              onClick={() => checkOnClick('git')}
            >
              Git
            </Stack>
          ) : (
            <Stack
              color="#5A9E7A"
              bgColor="white"
              onClick={() => checkOnClick('git')}
            >
              Git
            </Stack>
          )}
        </DownBox>
      </StackWrapper>
      <Searchbar>
        <Form onSubmit={handleOnSubmit}>
          <SearchBarWrapper>
            <SearchInput
              onChange={handleOnChange}
              value={value}
              placeholder={errorMessage || '여기에 입력해주세요!'}
            />
            <DeleteBtn onClick={deleteValueOnClick}>&times;</DeleteBtn>
          </SearchBarWrapper>
          <Button type="submit">
            <FaSearch className="search" />
          </Button>
        </Form>
      </Searchbar>
      <ListWrapper>
        <Lists>
          {post.map((el) => (
            <List key={nanoid()} onClick={() => postOnClick(el.id)}>
              <UpSide>
                <Title>{el.title}</Title>
              </UpSide>
              <DownSide>
                {el.tag.map((el: string) => (
                  <Tag key={nanoid()}>{el}</Tag>
                ))}
              </DownSide>
            </List>
          ))}
        </Lists>
      </ListWrapper>
    </>
  );
}

export default Search;
