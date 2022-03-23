import axios from 'axios';
import { useEffect, useState } from 'react';
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
  top: 17px;
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
  gap: 15px;
  text-align: center;
  place-items: center;
  margin-top: 50px;
  margin-bottom: 50px;
`;
const List = styled.li`
  width: 200px;
  height: 200px;
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
  height: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const DownSide = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  font-size: ${(props) => props.theme.fontSize.medium};
`;
const Tag = styled.div`
  width: 70px;
  color: ${(props) => props.theme.btnGreen};
  font-size: ${(props) => props.theme.fontSize.tiny};
  font-weight: bold;
  border: 2px solid ${(props) => props.theme.btnGreen};
  border-radius: 15px;
`;

function Search() {
  const [value, setValue] = useState('');
  //   const [postList, setPostList] = useState([]);
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
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { postData } = useSelector((state: RootState) => state);

  //   const getPostList = async () => {
  //     const postList = await axios.get(
  //       `${process.env.REACT_APP_SERVER}/posts/search?keyword=${value}`,
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         withCredentials: false,
  //       },
  //     );
  //     setPostList(postList.data.data);
  //   };

  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (value) {
      await axios.post(
        `${process.env.REACT_APP_SERVER}/posts/search?keyword=${value}`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      );
      navigate(`/search?keyword=${value}`);
      setErrorMessage('여기에 입력해주세요!');
      setValue('');
    } else {
      setErrorMessage('최소 1글자 이상은 입력해주세요!');
    }
  };

  const deleteValueOnClick = () => {
    setValue('');
  };

  const checkOnClick = async (el: string) => {
    const data = await axios.post(
      `${process.env.REACT_APP_SERVER}/posts/search?keyword=${el}`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      },
    );
    dispatch(inSearch(data.data.data));

    if (el === 'html') {
      setHtml(!html);
    } else if (el === 'css') {
      setCss(!css);
    } else if (el === 'javascript') {
      setJs(!js);
    } else if (el === 'react') {
      setReact(!react);
    } else if (el === 'redux') {
      setRedux(!redux);
    } else if (el === 'typescript') {
      setTs(!ts);
    } else if (el === 'styledcomponents') {
      setSc(!sc);
    } else if (el === 'node') {
      setNode(!node);
    } else if (el === 'express') {
      setExpress(!express);
    } else if (el === 'aws') {
      setAws(!aws);
    } else if (el === 'git') {
      setGit(!git);
    }
  };

  const postOnClick = (id: number) => {
    navigate(`/post/:${id}`);
  };

  //   useEffect(() => {
  //     getPostList();
  //   }, []);

  return (
    <>
      <StackWrapper>
        <UpBox>
          {html ? (
            <Stack
              bgColor="white"
              color="#5A9E7A"
              onClick={() => checkOnClick('html')}
            >
              HTML
            </Stack>
          ) : (
            <Stack
              color="white"
              bgColor="#5A9E7A"
              onClick={() => checkOnClick('html')}
            >
              HTML
            </Stack>
          )}
          {css ? (
            <Stack
              bgColor="white"
              color="#5A9E7A"
              onClick={() => checkOnClick('css')}
            >
              CSS
            </Stack>
          ) : (
            <Stack
              color="white"
              bgColor="#5A9E7A"
              onClick={() => checkOnClick('css')}
            >
              CSS
            </Stack>
          )}
          {js ? (
            <Stack
              bgColor="white"
              color="#5A9E7A"
              onClick={() => checkOnClick('javascript')}
            >
              JavaScript
            </Stack>
          ) : (
            <Stack
              color="white"
              bgColor="#5A9E7A"
              onClick={() => checkOnClick('javascript')}
            >
              JavaScript
            </Stack>
          )}
          {react ? (
            <Stack
              bgColor="white"
              color="#5A9E7A"
              onClick={() => checkOnClick('react')}
            >
              React
            </Stack>
          ) : (
            <Stack
              color="white"
              bgColor="#5A9E7A"
              onClick={() => checkOnClick('react')}
            >
              React
            </Stack>
          )}
          {redux ? (
            <Stack
              bgColor="white"
              color="#5A9E7A"
              onClick={() => checkOnClick('redux')}
            >
              Redux
            </Stack>
          ) : (
            <Stack
              color="white"
              bgColor="#5A9E7A"
              onClick={() => checkOnClick('redux')}
            >
              Redux
            </Stack>
          )}
        </UpBox>
        <DownBox>
          {ts ? (
            <Stack
              bgColor="white"
              color="#5A9E7A"
              onClick={() => checkOnClick('typescript')}
            >
              TypeScript
            </Stack>
          ) : (
            <Stack
              color="white"
              bgColor="#5A9E7A"
              onClick={() => checkOnClick('typescript')}
            >
              TypeScript
            </Stack>
          )}
          {sc ? (
            <Stack
              bgColor="white"
              color="#5A9E7A"
              onClick={() => checkOnClick('styledcomponents')}
            >
              Styled-Component
            </Stack>
          ) : (
            <Stack
              color="white"
              bgColor="#5A9E7A"
              onClick={() => checkOnClick('styledcomponents')}
            >
              Styled-Component
            </Stack>
          )}
          {node ? (
            <Stack
              bgColor="white"
              color="#5A9E7A"
              onClick={() => checkOnClick('node')}
            >
              Node.js
            </Stack>
          ) : (
            <Stack
              color="white"
              bgColor="#5A9E7A"
              onClick={() => checkOnClick('node')}
            >
              Node.js
            </Stack>
          )}
          {express ? (
            <Stack
              bgColor="white"
              color="#5A9E7A"
              onClick={() => checkOnClick('express')}
            >
              Express
            </Stack>
          ) : (
            <Stack
              color="white"
              bgColor="#5A9E7A"
              onClick={() => checkOnClick('express')}
            >
              Express
            </Stack>
          )}
          {aws ? (
            <Stack
              bgColor="white"
              color="#5A9E7A"
              onClick={() => checkOnClick('aws')}
            >
              AWS
            </Stack>
          ) : (
            <Stack
              color="white"
              bgColor="#5A9E7A"
              onClick={() => checkOnClick('aws')}
            >
              AWS
            </Stack>
          )}
          {git ? (
            <Stack
              bgColor="white"
              color="#5A9E7A"
              onClick={() => checkOnClick('git')}
            >
              Git
            </Stack>
          ) : (
            <Stack
              color="white"
              bgColor="#5A9E7A"
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
            {value !== '' ? (
              <DeleteBtn onClick={deleteValueOnClick}>&times;</DeleteBtn>
            ) : null}
          </SearchBarWrapper>
          <Button type="submit">
            <FaSearch className="search" />
          </Button>
        </Form>
      </Searchbar>
      <ListWrapper>
        <Lists>
          {postData.map((el, i) => (
            <List key={nanoid()} onClick={() => postOnClick(i)}>
              <UpSide>
                <Title>{el.title}</Title>
              </UpSide>
              <DownSide>
                <Tag>{el.tag}</Tag>
              </DownSide>
            </List>
          ))}
        </Lists>
      </ListWrapper>
    </>
  );
}

export default Search;
