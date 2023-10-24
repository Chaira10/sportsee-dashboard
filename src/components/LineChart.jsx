import React, { useEffect, useState } from 'react';
import { getAverages } from '../ServiceApi';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

function LineCharts({ userId }) {
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

    const renderLegend = () => {
      return (
        <p
          style={{
            padding: '10% 0 0 10%',
            fontSize: '14px',
            color: '#fff',
          }}
        >
          Durée moyenne des sessions
        </p>
      )
    }

    return (
        <ResponsiveContainer width="100%" height='100%'>
            <LineChart
                data={formattedData}
                margin={{
                    top: 15,
                    right: 15,
                    left: 15,
                    bottom: 15,
                }}
                style={{
                  backgroundColor: '#FF0000',
                  color: '#FFF',
                  borderRadius: '5px',
        }}
            >
                <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: '#fff' }}/>
                <YAxis hide={true} />
                <Legend verticalAlign="top" align="right" content={renderLegend} />
                <Tooltip contentStyle={{ backgroundColor: 'lightgray', color: '#000', border: 'none' }} labelStyle={{ color: '#000', fontWeight: 'bold' }} formatter={(value) => <span style={{ color: '#000' }}>{`${value} min`}</span>}  />
                <Line type="monotone" dataKey="uv" stroke="#fff" dot={false} strokeWidth={2}/>
                {/* <Line type="monotone" dataKey="pv" stroke="#82ca9d" /> */}
            </LineChart>
        </ResponsiveContainer>
    );
}

export default LineCharts;
