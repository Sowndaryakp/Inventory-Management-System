import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import ReactECharts from 'echarts-for-react';
const LineChart = () => {
    const option = {
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line',
                smooth: true
            }
        ]
    };
    return (_jsxs("div", { children: [_jsx("h2", { children: "Weekly Data" }), _jsx(ReactECharts, { option: option, style: { height: '500px', width: '100%' } })] }));
};
export default LineChart;
