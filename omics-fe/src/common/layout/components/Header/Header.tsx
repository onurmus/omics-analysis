import React from 'react';

import { Col, Layout, Row } from 'antd';

const { Header } = Layout;

export const CustomHeader: React.FC = () => {
  return (
    <Header
      style={{
        alignItems: 'center',
        boxShadow: '0px 2px 50px 4px rgba(51, 65, 85, 0.05)',
        display: 'flex',
        height: 80,
        justifyContent: 'space-between',
        lineHeight: 'unset',
        padding: 0,
        paddingLeft: 16,
        paddingRight: 16,
        position: 'fixed',
        width: '100%',
        zIndex: 20,
      }}
    >
      <Row align='middle'>
        <Col span={8}>
          <h1 style={{ color: 'white' }}>Welcome</h1>
        </Col>
        <Col span={8}>
          <a href='/'>Gene Visualization</a>
        </Col>
        <Col span={8}>
          <a href='/experiment'>Create Experiment</a>
        </Col>
      </Row>
    </Header>
  );
};
