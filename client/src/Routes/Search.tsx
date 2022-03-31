import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import { nanoid } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { FiChevronsUp } from 'react-icons/fi';
import { AppDispatch, inSearch, RootState } from 'index';
import SearchList from 'Components/SearchList';
import Nav from 'Components/Nav';
import Footer from 'Components/Footer';
import AddBtn from '../Image/Search/add.png';
import Logo from '../Image/Logo/search.png';

interface IStackProps {
  bgColor: string;
  color: string;
}

const SearchWrapper = styled.div`
  height: auto;
  min-height: 100%;
  padding-bottom: 150px;
  @media ${(props) => props.theme.mobile} {
    height: auto;
    min-height: 100%;
    padding-bottom: 200px;
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

const StackWrapper = styled.div`
  width: 70%;
  padding: 30px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  @media ${(props) => props.theme.iPhone12Pro} {
    padding: 5px;
    margin-bottom: 10px;
  }
`;

const UpBox = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  @media ${(props) => props.theme.iPhone12Pro} {
    flex-wrap: wrap;
    margin-bottom: 2px;
  }
`;
const DownBox = styled.div`
  display: flex;
  justify-content: center;
  @media ${(props) => props.theme.iPhone12Pro} {
    flex-wrap: wrap;
  }
`;

const Stack = styled.div<IStackProps>`
  display: flex;
  justify-content: center;
  align-items: center;
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
  @media ${(props) => props.theme.iPhone12Pro} {
    font-size: ${(props) => props.theme.fontSize.micro};
    margin: 5px;
  }
  @media ${(props) => props.theme.mobile} {
    font-size: ${(props) => props.theme.fontSize.micro};
  }
  @media ${(props) => props.theme.tablet} {
    font-size: ${(props) => props.theme.fontSize.mini};
  }
`;

const Searchbar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 0;
  .search {
    font-size: ${(props) => props.theme.fontSize.large};
    @media ${(props) => props.theme.iPhone12Pro} {
      display: none;
    }
    @media ${(props) => props.theme.mobile} {
      display: none;
    }
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
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 300px;
    margin-right: 0px;
    margin-left: 25px;
  }
  @media ${(props) => props.theme.mobile} {
    width: 340px;
    margin-right: 0px;
  }
  @media ${(props) => props.theme.tablet} {
    width: 600px;
  }
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
  min-height: 638px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Lists = styled.ul`
  width: 1500px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  text-align: center;
  place-items: center;
  margin-top: 50px;
  margin-bottom: 50px;
  @media ${(props) => props.theme.iPhone12Pro} {
    grid-template-columns: repeat(1, 1fr);
    width: 500px;
    gap: 20px;
  }
  @media ${(props) => props.theme.mobile} {
    grid-template-columns: repeat(1, 1fr);
    width: 500px;
    gap: 20px;
  }
  @media ${(props) => props.theme.tablet} {
    grid-template-columns: repeat(2, 1fr);
    width: 700px;
    gap: 20px;
  }
  @media ${(props) => props.theme.desktop} {
    grid-template-columns: repeat(3, 1fr);
    width: 1000px;
    gap: 20px;
  }
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

const SearchBarBox = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 15px 5px 10px 15px;
  width: 700px;
  font-size: ${(props) => props.theme.fontSize.small};
  font-weight: bold;
  border: 2px solid ${(props) => props.theme.green};
  background-color: ${(props) => props.theme.beige};
  position: absolute;
  top: 60px;
  box-shadow: rgba(0, 0, 0, 0.3) 3px 3px;
  z-index: 3;
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 300px;
    margin-right: 0px;
    margin-left: 25px;
  }
  @media ${(props) => props.theme.mobile} {
    width: 340px;
    margin-right: 0px;
  }
  @media ${(props) => props.theme.tablet} {
    width: 600px;
  }
`;

const AddPostBtn = styled.img`
  width: 70px;
  height: 70px;
  position: fixed;
  right: 40px;
  bottom: 700px;
  border: 2px solid ${(props) => props.theme.btnGreen};
  border-radius: 15px;
  transition: all 1s;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.3) 3px 3px;
  &:hover {
    background-color: ${(props) => props.theme.btnGreen};
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    width: 45px;
    height: 45px;
    top: 400px;
    right: 10px;
  }
  @media ${(props) => props.theme.mobile} {
    width: 45px;
    height: 45px;
    top: 350px;
    right: 10px;
  }
  @media ${(props) => props.theme.tablet} {
    width: 60px;
    height: 60px;
    right: 10px;
  }
  @media ${(props) => props.theme.desktop} {
    width: 70px;
    height: 70px;
    right: 10px;
  }
  @media ${(props) => props.theme.desktop1} {
    width: 70px;
    height: 70px;
    right: 10px;
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

const Box = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const NoneLogo = styled.img`
  @media ${(props) => props.theme.mobile} {
    width: 400px;
  }
  @media ${(props) => props.theme.tablet} {
    width: 500px;
  }
  @media ${(props) => props.theme.desktop} {
    width: 550px;
  }
  @media ${(props) => props.theme.desktop1} {
    width: 550px;
  }
  @media ${(props) => props.theme.desktop2} {
    width: 600px;
  }
`;

const NoneText = styled.div`
  font-size: ${(props) => props.theme.fontSize.medium};
  font-weight: bold;
  color: ${(props) => props.theme.btnGreen};
  @media ${(props) => props.theme.mobile} {
    font-size: ${(props) => props.theme.fontSize.small};
  }
  @media ${(props) => props.theme.tablet} {
    font-size: ${(props) => props.theme.fontSize.small};
  }
`;

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
    } else if (el === 'styledcomponents') {
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
    } else if (el === 'node') {
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
  const postOnClick = (id: number) => {
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
                      <Tag key={nanoid()}>{el}</Tag>
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

      <AddPostBtn src={AddBtn} onClick={AddPostOnClick} />
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
