import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { AppDispatch, UserLogin } from 'index';
import Loading from 'Components/Loading';

function Google() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const getGoogleToken = async () => {
    const googleCode = new URL(window.location.href).searchParams.get('code');
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER}/users/auth/google?code=${googleCode}`,
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
    navigate('/');
  };

  useEffect(() => {
    getGoogleToken();
  }, []);
  return <Loading />;
}

export default Google;
