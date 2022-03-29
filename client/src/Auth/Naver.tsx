import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { AppDispatch, UserLogin } from 'index';

function Naver() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const getNaverToken = async () => {
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
    getNaverToken();
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  }, []);
  return null;
}

export default Naver;
