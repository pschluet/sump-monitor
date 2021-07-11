import React, { useState } from 'react';
import { HistoryPlotProps } from './history-plot-props';
import './HistoryPlot.css';
import { Line } from 'react-chartjs-2';
import { ChartData } from 'chart.js';

const plotData: ChartData = {
  labels: [1, 2, 3, 4, 5],
  datasets: [
    {
      label: 'One',
      data: [1, 1, 1, 1, 1],
      borderColor: '#01939A',
    },
    {
      label: 'Two',
      data: [2, 2, 2, 2, 2],
      borderColor: '#5DC8CD',
    },
    {
      label: 'Three',
      data: [3, 3, 3, 3, 3],
      borderColor: '#FFAB00',
    },
    {
      label: 'Four',
      data: [4, 4, 4, 4, 4],
      borderColor: '#FFD173',
    },
    {
      label: 'Five',
      data: [5, 5, 5, 5, 5],
      borderColor: '#FF0700',
    },
    {
      label: 'Six',
      data: [6, 6, 6, 6, 6],
      borderColor: '#FF7673',
    },
  ],
};

export const HistoryPlot = (props: HistoryPlotProps) => {
  const [data, setData] = useState(plotData);

  return (
    <>
      <div className="date">{props.date.toDateString()}</div>
      <Line type={'line'} data={data} />
    </>
  );
};
