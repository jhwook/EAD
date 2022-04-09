import axios from 'axios';
import { AppDispatch, RootState, UserPayment } from 'index';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import Loading from './Loading';

function MobilePayment() {
  const { userData } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const impUid = new URL(window.location.href).searchParams.get('imp_uid');
  const merchantUid = new URL(window.location.href).searchParams.get(
    'merchant_uid',
  );
  const impSuccess = new URL(window.location.href).searchParams.get(
    'imp_success',
  );
  console.log(impUid, merchantUid, impSuccess);

  const payment = async () => {
    if (impSuccess === 'true') {
      const data = await axios.get(
        `${process.env.REACT_APP_SERVER}/users/payment/mobile/${impUid}/${merchantUid}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userData.accessToken}`,
          },
          withCredentials: true,
        },
      );

      dispatch(UserPayment(data.data.data));
      navigate('/profile');
    }
  };

  useEffect(() => {
    payment();
  }, []);
  return <Loading />;
}

export default MobilePayment;
