import React, { FunctionComponent } from 'react';
import { Layout, Menu } from 'antd';
const { Header, Content, Footer } = Layout;

type Props = {
  items: [];
};

const App: FunctionComponent<Props> = (props) => {
  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content">Content</div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default App;
