import { Fade } from 'react-awesome-reveal';
import { FaSearch } from 'react-icons/fa';
import React, { useCallback, useEffect, useState } from 'react';
import loadable from '@loadable/component';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { FiChevronsUp } from 'react-icons/fi';
import { HiOutlineChevronDoubleDown } from 'react-icons/hi';
import { HomeSearch } from 'index';
import Nav from 'Components/Nav';
import Footer from '../../Components/Footer';
import logo1 from '../../Image/Logo/1.svg';
import logo2 from '../../Image/Logo/2.svg';
import logo3 from '../../Image/Logo/3.svg';
import logo4 from '../../Image/Logo/4.svg';
import logo5 from '../../Image/Logo/5.svg';
import intro from '../../Image/intro.gif';
import {
  DeleteBtn,
  Form,
  HomeWrapper,
  Logo,
  Searchbar,
  SearchBarBox,
  SearchBarWrapper,
  SearchBox,
  SearchInput,
  Text,
  Wrapper,
  Button,
  Box,
  LeftBox,
  TextBox,
  Number,
  Title,
  Descriprtion,
  RightBox,
  UpScrollBtn,
  FooterWrapper,
  IntroWrapper,
  Intro,
} from './styles';

const SearchList = loadable(() => import('Components/SearchList'));

interface IElProps {
  id: string;
  title: string;
  tag: string[];
}

function Home() {
  const [value, setValue] = useState('');
  const [scrollY, setScrollY] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [title, setTitle] = useState([]);
  const [homeSearch, setHomeSearch] = useState(false);
  const navigate = useNavigate();
  const dispatch: Dispatch = useDispatch();

  const getTitle = useCallback(async () => {
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
    const title = postTitle.data.data.map((el: IElProps) => el.title);
    setTitle(title);
  }, [title, setTitle]);

  const handleFollow = useCallback(() => {
    setScrollY(window.pageYOffset); // window 스크롤 값을 ScrollY에 저장
  }, [setScrollY]);

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
    setHomeSearch(false);
    getTitle();
  }, []);

  useEffect(() => {
    if (homeSearch) {
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
        dispatch(HomeSearch(data.data.data));
      };
      getSeach();
      navigate(`/search?keyword=${value}`);
    }
  }, [homeSearch, value]);

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

  const searchListOnClick = async (e: React.SyntheticEvent<EventTarget>) => {
    setValue((e.target as HTMLInputElement).innerText);
    setHomeSearch(true);
  };

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
    dispatch(HomeSearch(data.data.data));
    setErrorMessage('여기에 입력해주세요!');
    navigate(`/search?keyword=${value}`);
  };

  const deleteValueOnClick = useCallback(() => {
    setValue('');
  }, [setValue]);

  const UpScrollOnClick = useCallback(() => {
    if (!window.scrollY) {
      return;
    }
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <>
      <Nav />
      <HomeWrapper>
        <Wrapper>
          <Fade delay={500}>
            <IntroWrapper>
              <Intro src={intro} alt={logo1} />
            </IntroWrapper>
            {/* <Logo src={logo1} /> */}
          </Fade>
          <SearchBox>
            <Fade delay={500}>
              <Text>개발하면서 궁금했던 점을</Text>
              <Text>바로 검색해보세요!</Text>
              <HiOutlineChevronDoubleDown className="down" />
            </Fade>
            <Searchbar>
              <Form onSubmit={handleOnSubmit}>
                <SearchBarWrapper>
                  <SearchInput
                    onChange={handleOnChange}
                    value={value}
                    placeholder={errorMessage || '여기에 입력해주세요!'}
                  />

                  <DeleteBtn onClick={deleteValueOnClick}>&times;</DeleteBtn>

                  {arr.length !== 0 && value !== '' ? (
                    <SearchBarBox>
                      <SearchList
                        type="button"
                        list={filteredArr}
                        chooseList={searchListOnClick}
                      />
                    </SearchBarBox>
                  ) : null}
                </SearchBarWrapper>
                <Button type="submit">
                  <FaSearch className="search" />
                </Button>
              </Form>
            </Searchbar>
          </SearchBox>
        </Wrapper>
        <Box>
          <LeftBox>
            <Fade delay={500}>
              <Logo src={logo2} />
            </Fade>
            <Fade delay={500}>
              <TextBox>
                <Number>01</Number>
                <Title>공식문서들 봐도 이해가 안되셨나요?</Title>
                <Fade delay={700}>
                  <Descriprtion>
                    이해가 안된 부분만 발취해서 질문해보세요.
                  </Descriprtion>
                  <Descriprtion>
                    다양한 분야의 전문가들이 여러분들을 기다리고 있습니다.
                  </Descriprtion>
                </Fade>
              </TextBox>
            </Fade>
          </LeftBox>
        </Box>
        <Box>
          <RightBox>
            <Fade delay={500}>
              <TextBox>
                <Number>02</Number>
                <Title>알고리즘에 고민이 많으신가요?</Title>
                <Fade delay={700}>
                  <Descriprtion>
                    문제를 풀다가 막히는 부분이 생기면 질문해보세요.
                  </Descriprtion>
                  <Descriprtion>
                    알고리즘의 전문가들이 여러분들을 기다리고 있습니다.
                  </Descriprtion>
                </Fade>
              </TextBox>
            </Fade>
            <Fade delay={500}>
              <Logo src={logo3} />
            </Fade>
          </RightBox>
        </Box>
        <Box>
          <LeftBox>
            <Fade delay={500}>
              <Logo src={logo4} />
            </Fade>
            <Fade delay={500}>
              <TextBox>
                <Number className="three">03</Number>
                <Title className="three">개발하면서 오류를 만나셨나요?</Title>
                <Fade delay={700}>
                  <Descriprtion className="three">
                    여러분이 겪은 오류를 공유해주세요.
                  </Descriprtion>
                  <Descriprtion className="three">
                    수많은 오류를 해결한 전문가들이 여러분들을 기다리고
                    있습니다.
                  </Descriprtion>
                </Fade>
              </TextBox>
            </Fade>
          </LeftBox>
        </Box>
        <Box>
          <RightBox>
            <Fade delay={500}>
              <TextBox>
                <Number className="four">04</Number>
                <Title className="four">협업 시 문제가 있으신가요?</Title>
                <Fade delay={700}>
                  <Descriprtion className="four">
                    해결되지 않은 문제를 공유해주세요.
                  </Descriprtion>
                  <Descriprtion className="four">
                    수많은 협업을 진행해 온 전문가들이 여러분들을 기다리고
                    있습니다.
                  </Descriprtion>
                </Fade>
              </TextBox>
            </Fade>
            <Fade delay={500}>
              <Logo className="logo5" src={logo5} />
            </Fade>
          </RightBox>
        </Box>
      </HomeWrapper>
      {scrollY >= 500 ? (
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

export default Home;
