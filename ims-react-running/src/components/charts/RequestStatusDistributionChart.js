import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/components/RequestStatusDistributionChart.tsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRequestStatusDistribution } from '../../redux/actions/requestStatusDistributionActions';
import ReactECharts from 'echarts-for-react';
const RequestStatusDistributionChart = () => {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state.requestStatusDistribution);
    useEffect(() => {
        dispatch(fetchRequestStatusDistribution());
    }, [dispatch]);
    if (loading) {
        return _jsx("div", { children: "Loading..." });
    }
    if (error) {
        return _jsxs("div", { children: ["Error: ", error] });
    }
    const chartData = data.map((item) => ({
        value: item.count,
        name: item.status,
        itemStyle: {
            color: item.status === 'Approved' ? 'rgb(145,204,117)' : 'rgb(238,102,102)',
        },
    }));
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
                name: 'Request Status',
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
    return (_jsxs("div", { children: [_jsx("h2", { className: "text-2xl text-center font-bold mt-5", children: "Request Status Distribution" }), _jsx(ReactECharts, { option: option, style: { height: '300px', width: '100%' } })] }));
};
export default RequestStatusDistributionChart;
