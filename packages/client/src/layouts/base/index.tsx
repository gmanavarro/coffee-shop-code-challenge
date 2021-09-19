import React, { FunctionComponent, PropsWithChildren } from 'react';
import { Badge, Button, Layout, Tooltip } from 'antd';
import { styles } from './styles';
import { ShopTwoTone } from '@ant-design/icons';
import { useAppSelector } from '../../hooks';
const { Header, Content, Footer } = Layout;

type Props = {
  onBadgeButtonClick: () => void;
};

export const BaseLayout: FunctionComponent<Props> = (
  props: PropsWithChildren<Props>,
) => {
  const activeOrderItemsCount = useAppSelector(
    (state) => state.activeOrderItemCount,
  );

  return (
    <Layout style={styles.layout} className="layout">
      <Header style={styles.header}>
        <Tooltip
          trigger="hover"
          placement="bottomLeft"
          title="Click to see your current order details"
        >
          <Badge count={activeOrderItemsCount}>
            <Button
              onClick={props.onBadgeButtonClick}
              size="large"
              shape="circle"
              icon={<ShopTwoTone />}
            />
          </Badge>
        </Tooltip>
      </Header>
      <Content style={styles.content}>
        <div className="site-layout-content">{props.children}</div>
      </Content>
      <Footer style={styles.footer}>Coffee Shop ©2021</Footer>
    </Layout>
  );
};
