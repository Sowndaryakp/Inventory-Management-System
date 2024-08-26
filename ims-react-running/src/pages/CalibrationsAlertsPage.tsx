import React, { useEffect, useState } from 'react';
import { Box, Heading } from '@chakra-ui/react';
import Gauge from '../components/Alerts/Gauge'; // Adjust the import path as necessary

interface GaugeData {
  id: string;
  name: string;
  lastCalibratedDate: string; // ISO string date format
  calibrationIntervalDays: number; // Number of days after which calibration is needed
}

const CalibrationAlert: React.FC = () => {
  const [gauges, setGauges] = useState<GaugeData[]>([
    { id: '1', name: 'Gauge A', lastCalibratedDate: '2023-06-01', calibrationIntervalDays: 365 },
    { id: '2', name: 'Gauge B', lastCalibratedDate: '2023-12-01', calibrationIntervalDays: 180 },
    // Add more gauges as needed
  ]);

  const [gaugesDueForCalibration, setGaugesDueForCalibration] = useState<GaugeData[]>([]);

  useEffect(() => {
    const today = new Date();

    const dueGauges = gauges.filter(gauge => {
      const lastCalibratedDate = new Date(gauge.lastCalibratedDate);
      const nextCalibrationDate = new Date(lastCalibratedDate);
      nextCalibrationDate.setDate(lastCalibratedDate.getDate() + gauge.calibrationIntervalDays);

      return nextCalibrationDate <= today;
    });

    setGaugesDueForCalibration(dueGauges);
  }, [gauges]);

  return (
    <Box>
      <Heading as="h1" size="lg">Calibration Alerts</Heading>
      {gaugesDueForCalibration.length > 0 ? (
        <Box>
          {gaugesDueForCalibration.map(gauge => (
            <Gauge
              key={gauge.id}
              name={gauge.name}
              lastCalibratedDate={gauge.lastCalibratedDate}
              calibrationIntervalDays={gauge.calibrationIntervalDays}
            />
          ))}
        </Box>
      ) : (
        <Box>All gauges are up to date.</Box>
      )}
    </Box>
  );
};

export default CalibrationAlert;
