import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// MonthlyToolRequestsLineChart.tsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMonthlyToolRequestTrends } from '../../redux/actions/monthlyToolRequestTrendsActions';
import ReactECharts from 'echarts-for-react';
const MonthlyToolRequestsLineChart = () => {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state.monthlyToolRequestTrends);
    useEffect(() => {
        dispatch(fetchMonthlyToolRequestTrends());
    }, [dispatch]);
    if (loading) {
        return _jsx("div", { children: "Loading..." });
    }
    if (error) {
        return _jsxs("div", { children: ["Error: ", error] });
    }
    const chartData = data.map((item) => ({ name: item.month, value: item.total_requests }));
    const option = {
        xAxis: {
            type: 'category',
            data: data.map((item) => item.month),
        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
                data: chartData,
                type: 'line',
                smooth: true,
            },
        ],
    };
    return (_jsxs("div", { children: [_jsx("h2", { className: "text-2xl text-center font-bold mt-5", children: "Monthly Tool Request Trends" }), _jsx(ReactECharts, { option: option, style: { height: '400px', width: '100%' } })] }));
};
export default MonthlyToolRequestsLineChart;
