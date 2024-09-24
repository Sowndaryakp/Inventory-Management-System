import React from 'react';
import { CircularProgress, CircularProgressLabel, Box, Heading } from '@chakra-ui/react';

interface GaugeProps {
  name: string;
  lastCalibratedDate: string; // ISO string date format
  calibrationIntervalDays: number; // Number of days after which calibration is needed
}

const Gauge: React.FC<GaugeProps> = ({ name, lastCalibratedDate, calibrationIntervalDays }) => {
  const lastCalibrated = new Date(lastCalibratedDate);
  const today = new Date();
  const timeElapsed = Math.floor((today.getTime() - lastCalibrated.getTime()) / (1000 * 60 * 60 * 24)); // Days elapsed
  const daysRemaining = calibrationIntervalDays - timeElapsed;
  const progressPercentage = Math.max(0, (daysRemaining / calibrationIntervalDays) * 100);

  return (
    <Box textAlign="center" margin="20px">
      <Heading size="md">{name}</Heading>
      <CircularProgress
        value={progressPercentage}
        size="120px"
        color={daysRemaining <= 0 ? 'red.400' : 'green.400'}
      >
        <CircularProgressLabel>
          {daysRemaining > 0 ? `${daysRemaining} days` : 'Due'}
        </CircularProgressLabel>
      </CircularProgress>
    </Box>
  );
};

export default Gauge;
