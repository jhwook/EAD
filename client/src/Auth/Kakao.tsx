import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { AppDispatch, UserLogin } from 'index';
import Loading from 'Components/Loading';

function Kakao() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const getKakaoToken = async () => {
    const kakaoCode = new URL(window.location.href).searchParams.get('code');
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER}/users/auth/kakao?code=${kakaoCode}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      },
    );
    const { token, oauthId } = response.data.data;
    const data = await axios.post(
      `${process.env.REACT_APP_SERVER}/users/oauth`,
      { oauthId },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        withCredentials: true,
      },
    );
    dispatch(UserLogin(data.data.data));
    navigate('/');
  };

  useEffect(() => {
    getKakaoToken();
  }, []);
  return <Loading />;
}

export default Kakao;
