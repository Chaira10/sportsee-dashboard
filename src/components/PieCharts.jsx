import React, { useEffect, useState } from 'react';
import { getUsers } from '../ServiceApi';
import { PieChart, Pie, ResponsiveContainer, Cell } from 'recharts'; 

function PieCharts({ userId }) {
    const [userScore, setUserScore] = useState(0);

    useEffect(() => {
      // Utilisez la fonction getUsers pour récupérer les données de l'utilisateur
      getUsers(userId)
        .then((data) => {
          setUserScore(data.todayScore);
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération du score de l\'utilisateur : ', error);
        });
    }, [userId]);
  
    // Données pour le PieChart
    const data = [
      { name: 'Score', value: userScore * 100 },
      { name: 'Reste', value: 100 - userScore * 100 }, // Suppose que le score total est sur 100
    ];
  
    const COLORS = ['#0088FE', '#E7E7E7']; // Couleurs pour les segments du PieChart
  
    return (
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            startAngle={90}
            endAngle={-270}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    );
  }

export default PieCharts