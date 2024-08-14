import React from 'react';
import { Line } from 'react-chartjs-2';
import { LinearScale, CategoryScale, Chart } from "chart.js";
import { Chart, PointElement, LineElement } from 'chart.js';

Chart.register(PointElement);
Chart.register(LineElement);
Chart.register(LinearScale);
Chart.register(CategoryScale);


const Statistics = () => {
  const data = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        label: 'Hours spent this week',
        data: [8.5, 5.5, 6.5, 10, 12.5, 1.2, 4.5],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        type: 'linear',
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="statistic m-10 mt-0">
      <div><h2 className="font-bold">Statistics</h2></div>

      <div className="cards mt-5 flex gap-5">
        <div className="card flex flex-col p-5 pr-10 bg-white rounded-xl">
          <span className="text-4xl font-semibold">2</span>
          <span className="text-sm mt-2 w-20 text-gray-400">Courses completed</span>
        </div>

        <div className="card flex flex-col p-5 pr-10 bg-white rounded-xl">
          <span className="text-4xl font-semibold">3</span>
          <span className="text-sm mt-2 w-20 text-gray-400">Courses in progress</span>
        </div>

        <div className="card flex gap-5 p-5 pr-10 bg-white rounded-xl">
          <div className="flex flex-col">
            <span className="text-4xl font-semibold">8.5</span>
            <span className="text-sm mt-2 w-28 text-gray-400">Hours spent this week</span>
          </div>
          <div className="flex-grow w-44">
            <Line data={data} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
