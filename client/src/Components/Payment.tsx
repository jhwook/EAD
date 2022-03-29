import axios from 'axios';
import { AppDispatch, RootState, UserPayment } from 'index';
import { Dispatch, SetStateAction } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

type RequestPayResponseCallback = (response: RequestPayResponse) => void;

interface Iamport {
  init: (accountID: string) => void;
  request_pay: (
    params: RequestPayParams,
    callback?: RequestPayResponseCallback,
  ) => void;
}

declare global {
  interface Window {
    IMP?: Iamport;
  }
}

interface RequestPayAdditionalParams {
  digital?: boolean;
  vbank_due?: string;
  m_redirect_url?: string;
  app_scheme?: string;
  biz_num?: string;
}

interface Display {
  card_quota?: number[];
}

interface RequestPayParams extends RequestPayAdditionalParams {
  pg?: string;
  pay_method: string;
  escrow?: boolean;
  merchant_uid: string;
  name?: string;
  amount: number;
  custom_data?: any;
  tax_free?: number;
  currency?: string;
  language?: string;
  buyer_name?: string;
  buyer_tel: string;
  buyer_email?: string;
  buyer_addr?: string;
  buyer_postcode?: string;
  notice_url?: string | string[];
  display?: Display;
}

interface RequestPayResponse extends RequestPayAdditionalParams {
  success: boolean;
  error_code: string;
  error_msg: string;
  imp_uid: string | null;
  merchant_uid: string;
  pay_method?: string;
  paid_amount?: number;
  status?: string;
  name?: string;
  pg_provider?: string;
  pg_tid?: string;
  buyer_name?: string;
  buyer_email?: string;
  buyer_tel?: string;
  buyer_addr?: string;
  buyer_postcode?: string;
  custom_data?: any;
  paid_at?: number;
  receipt_url?: string;
}

interface IPaymentProps {
  cost: number;
  setCost: Dispatch<SetStateAction<number>>;
}

const PaymentBtn = styled.button`
  width: 120px;
  height: 37px;
  padding: 5px;
  background-color: ${(props) => props.theme.beige};
  color: ${(props) => props.theme.btnGreen};
  font-size: ${(props) => props.theme.fontSize.mini};
  border: 1px solid ${(props) => props.theme.btnGreen};
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.5s;
  //box-shadow: rgba(0, 0, 0, 0.3) 2px 2px;
  &:hover {
    background-color: ${(props) => props.theme.btnGreen};
    color: ${(props) => props.theme.beige};
  }
`;

function Payment({ cost, setCost }: IPaymentProps) {
  const { userData } = useSelector((state: RootState) => state);
  const { accessToken, userInfo } = userData;
  const dispatch = useDispatch<AppDispatch>();

  const onClickPayment = () => {
    /* 1. 가맹점 식별하기 */
    const { IMP } = window;
    IMP?.init('imp42587291');

    /* 2. 결제 데이터 정의하기 */
    const data: RequestPayParams = {
      pg: 'html5_inicis', // PG사
      pay_method: 'card', // 결제수단
      merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
      amount: cost, // 결제금액
      name: '개발자의 모든것 충전금', // 주문명
      buyer_name: userInfo.username, // 구매자 이름
      buyer_tel: '01000000000', // 구매자 전화번호
      buyer_email: userInfo.email, // 구매자 이메일
      buyer_addr: '경기도 김포시', // 구매자 주소
      buyer_postcode: '01023', // 구매자 우편번호
      m_redirect_url: 'http://localhost:3000', // 결제완료 후 리다이렉션 될 주소
    };

    /* 4. 결제 창 호출하기 */
    IMP?.request_pay(data, callback);
  };

  /* 3. 콜백 함수 정의하기 */
  async function callback(rsp: RequestPayResponse) {
    // imp_uid : 결제정보
    // merchant_uid : 주문정보
    // eslint-disable-next-line camelcase
    const { success } = rsp;

    if (success) {
      const data = await axios.post(
        `${process.env.REACT_APP_SERVER}/users/payment`,
        { cost },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        },
      );

      dispatch(UserPayment(data.data.data));
      setCost(0);
    } else {
      setCost(0);
    }
  }

  return (
    <PaymentBtn type="button" onClick={onClickPayment}>
      결제하기
    </PaymentBtn>
  );
}

export default Payment;
