import axios from 'axios';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { AppDispatch, UserLogin } from 'index';

function Naver() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();

  const getNaverToken = async () => {
    // if (location.hash) {
    //   const token = location.hash.split('=')[1].split('&')[0];
    //   console.log(token);
    //   // 프론트엔드로 리다이렉션시
    //   const data = await axios.get(
    //     `${process.env.REACT_APP_SERVER}/users/auth/naver/${token}`,
    //     {
    //       headers: {
    //         Authorization: token,
    //       },
    //     },
    //   );
    //   dispatch(UserLogin(data.data.data));
    //   navigate('/');

    const naverCode = new URL(window.location.href).searchParams.get('code');
    const naverState = new URL(window.location.href).searchParams.get('state');

    const response = await axios.get(
      `${process.env.REACT_APP_SERVER}/users/auth/naver?code=${naverCode}&state=${naverState}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      },
    );
    // const { accessToken } = response;

    // const cookies = Object.fromEntries(
    //   document.cookie.split(';').map((cookie) => cookie.trim().split('=')),
    // );
    // console.log(cookies);

    const data = await axios.get(`${process.env.REACT_APP_SERVER}/users/auth`, {
      headers: {
        'Content-Type': 'application/json',
        // Authorization: accessToken,
      },
      withCredentials: true,
    });
    console.log(data.data.data);
    dispatch(UserLogin(data.data.data));
  };

  useEffect(() => {
    getNaverToken();
    // setTimeout(() => {
    //   navigate('/login');
    // }, 1000);
  }, []);
  return null;
}

export default Naver;
