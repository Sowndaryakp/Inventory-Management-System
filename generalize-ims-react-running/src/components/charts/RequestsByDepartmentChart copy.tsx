// src/components/RequestsByDepartmentChart.tsx

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRequestsByDepartment } from '../../redux/actions/requestsByDepartmentActions';
import { RootState } from '../../redux/reducers';
import ReactECharts from 'echarts-for-react';

const RequestsByDepartmentChart: React.FC = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state: RootState) => state.requestsByDepartment);

  useEffect(() => {
    dispatch(fetchRequestsByDepartment());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
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

  return (
    <div>
      <h2  className="text-2xl text-center font-bold mb-4">Requests by Department</h2>
      <ReactECharts option={option} style={{ height: '400px', width: '100%' }} />
    </div>
  );
};

export default RequestsByDepartmentChart;
