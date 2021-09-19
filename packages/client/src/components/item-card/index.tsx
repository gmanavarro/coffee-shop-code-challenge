import React, { FunctionComponent } from 'react';
import { ItemDto } from '@agnos-code-challenge/shared';
import { Button, Space, Typography } from 'antd';
import styled from 'styled-components';
const { Title, Text } = Typography;

type Props = {
  item: ItemDto;
  onButtonClick: (item: ItemDto) => void;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-radius: 1rem;
  overflow: hidden;
`;

const ItemDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: space-around;
  width: min(100%, 20rem);
  height: 100%;
`;

const ItemImage = styled.img`
  max-width: min(100%, 20rem);
  height: auto;
`;

const ItemCard: FunctionComponent<Props> = ({ item, onButtonClick }: Props) => {
  return (
    <Container>
      <ItemImage alt={item.name} src={item.imageUrl} />
      <ItemDataContainer>
        <Title level={2}>{item.name}</Title>
        <Text strong italic>
          {item.category}
        </Text>
        <Space size="large">
          <Text strong>Price: {item.price}</Text>
          <Text strong>Tax Rate: {item.taxRate}</Text>
        </Space>
        <Button
          shape="round"
          type="primary"
          onClick={() => onButtonClick(item)}
        >
          Add to Order
        </Button>
      </ItemDataContainer>
    </Container>
  );
};

export default ItemCard;
