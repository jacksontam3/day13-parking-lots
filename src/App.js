import React from 'react';
import './App.css';
import ParkingLot from './components/ParkingLot';
import { ParkingLotProvider } from './components/ParkingLotContext';

const App = () => {
  return (
      <ParkingLotProvider>
        <div>
          <ParkingLot />
        </div>
      </ParkingLotProvider>
  );
};

export default App;