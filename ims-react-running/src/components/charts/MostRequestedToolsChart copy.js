import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/components/MostRequestedToolsChart.tsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMostRequestedTools } from '../redux/actions/mostRequestedToolsActions';
import ReactECharts from 'echarts-for-react';
const MostRequestedToolsChart = () => {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state.mostRequestedTools);
    useEffect(() => {
        dispatch(fetchMostRequestedTools());
    }, [dispatch]);
    if (loading) {
        return _jsx("div", { children: "Loading..." });
    }
    if (error) {
        return _jsxs("div", { children: ["Error: ", error] });
    }
    const xAxisData = data.map((item) => item.tool_name);
    const seriesData = data.map((item) => item.request_count);
    const option = {
        xAxis: {
            type: 'category',
            data: xAxisData,
        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
                data: seriesData,
                type: 'line',
                smooth: true,
            },
        ],
    };
    return (_jsxs("div", { children: [_jsx("h2", { className: "text-2xl text-center font-bold mb-4", children: "Most Requested Tools" }), _jsx(ReactECharts, { option: option, style: { height: '400px', width: '100%' } })] }));
};
export default MostRequestedToolsChart;
