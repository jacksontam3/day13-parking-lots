import React, { useEffect, useContext, useState  } from 'react';
import ParkingLotWorker from './ParkingLotWorker';
import ParkingLotContainer from './ParkingLotContainer';
import { ParkingLotContext } from './ParkingLotContext';
import { fetchParkingLots } from './api';


const ParkingLot = () => {
    const { dispatch } = useContext(ParkingLotContext);
    const [flash, setFlash] = useState(false);

    const refreshParkingLots = () => {
        fetchParkingLots()
            .then(response => {
                const data = response.data;
                const formattedData = data.map(lot => ({
                    id: lot.id,
                    name: lot.name,
                    capacity: lot.tickets.length,
                    cars: Array(lot.tickets.length).fill(null).map((_, index) => {
                        const ticket = lot.tickets.find(ticket => ticket.position === index + 1);
                        return ticket ? ticket.plateNumber : null;
                    })
                }));
                dispatch({ type: 'SET_PARKING_LOTS', payload: formattedData });
                setFlash(true);
                setTimeout(() => setFlash(false), 100); // Flash effect duration
            })
            .catch(error => {
                console.error('Failed to fetch parking lots:', error);
            })
            .finally(() => {
                console.log('Fetch parking lots request completed.');
            });
    };
    useEffect(() => {
        refreshParkingLots();
    }, [dispatch]);

    return (
        <div className={flash ? 'flash' : ''}>
            <ParkingLotWorker refreshParkingLots={refreshParkingLots} />
            <ParkingLotContainer/>
        </div>
    );
};

export default ParkingLot;