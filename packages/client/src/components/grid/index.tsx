import React, { FunctionComponent, PropsWithChildren } from 'react';
import styled from 'styled-components';
import { ItemDto } from '@agnos-code-challenge/shared';
import ItemCard from '../item-card';

type Props = {
  isLoading: boolean;
  items: ItemDto[];
  onElementButtonClick: (item: ItemDto) => void;
};

const GridContainer = styled.div`
  display: grid;
  justify-content: center;
  gap: 2rem;
  grid-auto-rows: 30rem;
  grid-template-columns: repeat(auto-fill, min(100%, 20rem));
`;

const Grid: FunctionComponent<Props> = (props: PropsWithChildren<Props>) => {
  function mapItemCards(): JSX.Element[] {
    return props.items.map((item) => (
      <ItemCard
        key={item.id}
        item={item}
        onButtonClick={props.onElementButtonClick}
      />
    ));
  }
  return <GridContainer>{mapItemCards()}</GridContainer>;
};

export default Grid;
