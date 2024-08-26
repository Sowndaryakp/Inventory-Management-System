// MonthlyToolRequestsLineChart.tsx

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMonthlyToolRequestTrends } from '../../redux/actions/monthlyToolRequestTrendsActions';
import { RootState } from '../../redux/reducers';
import ReactECharts from 'echarts-for-react';

const MonthlyToolRequestsLineChart: React.FC = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state: RootState) => state.monthlyToolRequestTrends);

  useEffect(() => {
    dispatch(fetchMonthlyToolRequestTrends());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
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

  return (
    <div>
      <h2  className="text-2xl text-center font-bold mt-5">Monthly Tool Request Trends</h2>
      <ReactECharts option={option} style={{ height: '400px', width: '100%' }} />
    </div>
  );
};

export default MonthlyToolRequestsLineChart;
