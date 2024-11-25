import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Box, Heading } from '@chakra-ui/react';
import Gauge from '../components/Alerts/Gauge'; // Adjust the import path as necessary
const CalibrationAlert = () => {
    const [gauges, setGauges] = useState([
        { id: '1', name: 'Gauge A', lastCalibratedDate: '2023-06-01', calibrationIntervalDays: 365 },
        { id: '2', name: 'Gauge B', lastCalibratedDate: '2023-12-01', calibrationIntervalDays: 180 },
        // Add more gauges as needed
    ]);
    const [gaugesDueForCalibration, setGaugesDueForCalibration] = useState([]);
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
    return (_jsxs(Box, { children: [_jsx(Heading, { as: "h1", size: "lg", children: "Calibration Alerts" }), gaugesDueForCalibration.length > 0 ? (_jsx(Box, { children: gaugesDueForCalibration.map(gauge => (_jsx(Gauge, { name: gauge.name, lastCalibratedDate: gauge.lastCalibratedDate, calibrationIntervalDays: gauge.calibrationIntervalDays }, gauge.id))) })) : (_jsx(Box, { children: "All gauges are up to date." }))] }));
};
export default CalibrationAlert;
