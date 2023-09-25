import React, { PureComponent, useEffect, useState  } from 'react';
import { getDailyActivity } from '../ServiceApi';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './BarChart.css';

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
      {/* <p>Activité Quotidienne</p> */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={dailyActivityData}
          margin={{
            top: 5,
            right: 5,
            left: 5,
            bottom: 5,
          }}
          barSize={10} 
          barGap={10}
        >
          <CartesianGrid strokeDasharray="3 3"   />
          <XAxis dataKey="dayNumber" />
          <YAxis  orientation="right" />
          <Tooltip />
          <Legend verticalAlign="top" align="right"  />
          <Bar dataKey="kilogram" fill="red" name="Poids (kg)" radius={[10, 10, 0, 0]} />
          <Bar dataKey="calories" fill="black" name="Calories brûlées" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

  

export default BarCharts