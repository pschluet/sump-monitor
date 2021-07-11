import React, { useEffect, useState } from 'react';
import { HistoryPlotProps } from './history-plot-props';
import './HistoryPlot.css';
import { Line } from 'react-chartjs-2';
import { ChartData } from 'chart.js';
import axios from 'axios';
import { format } from 'date-fns';
import { LevelState } from './level-state';

const plotData: ChartData = {
  labels: [0],
  datasets: [
    {
      label: 'One',
      data: [0],
      borderColor: '#01939A',
    },
    {
      label: 'Two',
      data: [0],
      borderColor: '#5DC8CD',
    },
    {
      label: 'Three',
      data: [0],
      borderColor: '#FFAB00',
    },
    {
      label: 'Four',
      data: [0],
      borderColor: '#FFD173',
    },
    {
      label: 'Five',
      data: [0],
      borderColor: '#FF0700',
    },
    {
      label: 'Six',
      data: [0],
      borderColor: '#FF7673',
    },
  ],
};

export const HistoryPlot = (props: HistoryPlotProps) => {
  const [data, setData] = useState(plotData);

  useEffect(() => {
    const fetchData = async () => {
      const date = format(new Date(), 'yyyy-MM-dd');
      try {
        const result = await axios.get<LevelState[]>(
          `https://sump.pauldev.io/levelStates?date=${date}`,
        );
        if (result.data.length > 0) {
          const d = result.data;
          console.log(d);
          setData({
            labels: d.map((x) => x.timestamp),
            datasets: [
              {
                label: 'Main 1',
                data: d.map((x) => +x.mainPumpSensor1Underwater),
                borderColor: '#01939A',
              },
              {
                label: 'Main 2',
                data: d.map((x) => +x.mainPumpSensor2Underwater),
                borderColor: '#5DC8CD',
              },
              {
                label: 'Backup 1',
                data: d.map(x => +x.backupPumpSensor1Underwater),
                borderColor: '#FFAB00',
              },
              {
                label: 'Backup 2',
                data: d.map(x => +x.backupPumpSensor2Underwater),
                borderColor: '#FFD173',
              },
              {
                label: 'Flood 1',
                data: d.map(x => +x.floodAlarmSensor1Underwater),
                borderColor: '#FF0700',
              },
              {
                label: 'Flood 2',
                data: d.map(x => +x.floodAlarmSensor2Underwater),
                borderColor: '#FF7673',
              },
            ],
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="date">{props.date.toDateString()}</div>
      <Line type={'line'} data={data} />
    </>
  );
};
