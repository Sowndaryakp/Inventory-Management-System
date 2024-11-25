import { jsx as _jsx } from "react/jsx-runtime";
import ReactEcharts from 'echarts-for-react';
const BarChart = () => {
    // Generate random data for the series
    const generateRandomData = () => {
        const data = [];
        for (let i = 0; i < 7; i++) {
            data.push(Math.floor(Math.random() * 500)); // Generate random values between 0 and 500
        }
        return data;
    };
    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: 'Direct',
                type: 'bar',
                barWidth: '60%',
                data: generateRandomData() // Use random data here
            }
        ]
    };
    return (_jsx("div", { children: _jsx(ReactEcharts, { option: option, style: { height: '380px', width: '100%' } }) }));
};
export default BarChart;
