import axios from 'axios';
import { useEffect, useState } from 'react';
import loadable from '@loadable/component';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import { nanoid } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { FiChevronsUp } from 'react-icons/fi';
import { AppDispatch, inSearch, ItemRender, RootState } from 'index';
import Nav from 'Components/Nav';
import Footer from 'Components/Footer';
import AddBtn from '../../Image/Search/add.png';
import Logo from '../../Image/Logo/search.svg';
import {
  AddBtnBox,
  AddPostBtn,
  Box,
  Button,
  DeleteBtn,
  DownBox,
  DownSide,
  FooterWrapper,
  Form,
  List,
  Lists,
  ListWrapper,
  NoneLogo,
  NoneText,
  Searchbar,
  SearchBarBox,
  SearchBarWrapper,
  SearchInput,
  SearchWrapper,
  Stack,
  StackWrapper,
  Tag,
  Title,
  UpBox,
  UpScrollBtn,
  UpSide,
} from './styles';

const SearchList = loadable(() => import('Components/SearchList'));

function Search() {
  const [value, setValue] = useState('');
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
  const [title, setTitle] = useState([]);
  const [search, setSearch] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { userData } = useSelector((state: RootState) => state);
  const { postData } = useSelector((state: RootState) => state);
  const [post, setPost] = useState(postData);
  const [here, setHere] = useState(false);
  const [clicked, setClicked] = useState(false);

  const getTitle = async () => {
    const postTitle = await axios.post(
      `${process.env.REACT_APP_SERVER}/posts/title`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: false,
      },
    );
    const title = postTitle.data.data.map((el: { title: string }) => el.title);
    setTitle(title);
  };

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

  useEffect(() => {
    // setOpen(false);
    setHere(false);
    getTitle();
  }, []);

  useEffect(() => {
    if (here || clicked) {
      setPost(postData);
      navigate(`/search?keyword=${value}`);
      setValue('');
      setClicked(false);
    }
    setPost(postData);
  }, [postData]);

  useEffect(() => {
    if (clicked) {
      const getSeach = async () => {
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
      };
      getSeach();

      navigate(`/search?keyword=${value}`);
    }
  }, [clicked]);

  const arr = title.filter((el: string) => {
    return el.toLowerCase().includes(value.toLowerCase());
  });

  const filteredArr: string[] = [];
  for (let i = 0; i < arr.length; i += 1) {
    if (filteredArr.length >= 10) {
      break;
    }
    const isIn = filteredArr.includes(arr[i]);
    if (!isIn) {
      filteredArr.push(arr[i]);
    }
  }

  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
    setSearch(true);
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
    setHere(true);
    dispatch(inSearch(data.data.data));
    setSearch(false);
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
      setHtml(true);
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
      setCss(true);
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
      setJs(true);
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
      setReact(true);
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
      setRedux(true);
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
      setTs(true);
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
    } else if (el === 'styled-component') {
      setSc(true);
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
    } else if (el === 'node.js') {
      setNode(true);
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
      setExpress(true);
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
      setAws(true);
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
      setGit(true);
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

  const searchListOnClick = async (e: React.SyntheticEvent<EventTarget>) => {
    setValue((e.target as HTMLInputElement).innerText);
    setClicked(true);
    setSearch(false);
  };

  const postOnClick = async (id: number) => {
    const data = await axios.get(
      `${process.env.REACT_APP_SERVER}/posts/${id}/content`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      },
    );
    dispatch(ItemRender(data.data.data));
    navigate(`/post/${id}`);
  };

  const AddPostOnClick = () => {
    navigate('/post');
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

  return (
    <>
      <Nav />
      <SearchWrapper>
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
                onClick={() => checkOnClick('styled-component')}
              >
                Styled-Component
              </Stack>
            ) : (
              <Stack
                color="#5A9E7A"
                bgColor="white"
                onClick={() => checkOnClick('styled-component')}
              >
                Styled-Component
              </Stack>
            )}
            {node ? (
              <Stack
                bgColor="#5A9E7A"
                color="white"
                onClick={() => checkOnClick('node.js')}
              >
                Node.js
              </Stack>
            ) : (
              <Stack
                color="#5A9E7A"
                bgColor="white"
                onClick={() => checkOnClick('node.js')}
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
                placeholder="여기에 입력해주세요!"
              />
              <DeleteBtn onClick={deleteValueOnClick}>&times;</DeleteBtn>
              {arr.length !== 0 && value !== '' && search ? (
                <SearchBarBox>
                  <SearchList
                    type="button"
                    list={filteredArr}
                    chooseList={searchListOnClick}
                    // onKey={handleKeyUp}
                  />
                </SearchBarBox>
              ) : null}
            </SearchBarWrapper>
            <Button type="submit">
              <FaSearch className="search" />
            </Button>
          </Form>
        </Searchbar>
        <ListWrapper>
          {post.length !== 0 ? (
            <Lists>
              {post.map((el) => (
                <List key={nanoid()} onClick={() => postOnClick(el.id)}>
                  <UpSide>
                    <Title>{el.title}</Title>
                  </UpSide>
                  <DownSide>
                    {el.tag.map((el: string) => (
                      <Tag
                        key={nanoid()}
                        className={el === 'styled-component' ? 'long' : ''}
                      >
                        {el}
                      </Tag>
                    ))}
                  </DownSide>
                </List>
              ))}
            </Lists>
          ) : (
            <Box>
              <NoneLogo src={Logo} />
              <NoneText>검색결과가 없습니다.</NoneText>
            </Box>
          )}
        </ListWrapper>
      </SearchWrapper>
      {userData.isLogin ? (
        <AddBtnBox>
          <AddPostBtn src={AddBtn} onClick={AddPostOnClick} />
        </AddBtnBox>
      ) : null}
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

export default Search;
