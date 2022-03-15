import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

interface IInitialStateProps {
  id: number;
  name: string;
  quan: number;
}

function Cart() {
  const dispatch = useDispatch();
  const reducer = useSelector((state: IInitialStateProps[]) => state);

  const handleOnClickPlus = (id: number) => {
    dispatch({ type: `${process.env.REACT_APP_PLUS}`, id });
  };
  const handleOnClickMinus = (id: number) => {
    dispatch({
      type: `${process.env.REACT_APP_MINUS}`,
      id,
    });
  };

  //   const handleOpenModal = () => {
  //     dispatch({ type: 'Open' });
  //   };

  //   const handleCloseModal = () => {
  //     dispatch({ type: 'Close' });
  //   };

  //   const handleAddList = () => {
  //     dispatch({ type: 'Add', payload: { id: 5, name: '간지신발', quan: 10 } });
  //   };

  //   const handleSubList = () => {
  //     dispatch({ type: 'Sub' });
  //   };

  return (
    <div>
      <Table responsive>
        <tr>
          <th>#</th>
          <th>상품명</th>
          <th>수량</th>
          <th>변경</th>
        </tr>
        {reducer.map((el: IInitialStateProps) => (
          <tr key={Date.now()}>
            <td>{el.id}</td>
            <td>{el.name}</td>
            <td>{el.quan}</td>
            <td>
              <button type="button" onClick={() => handleOnClickMinus(el.id)}>
                -
              </button>
              <button type="button" onClick={() => handleOnClickPlus(el.id)}>
                +
              </button>
            </td>
          </tr>
        ))}
      </Table>
      <div
        style={{
          width: '100%',
          backgroundColor: 'yellow',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* {modalState ? (
          <>
            지금 구매하면 반값!!{' '}
            <button
              style={{
                width: '50px',
              }}
              onClick={handleCloseModal}
            >
              닫기
            </button>
          </>
        ) : (
          <div
            style={{
              width: '100%',
              backgroundColor: 'white',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <button
              style={{
                width: '50px',
              }}
              onClick={handleOpenModal}
            >
              열기
            </button>
          </div>
        )} */}
      </div>
      {/* <button onClick={handleAddList}>상품 추가</button>
      <button onClick={handleSubList}>상품 감소</button> */}
    </div>
  );
}

export default Cart;
