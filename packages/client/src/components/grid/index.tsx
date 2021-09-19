import React, { FunctionComponent, PropsWithChildren } from 'react';
import styled from 'styled-components';

const GridContainer = styled.div`
  display: grid;
  gap: 1rem;
  grid-auto-rows: 25rem;
  grid-template-columns: repeat(auto=fill, minmax(min(100%, 25rem), 1fr));
`;

const GridLayout: FunctionComponent = (props: PropsWithChildren<{}>) => {
  return <GridContainer>{props.children}</GridContainer>;
};

export default GridLayout;
