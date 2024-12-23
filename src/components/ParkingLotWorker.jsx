import React, { useState , useContext} from 'react';
import {ParkingLotContext} from './ParkingLotContext';
import {fetchParkingLots, parkCar, fetchCar } from './api';
import { Input, Select, Button, Space, message } from 'antd';

const { Option } = Select;

const ParkingLotWorker = ({ refreshParkingLots }) => {
    const [plateNumber, setPlateNumber] = useState('');
    const [parkingStrategy, setParkingStrategy] = useState('');
    const {dispatch} = useContext(ParkingLotContext);

    const handlePark = () => {
        if (!plateNumber || !parkingStrategy) {
            alert('Plate Number and Parking Strategy are required.');
            return;
        }

        parkCar(plateNumber, parkingStrategy).then(response => {
            const {plateNumber, position, parkingLot} = response.data;
            dispatch({type: 'PARK_CAR', payload: {plateNumber, position, parkingLot}});
            setPlateNumber('');
            setParkingStrategy('');
            refreshParkingLots();
        })
            .catch(error => {
                console.error('Failed to park car:', error);
            })
    };

    const handleFetch = () => {
        if (!plateNumber) {
            alert('Plate Number is required.');
            return;
        }
        fetchCar(plateNumber)
            .then(response => {
                const { plateNumber } = response.data;
                dispatch({ type: 'REMOVE_CAR', payload: { plateNumber } });
                setPlateNumber('');
                refreshParkingLots();
            })
            .catch(error => {
                console.error('Failed to fetch car:', error);
            });
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
                    style={{width: 200}}
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