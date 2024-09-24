// src/components/ToolAvailabilityAndUsageChart.tsx

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchToolAvailabilityAndUsage } from '../../redux/actions/toolAvailabilityAndUsageActions';
import { RootState } from '../../redux/reducers';
import ReactECharts from 'echarts-for-react';

const ToolAvailabilityAndUsageChart: React.FC = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state: RootState) => state.toolAvailabilityAndUsage);

  useEffect(() => {
    dispatch(fetchToolAvailabilityAndUsage());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
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

  return (
    <div>
      <h2  className="text-2xl text-center font-bold mt-5">Tool Availability and Usage</h2>
      <ReactECharts option={option} style={{ height: '300px', width: '100%' }} />
    </div>
  );
};

export default ToolAvailabilityAndUsageChart;
