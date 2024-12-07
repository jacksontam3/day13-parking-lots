import axios from 'axios';

const strategyEnum = {
    Standard: 'STANDARD',
    Smart: 'SMART',
    SuperSmart: 'SUPERSMART'
};

const baseUrl = 'http://localhost:8080/parkinglot';

export const fetchParkingLots = () => {
    return axios.get(baseUrl);
};

export const parkCar = (plateNumber, strategyType) => {
    const parkingStrategyType = strategyEnum[strategyType];
    console.log('plateNumber:', plateNumber);
    console.log('strategyType:', parkingStrategyType);

    return axios.post(`${baseUrl}/park`, { plateNumber, parkingStrategyType }, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            console.log('Response from backend:', response.data);
            return response;
        })
        .catch(error => {
            console.error('Error from backend:', error.response ? error.response.data : error.message);
            throw error;
        });
};