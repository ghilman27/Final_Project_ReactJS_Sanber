import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import API from '../../api';
import styles from './Chart.module.css';

const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {
  const [dailyData, setDailyData] = useState({});

  // fetch data for chart when rendered
  useEffect(() => {
    const fetchDailyData = async () => {
      const dailyData = await API.getDailyData();

      setDailyData(dailyData);
    };

    fetchDailyData();
  }, []);

  // generate bar chart if users select an actual country (because dailyData for line chart is not available in the API for actual countries)
  const barChart = (
    confirmed ? (
      <Bar
        data={{
          labels: ['Infected', 'Recovered', 'Deaths'],
          datasets: [
            {
              label: 'People',
              backgroundColor: ['rgba(255, 193, 51, 1)', 'rgba(40, 167, 69, 1)', 'rgba(220, 53, 69, 1)'],
              data: [confirmed.value, recovered.value, deaths.value],
            },
          ],
        }}
        options={{
          legend: { display: false },
          title: { display: true, text: `Current state in ${country}` },
        }}
      />
    ) : null
  );

  // generate line chart if users select the world wide / global option
  const lineChart = (
    dailyData[0] ? (
      <Line
        data={{
          labels: dailyData.map(({ date }) => date),
          datasets: [{
            data: dailyData.map((data) => data.confirmed),
            label: 'Infected',
            borderColor: 'rgba(255, 193, 51, 1)',
            backgroundColor: 'rgba(255, 193, 51, 0.5)',
            fill: true,
          }, {
            data: dailyData.map((data) => data.deaths),
            label: 'Deaths',
            borderColor: 'rgba(220, 53, 69, 1)',
            backgroundColor: 'rgba(220, 53, 69, 1)',
            fill: true,
          }, 
          // after some checking, no daily data for recovered patients, saddd :(
          // {
          //   data: dailyData.map((data) => data.recovered),
          //   label: 'Recovered',
          //   borderColor: 'rgba(40, 167, 69, 1)',
          //   backgroundColor: 'rgba(40, 167, 69, 0.5)',
          //   fill: true,
          // },
          ],
        }}
      />
    ) : null
  );

  return (
    <div className={styles.container}>
      {/* conditional rendering as the condition explained on the above */}
      {country ? barChart : lineChart}
    </div>
  );
};

export default Chart;
