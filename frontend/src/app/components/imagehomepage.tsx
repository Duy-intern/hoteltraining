import React from 'react';
import {  Card, Col, Row } from 'antd';
import DetailButton from './hoteldetailbutton';

const HomeCard: React.FC = () => (
  <Row gutter={16}>
    <Col span={8}>
      <Card title="Card title" bordered={false}>
        Card content
        <DetailButton/>
      </Card>
    </Col>
  
  </Row>
);

export default HomeCard;