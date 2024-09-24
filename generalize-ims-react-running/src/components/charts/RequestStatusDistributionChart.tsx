// src/components/RequestStatusDistributionChart.tsx

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRequestStatusDistribution } from '../../redux/actions/requestStatusDistributionActions';
import { RootState } from '../../redux/reducers';
import ReactECharts from 'echarts-for-react';

const RequestStatusDistributionChart: React.FC = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state: RootState) => state.requestStatusDistribution);

  useEffect(() => {
    dispatch(fetchRequestStatusDistribution());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
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

  return (
    <div>
      <h2  className="text-2xl text-center font-bold mt-5">Request Status Distribution</h2>
      <ReactECharts option={option} style={{ height: '300px', width: '100%' }} />
    </div>
  );
};

export default RequestStatusDistributionChart;
