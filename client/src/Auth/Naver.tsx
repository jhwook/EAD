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

    // 쿠키로 들어오면 내가 쿠키에서 엑세스토큰을 또 저장하면서 다시 서버의 어떤주소로 엑세스토큰을 넘겨주면
    // 그곳이서 유저데이터 받고
    // 로그인페이지로 리다이렉트(그건은 내가 네비게이트로 하면돰)
    // 백엔드로 리다이렉션시
    await axios.get(`${process.env.REACT_APP_SERVER}/users/auth/naver`, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    const cookies = Object.fromEntries(
      document.cookie.split(';').map((cookie) => cookie.trim().split('=')),
    );
    console.log(cookies);

    const data = await axios.get(`${process.env.REACT_APP_SERVER}/users/auth`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: cookies,
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
