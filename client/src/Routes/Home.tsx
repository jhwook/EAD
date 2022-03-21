import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import { IoMdArrowDropleft } from 'react-icons/io';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Team from 'Components/Team';
import SearchList from 'Components/SearchList';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import logo1 from '../Image/Logo/1.png';
import logo2 from '../Image/Logo/2.png';
import logo3 from '../Image/Logo/3.png';
import logo4 from '../Image/Logo/4.png';
import logo5 from '../Image/Logo/5.png';

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: flex;
  justify-content: center;
  align-items: center;
  .team {
    font-size: ${(props) => props.theme.fontSize.veryHuge};
    color: ${(props) => props.theme.green};
    position: absolute;
    right: 20px;
    cursor: pointer;
    z-index: 2;
    &:hover {
      font-size: ${(props) => props.theme.fontSize.huge};
    }
  }
`;

const TeamWrapper = styled.div`
  position: absolute;
  width: 100%;
  right: 0px;
  z-index: 3;
`;

const Box = styled.div`
  width: 100%;
  height: 100vh;
`;

const Logo = styled.img`
  width: 700px;
`;
const SearchBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LeftBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.pink};
`;

const RightBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.beige};
`;

const TextBox = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const Text = styled.div`
  font-size: ${(props) => props.theme.fontSize.huge};
  margin-bottom: 10px;
`;

const Number = styled.div`
  font-size: ${(props) => props.theme.fontSize.huge};
`;
const Title = styled.div`
  font-size: ${(props) => props.theme.fontSize.huge};
  margin-bottom: 50px;
`;
const Descriprtion = styled.div`
  font-size: ${(props) => props.theme.fontSize.medium};
  margin-bottom: 5px;
`;

const Searchbar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  z-index: 0;
  .search {
    font-size: ${(props) => props.theme.fontSize.huge};
  }
`;
const SearchInput = styled.input`
  width: 500px;
  height: 30px;
  border: 3px solid ${(props) => props.theme.green};
  padding: 10px 10px 10px 15px;
  margin-right: 20px;
  font-size: ${(props) => props.theme.fontSize.small};
`;

const Form = styled.form`
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  border: none;
  background-color: inherit;
  cursor: pointer;
`;

const SearchBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const SearchBarBox = styled.ul`
  display: flex;
  flex-direction: column;
  margin-top: 2px;
  padding: 15px 5px 10px 15px;
  width: 503px;
  font-size: ${(props) => props.theme.fontSize.small};
  font-weight: bold;
  border: 2px solid ${(props) => props.theme.green};
  background-color: ${(props) => props.theme.beige};
  position: absolute;
  top: 60px;
`;

const DeleteBtn = styled.div`
  font-size: ${(props) => props.theme.fontSize.small};
  font-weight: bold;
  position: absolute;
  top: 17px;
  right: 35px;
  cursor: pointer;
`;

