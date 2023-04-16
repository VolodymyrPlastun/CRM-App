import styled from "styled-components";
import { List } from 'bootstrap-4-react';

export const ListItem = styled(List.Item)`
  margin-bottom: 8px;
`;

export const ItemLabel = styled.span`
  font-weight: bold;
`;

export const ListDivider = styled.hr`
  border: none;
  border-top: 1px solid #ccc;
  margin-top: 16px;
  margin-bottom: 16px;
`;