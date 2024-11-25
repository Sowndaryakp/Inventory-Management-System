import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/components/ToolAvailabilityAndUsageChart.tsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchToolAvailabilityAndUsage } from '../../redux/actions/toolAvailabilityAndUsageActions';
import ReactECharts from 'echarts-for-react';
const ToolAvailabilityAndUsageChart = () => {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state.toolAvailabilityAndUsage);
    useEffect(() => {
        dispatch(fetchToolAvailabilityAndUsage());
    }, [dispatch]);
    if (loading) {
        return _jsx("div", { children: "Loading..." });
    }
    if (error) {
        return _jsxs("div", { children: ["Error: ", error] });
    }
    const chartData = [
        {
            value: data.available,
            name: 'Available',
            itemStyle: {
            // color: 'green',
            },
        },
        {
            value: data.in_use,
            name: 'In Use',
            // itemStyle: {
            //   color: 'orange',
            // },
        },
    ];
    const option = {
        tooltip: {
            trigger: 'item',
        },
        legend: {
            top: '5%',
            left: 'center',
        },
        series: [
            {
                name: 'Tool Status',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                },
                label: {
                    show: false,
                    position: 'center',
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 40,
                        fontWeight: 'bold',
                    },
                },
                labelLine: {
                    show: false,
                },
                data: chartData,
            },
        ],
    };
    return (_jsxs("div", { children: [_jsx("h2", { className: "text-2xl text-center font-bold mt-5", children: "Tool Availability and Usage" }), _jsx(ReactECharts, { option: option, style: { height: '300px', width: '100%' } })] }));
};
export default ToolAvailabilityAndUsageChart;
