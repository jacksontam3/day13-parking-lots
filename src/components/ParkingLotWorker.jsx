import React, { useState } from 'react';
import { Input, Select, Button, Space, message } from 'antd';

const { Option } = Select;

const ParkingLotWorker = () => {
    const [plateNumber, setPlateNumber] = useState('');
    const [parkingStrategy, setParkingStrategy] = useState('');

    const handlePark = () => {
        if (!plateNumber || !parkingStrategy) {
            message.warning('Please fill in both Plate Number and Parking Strategy!');
            return;
        }
        console.log(`Plate Number: ${plateNumber}, Parking Strategy: ${parkingStrategy}`);
        setPlateNumber('');
        setParkingStrategy('');
        message.success('Car parked successfully!');
    };

    const handleFetch = () => {
        console.log('Fetch button clicked');
        message.info('Fetch operation executed!');
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
            <Space direction="horizontal" size="large">
                <Input
                    placeholder="Enter Plate Number"
                    value={plateNumber}
                    onChange={(e) => setPlateNumber(e.target.value)}
                    style={{ width: 200 }}
                />
                <Select
                    placeholder="Select Parking Strategy"
                    value={parkingStrategy}
                    onChange={(value) => setParkingStrategy(value)}
                    style={{ width: 200 }}
                >
                    <Option value="Standard">Standard</Option>
                    <Option value="Smart">Smart</Option>
                    <Option value="SuperSmart">SuperSmart</Option>
                </Select>
                <Button type="primary" onClick={handlePark}>
                    Park
                </Button>
                <Button type="default" onClick={handleFetch}>
                    Fetch
                </Button>
            </Space>
        </div>
    );
};

export default ParkingLotWorker;