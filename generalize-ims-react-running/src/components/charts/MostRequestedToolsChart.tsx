// src/components/MostRequestedToolsChart.tsx

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMostRequestedTools } from '../../redux/actions/mostRequestedToolsActions';
import { RootState } from '../../redux/reducers';
import ReactECharts from 'echarts-for-react';

interface ToolData {
  tool_name: string;
  request_count: number;
}

const MostRequestedToolsChart: React.FC = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state: RootState) => state.mostRequestedTools);

  useEffect(() => {
    dispatch(fetchMostRequestedTools());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const xAxisData = data.map((item: ToolData) => item.tool_name);
  const seriesData = data.map((item: ToolData) => item.request_count);

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

  return (
    <div>
       <h2 className="text-2xl text-center font-bold mt-5">Most Requested Tools</h2>
      <ReactECharts option={option} style={{ height: '400px', width: '100%' }} />
    </div>
  );
};

export default MostRequestedToolsChart;
