import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { AppDispatch, UserLogin } from 'index';

function Kakao() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const getKakoToken = async () => {
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
    const accessToken = response.data.data;
    const data = await axios.get(
      `${process.env.REACT_APP_SERVER}/users/oauth`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: accessToken,
        },
        withCredentials: true,
      },
    );
    dispatch(UserLogin(data.data.data));
  };

  useEffect(() => {
    getKakoToken();
    //     setTimeout(() => {
    //       navigate('/login');
    //     }, 1000);
  }, []);
  return null;
}

export default Kakao;
