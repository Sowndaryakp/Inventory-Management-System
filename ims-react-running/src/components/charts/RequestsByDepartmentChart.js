import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/components/RequestsByDepartmentChart.tsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRequestsByDepartment } from '../../redux/actions/requestsByDepartmentActions';
import ReactECharts from 'echarts-for-react';
const RequestsByDepartmentChart = () => {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state.requestsByDepartment);
    useEffect(() => {
        dispatch(fetchRequestsByDepartment());
    }, [dispatch]);
    if (loading) {
        return _jsx("div", { children: "Loading..." });
    }
    if (error) {
        return _jsxs("div", { children: ["Error: ", error] });
    }
    const xAxisData = data.map((item) => item.department_name);
    const approvedData = data.map((item) => ({ name: item.department_name, value: item.status === 'Approved' ? item.count : 0 }));
    const pendingData = data.map((item) => ({ name: item.department_name, value: item.status === 'Pending' ? item.count : 0 }));
    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999',
                },
            },
        },
        toolbox: {
            feature: {
                dataView: { show: true, readOnly: false },
                magicType: { show: true, type: ['line', 'bar'] },
                restore: { show: true },
                saveAsImage: { show: true },
            },
        },
        legend: {
            data: ['Approved', 'Pending'],
        },
        xAxis: [
            {
                type: 'category',
                data: xAxisData,
                axisPointer: {
                    type: 'shadow',
                },
            },
        ],
        yAxis: [
            {
                type: 'value',
                name: 'Count',
            },
        ],
        series: [
            {
                name: 'Approved',
                type: 'bar',
                stack: 'total',
                emphasis: {
                    focus: 'series',
                },
                data: approvedData,
            },
            {
                name: 'Pending',
                type: 'bar',
                stack: 'total',
                emphasis: {
                    focus: 'series',
                },
                data: pendingData,
            },
        ],
    };
    return (_jsxs("div", { children: [_jsx("h2", { className: "text-2xl text-center font-bold mt-5", children: "Requests by Department" }), _jsx(ReactECharts, { option: option, style: { height: '400px', width: '100%' } })] }));
};
export default RequestsByDepartmentChart;
