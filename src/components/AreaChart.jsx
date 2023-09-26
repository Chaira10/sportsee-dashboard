import React, { useEffect, useState } from 'react';
import { getAverages } from '../ServiceApi'; 
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function AreaCharts({ userId }) {
    const [averageData, setAverageData] = useState([]);

    useEffect(() => {
      
      getAverages(userId)
        .then((averages) => {
          setAverageData(averages);
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération des données d\'activité moyenne : ', error);
        });
    }, [userId]); 
  
    const daysOfWeek = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

  
    const formattedData = averageData.map((session, index) => ({
        name: daysOfWeek[index], 
        uv: session.sessionLength,
        pv: session.sessionLength, 
      }));

      
  
    return (
      <ResponsiveContainer width="99%" height={210}>
        <AreaChart
          width={500}
          height={500}
          data={formattedData} 
          margin={{
            top: 0,
            right: 0,
            left: 5,
            bottom: 5,
          }}
          className={ 'darken-graph'}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} horizontal={false} fillOpacity={0.6}   />
          <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{stroke: 'white'}}  />
          <Tooltip 
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const sessionLength = payload[0].payload.uv; 
              return (
                <div className="custom-tooltip">
                  <p>{sessionLength} min</p>
                </div>
              );
            }
            return null;
          }}
        />
          <Area type="monotone" dataKey="uv" stroke="white" strockWidth={2} fill="#EB3030" />
          <Area type="monotone" dataKey="pv" stroke="white" strockWidth={2} fill="#EB3030" fillOpacity={0.6} />

        </AreaChart>
      </ResponsiveContainer>
    );
  }
  

export default AreaCharts