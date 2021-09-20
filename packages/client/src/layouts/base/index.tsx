import React, { FunctionComponent, PropsWithChildren } from 'react';
import { Badge, Button, Layout, Tooltip, Typography } from 'antd';
import { styles } from './styles';
import { ShopTwoTone } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

type Props = {
  onBadgeButtonClick: () => void;
  badgeCount: number;
};

export const BaseLayout: FunctionComponent<Props> = (
  props: PropsWithChildren<Props>,
) => {
  return (
    <Layout style={styles.layout} className="layout">
      <Header style={styles.header}>
        <Title style={{ margin: 0, color: 'white' }}>Coffee Shop</Title>
        <Tooltip
          trigger="hover"
          placement="bottomLeft"
          title="Click to see your current order details"
        >
          <Badge count={props.badgeCount}>
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
