import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CircularProgress, CircularProgressLabel, Box, Heading } from '@chakra-ui/react';
const Gauge = ({ name, lastCalibratedDate, calibrationIntervalDays }) => {
    const lastCalibrated = new Date(lastCalibratedDate);
    const today = new Date();
    const timeElapsed = Math.floor((today.getTime() - lastCalibrated.getTime()) / (1000 * 60 * 60 * 24)); // Days elapsed
    const daysRemaining = calibrationIntervalDays - timeElapsed;
    const progressPercentage = Math.max(0, (daysRemaining / calibrationIntervalDays) * 100);
    return (_jsxs(Box, { textAlign: "center", margin: "20px", children: [_jsx(Heading, { size: "md", children: name }), _jsx(CircularProgress, { value: progressPercentage, size: "120px", color: daysRemaining <= 0 ? 'red.400' : 'green.400', children: _jsx(CircularProgressLabel, { children: daysRemaining > 0 ? `${daysRemaining} days` : 'Due' }) })] }));
};
export default Gauge;