function Home() {
  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [title, setTitle] = useState([]);
  const [select, setSelect] = useState('');
  const [index, setIndex] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch: Dispatch = useDispatch();

  const getTitle = async () => {
    const postTitle = await axios.get(
      `${process.env.REACT_APP_SERVER}/posts/title`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      },
    );
    setTitle(postTitle.data.data);
  };

  // const getNaverToken = async () => {
  //   if (location.hash) {
  //     const token = location.hash.split('=')[1].split('&')[0];
  //     console.log(token);
  //     const data = await axios.post(
  //       `${process.env.REACT_APP_SERVER}/users/login`,
  //       {},
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authrorization: token,
  //         },
  //         withCredentials: true,
  //       },
  //     );
  //     dispatch({
  //       type: 'Login',
  //       userInfo: data.data.data.userInfo,
  //       accessToken: data.data.data.token,
  //       isLogin: data.data.data.isLogin,
  //     });
  //   }
  // };

  useEffect(() => {
    getTitle();
    // getNaverToken();
  }, []);

  const arr = title.filter((el: string) => {
    return el.toLowerCase().includes(value.toLowerCase());
  });

  const searchListOnClick = async (e: any) => {
    setValue(e.target.innerText);
    await axios.post(
      `${process.env.REACT_APP_SERVER}/posts/search`,
      { keyword: value },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      },
    );
    // navigate("/post/search?keyword=${value}");
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // up
    if (e.keyCode === 38) {
      setIndex(index - 1);
      setSelect(title[index]);
      setValue(select);
    }
    // down
    if (e.keyCode === 40) {
      setIndex(index + 1);
      setSelect(title[index]);
      setValue(select);
    }
    // enter
    if (e.keyCode === 13) {
      setValue(select);
    }
  };

  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value) {
      await axios.post(
        `${process.env.REACT_APP_SERVER}/posts/search`,
        { keyword: value },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      );
      setErrorMessage('여기에 입력해주세요!');
      // navigate("/post/search?keyword=${value}");
      // setValue('');
    } else {
      setErrorMessage('최소 1글자 이상은 입력해주세요!');
    }
  };

  const handleOnClick = () => {
    setOpen(true);
  };

  const deleteValueOnClick = () => {
    setValue('');
  };

  return (
    <>
      {open ? (
        <TeamWrapper>
          <Team setOpen={setOpen} />
        </TeamWrapper>
      ) : null}
      <Wrapper>
        <IoMdArrowDropleft className="team" onClick={handleOnClick} />
        <Logo src={logo1} />
        <SearchBox>
          <Text>개발하면서 궁금했던 점을</Text>
          <Text>검색해보세요!</Text>
          <Searchbar>
            <Form onSubmit={handleOnSubmit}>
              <SearchBarWrapper>
                <SearchInput
                  onChange={handleOnChange}
                  // onKeyUp={handleKeyUp}
                  value={value}
                  placeholder={errorMessage || '여기에 입력해주세요!'}
                />
                {value !== '' ? (
                  <DeleteBtn onClick={deleteValueOnClick}>&times;</DeleteBtn>
                ) : null}
                {arr.length !== 0 && value !== '' ? (
                  <SearchBarBox>
                    <SearchList
                      type="submit"
                      list={arr}
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
        </SearchBox>
      </Wrapper>
      <Box>
        <LeftBox>
          <Logo src={logo2} />
          <TextBox>
            <Number>01</Number>
            <Title>공식문서들 봐도 이해가 안되셨나요?</Title>
            <Descriprtion>
              이해가 안된 부분만 발취해서 질문해보세요.
            </Descriprtion>
            <Descriprtion>
              다양한 분야의 전문가들이 여러분들을 기다리고 있습니다.
            </Descriprtion>
          </TextBox>
        </LeftBox>
      </Box>
      <Box>
        <RightBox>
          <TextBox>
            <Number>02</Number>
            <Title>알고리즘에 고민이 많으신가요?</Title>
            <Descriprtion>
              문제를 풀다가 막히는 부분이 생기면 질문해보세요.
            </Descriprtion>
            <Descriprtion>
              알고리즘의 전문가들이 여러분들을 기다리고 있습니다.
            </Descriprtion>
          </TextBox>
          <Logo src={logo3} />
        </RightBox>
      </Box>
      <Box>
        <LeftBox>
          <Logo src={logo4} />
          <TextBox>
            <Number>03</Number>
            <Title>개발하면서 오류를 만나셨나요?</Title>
            <Descriprtion>여러분이 겪은 오류를 공유해주세요.</Descriprtion>
            <Descriprtion>
              수많은 오류를 해결한 전문가들이 여러분들을 기다리고 있습니다.
            </Descriprtion>
          </TextBox>
        </LeftBox>
      </Box>
      <Box>
        <RightBox>
          <TextBox>
            <Number>04</Number>
            <Title>협업 시에 해결되지 않은 문제가 있으신가요?</Title>
            <Descriprtion>해결되지 않은 문제를 공유해주세요.</Descriprtion>
            <Descriprtion>
              수많은 협업을 진행해 온 전문가들이 여러분들을 기다리고 있습니다.
            </Descriprtion>
          </TextBox>
          <Logo src={logo5} />
        </RightBox>
      </Box>
    </>
  );
}

export default Home;
