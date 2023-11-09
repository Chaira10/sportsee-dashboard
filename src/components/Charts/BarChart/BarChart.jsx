import React, { PureComponent, useEffect, useState  } from 'react';
import { getDailyActivity } from '../../../ServiceApi';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './BarChart.css';
import { useUser } from '../../../context/Context';


function customizeName(name) {
  if (name === 'Poids (kg)') {
    return 'kg';
  } else if (name === 'Calories brûlées (kCal)') {
    return 'kCal';
  } else {
    return name;
  }
}

function BarCharts({ userId }) {
  const { activityData,error } = useUser();
  console.log(activityData);


  if (error) {
    return <div>Erreur: {error.message}</div>; 
  } else if (!activityData) {
    return <div>Chargement en cours...</div>;
  }

  const dataWithDayNumbers = activityData.map((entry, index) => ({
    ...entry,
    dayNumber: index + 1, 
  }));


  return (
    <div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={dataWithDayNumbers}
          margin={{
            top: 5,
            right: 5,
            left: 5,
            bottom: 0,
          }}
          barSize={10}
          barGap={10}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />

          <XAxis dataKey="dayNumber" padding={{ bottom: 20 }} tick={{stroke: 'lightgray', strokeWidth: 1}} tickLine={false}  />
          <YAxis orientation="right" tickLine={false} axisLine={false}  />
          <Tooltip
            content={({ payload }) => {
              if (payload && payload.length > 0) {
                return (
                  <div>
                    {payload.map((entry, index) => (
                      <p key={index} style={{ color: entry.color }} className={`tool${index}`}>
                        {`${customizeName(entry.value)} ${customizeName(entry.name)}`}
                      </p>
                    ))}
                  </div>
                );
              }
              return null;
            }}
            formatter={(value, name) => {
              return `${value}`;
            }}
          />

          <Legend verticalAlign="top" align="right" iconType="circle" height={76} />
          <Bar dataKey="kilogram" fill="red" name="Poids (kg)" radius={[10, 10, 0, 0]} />
          <Bar dataKey="calories" fill="black" name="Calories brûlées (kCal)" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

  

export default BarCharts