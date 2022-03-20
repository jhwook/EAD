import { nanoid } from 'nanoid';
import styled from 'styled-components';

// interface SearchListProps {
//   list: [
//     {
//       title: string;
//       tag: string;
//       content: string;
//     },
//   ];
//   chooseList: void;
// }

interface IEl {
  title: string;
  tag: string;
  content: string;
}

const List = styled.li`
  width: 100%;
  height: 100%;
  cursor: pointer;
  margin-bottom: 10px;
`;

function SearchList({ list, chooseList }: any) {
  return list.map((el: IEl) => (
    <List key={nanoid()} value={el.title} onClick={chooseList}>
      {el.title}
    </List>
  ));
}

export default SearchList;
