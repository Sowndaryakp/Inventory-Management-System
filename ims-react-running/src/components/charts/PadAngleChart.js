import { jsx as _jsx } from "react/jsx-runtime";
import ReactEcharts from 'echarts-for-react';
const PadAngleChart = () => {
    // Generate random data for the series
    const generateRandomData = () => {
        const data = [
            { value: Math.floor(Math.random() * 1000), name: 'Search Engine' },
            { value: Math.floor(Math.random() * 1000), name: 'Direct' },
            { value: Math.floor(Math.random() * 1000), name: 'Email' },
            { value: Math.floor(Math.random() * 1000), name: 'Union Ads' },
            { value: Math.floor(Math.random() * 1000), name: 'Video Ads' }
        ];
        return data;
    };
    const option = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: '5%',
            left: 'center'
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                padAngle: 5,
                itemStyle: {
                    borderRadius: 10,
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 40,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: generateRandomData() // Use random data here
            }
        ]
    };
    return (_jsx("div", { children: _jsx(ReactEcharts, { option: option, style: { height: '300px', width: '100%' } }) }));
};
export default PadAngleChart;
