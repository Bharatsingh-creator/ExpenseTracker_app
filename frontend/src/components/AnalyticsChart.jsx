import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

// props: data object containing category amounts
// example: { "Cafe & Restaurants": 400, Shopping: 600, ... }
// optional colors array to customize segment colors.
const AnalyticsChart = ({ categoryData = {}, colors = [] }) => {
  const labels = Object.keys(categoryData);
  const values = Object.values(categoryData);

  // generate a palette that covers multiple semantic areas; using CSS variables
  // Use a variety of discrete colors in case many categories exist
  const defaultColors = [
    '#FF6384', // pink
    '#36A2EB', // blue
    '#FFCE56', // yellow
    '#4BC0C0', // teal
    '#9966FF', // purple
    '#FF9F40', // orange
    '#E7E9ED', // light grey
    '#8AFF8A', // light green
    '#FF8A80', // light red
    '#80D8FF', // light cyan
    '#D0A9F5', // lavender
    '#FFD180', // light amber
    '#B39DDB', // pastel purple
    '#FFAB91', // peach
    '#A5D6A7', // pastel green
    '#90CAF9', // pastel blue
    '#CE93D8', // pastel magenta
    '#FFF59D', // pastel yellow
  ];

  const chartColors = colors.length >= labels.length ? colors : labels.map((_,i)=> defaultColors[i % defaultColors.length]);

  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: chartColors,
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: '70%',
    plugins: {
      legend: {
        position: 'right',
        labels: {
          boxWidth: 12,
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.parsed || 0;
            return `${label}: $${value}`;
          }
        }
      }
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="w-full h-full">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default AnalyticsChart;
