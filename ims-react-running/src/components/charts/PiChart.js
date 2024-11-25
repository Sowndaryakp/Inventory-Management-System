import { jsx as _jsx } from "react/jsx-runtime";
import ReactEcharts from 'echarts-for-react';
const PiChart = () => {
    const option = {
        legend: {
            // top: '5%',
            left: 'center'
        },
        toolbox: {
            show: true,
            feature: {
                mark: { show: true },
                // dataView: { show: true, readOnly: false },
                restore: { show: true },
                saveAsImage: { show: true }
            }
        },
        series: [
            {
                name: 'Nightingale Chart',
                type: 'pie',
                radius: [50, 120],
                center: ['50%', '50%'],
                roseType: 'area',
                itemStyle: {
                    borderRadius: 8
                },
                data: [
                    { value: 40, name: 'rose 1' },
                    { value: 38, name: 'rose 2' },
                    { value: 32, name: 'rose 3' },
                    { value: 30, name: 'rose 4' },
                    { value: 28, name: 'rose 5' },
                    { value: 26, name: 'rose 6' },
                    { value: 22, name: 'rose 7' },
                    { value: 18, name: 'rose 8' }
                ]
            }
        ]
    };
    return (_jsx("div", { children: _jsx(ReactEcharts, { option: option, style: { height: '300px', width: '100%' } }) }));
};
export default PiChart;