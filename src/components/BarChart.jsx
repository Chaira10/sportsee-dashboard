import React, { PureComponent, useEffect, useState  } from 'react';
import { getDailyActivity } from '../ServiceApi';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './BarChart.css';

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
  const [dailyActivityData, setDailyActivityData] = useState([]);

  useEffect(() => {
    getDailyActivity(userId)
      .then((data) => {
        // Ajouter une propriété numérique 'dayNumber' à chaque entrée
        const dataWithDayNumbers = data.map((entry, index) => ({
          ...entry,
          dayNumber: index + 1, // Commence à partir de 1
        }));
        setDailyActivityData(dataWithDayNumbers);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des données d\'activité : ', error);
      });
  }, [userId]);

  return (
    <div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={dailyActivityData}
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
          <YAxis orientation="right" tickLine={false} />
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