import React from 'react';
import { Card, Row, Col, Typography, Table } from 'antd';
import Car from './Car';

const { Title } = Typography;

const ParkingLotContainer = () => {
    const parkingLots = [
        { name: 'The Plaza Park', capacity: 9, cars: ['ABC123', 'DEF456', null, null, null, null, null, null, null] },
        { name: 'City Mall Garage', capacity: 12, cars: ['GHI789', 'JKL012', 'MNO345', null, null, null, null, null, null, null, null, null] },
        { name: 'Office Tower Parking', capacity: 9, cars: [null, null, null, null, null, null, null, null, null] }
    ];

    const renderParkingGrid = (cars, capacity) => {
        const rows = Math.ceil(capacity / 3); // Number of rows
        const cols = 3; // Fixed columns (3 per row)
        const grid = [];

        for (let i = 0; i < rows; i++) {
            let row = [];
            for (let j = 0; j < cols; j++) {
                const index = i * cols + j;
                row.push(
                    <Col
                        key={index}
                        span={8}
                        style={{
                            border: '1px solid #d9d9d9',
                            height: '60px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: cars[index] ? '#f6ffed' : '#fff',
                        }}
                    >
                        {cars[index] ? <Car licensePlate={cars[index]} /> : ''}
                    </Col>
                );
            }
            grid.push(
                <Row key={i} gutter={[8, 8]} justify="center">
                    {row}
                </Row>
            );
        }

        return grid;
    };

    return (
        <div style={{ padding: '20px' }}>
            <Row gutter={[16, 16]} justify="center">
                {parkingLots.map((lot, index) => (
                    <Col key={index} xs={24} sm={24} md={12} lg={8}>
                        <Card
                            title={<Title level={4}>{lot.name}</Title>}
                            bordered={true}
                            style={{ textAlign: 'center' }}
                            bodyStyle={{ padding: '16px' }}
                        >
                            <div style={{ padding: '10px' }}>
                                {renderParkingGrid(lot.cars, lot.capacity)}
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default ParkingLotContainer;