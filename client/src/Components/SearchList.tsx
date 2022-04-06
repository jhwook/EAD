import { nanoid } from 'nanoid';
import styled from 'styled-components';

const List = styled.li`
  width: 100%;
  height: 100%;
  cursor: pointer;
  margin-bottom: 10px;
  background-color: ${(props) => props.theme.beige};
  transition: all 0.7s;
  &:hover {
    background-color: ${(props) => props.theme.green};
    padding: 3px 0px;
  }
  @media ${(props) => props.theme.iPhone12Pro} {
    font-size: ${(props) => props.theme.fontSize.tiny};
  }
  @media ${(props) => props.theme.mobile1} {
    font-size: ${(props) => props.theme.fontSize.tiny};
  }
  @media ${(props) => props.theme.mobile} {
    font-size: ${(props) => props.theme.fontSize.mini};
  }
`;

function SearchList({ list, chooseList }: any) {
  return list.map((el: string) => (
    <List key={nanoid()} value={el} onClick={chooseList}>
      {el}
    </List>
  ));
}

export default SearchList;
