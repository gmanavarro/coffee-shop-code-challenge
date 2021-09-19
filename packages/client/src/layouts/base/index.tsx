import React, { FunctionComponent } from 'react';
import { Layout } from 'antd';
const { Header, Content, Footer } = Layout;

export const BaseLayout: FunctionComponent = (props) => {
  return (
    <Layout style={{ height: '100vh' }} className="layout">
      <Header>
        <div className="logo" />
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content">{props.children}</div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Coffee Shop ©2021</Footer>
    </Layout>
  );
};
