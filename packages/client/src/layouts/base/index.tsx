import React, { FunctionComponent, PropsWithChildren } from 'react';
import { Layout } from 'antd';
const { Header, Content, Footer } = Layout;

export const BaseLayout: FunctionComponent = (
  props: PropsWithChildren<any>,
) => {
  return (
    <Layout style={{ height: 'max(100%, 100vh)' }} className="layout">
      <Header>
        <div className="logo" />
      </Header>
      <Content style={{ padding: '2rem' }}>
        <div className="site-layout-content">{props.children}</div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Coffee Shop ©2021</Footer>
    </Layout>
  );
};
