import React, { useState, useEffect }  from 'react';
import { PieChart, Pie, ResponsiveContainer, Cell, } from 'recharts';
import { useUser } from '../../../context/Context';

const COLORS = ['red', '#FBFBFB ']; // Couleurs pour les segments du PieChart

function PieCharts({ userId }) {
    const { userData,error } = useUser(); 
    console.log(userData);

    const [circleRadius, setCircleRadius] = useState('29%');

    useEffect(() => {
      const handleResize = () => {
        setCircleRadius(window.innerWidth > 1400 ? '21%' : '29%');
      };
  
      window.addEventListener('resize', handleResize);
      handleResize(); // Appeler la fonction au chargement pour définir la taille initiale
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []); 

      if (error) {
        return <div>Erreur: {error.message}</div>; 
      } else if (!userData) {
        return <div>Chargement en cours...</div>;
      }

      
    const userScore = userData.todayScore;
    const chartData = [
        { name: 'Score', value: userScore * 100 },
        { name: 'Reste', value: 100 - userScore * 100 }, 
    ];

    const endAngle = 90 + userScore * 730;

    return (


        <ResponsiveContainer width="100%" height="100%">

            <PieChart >

        <circle cx="50%" cy="50%" fill="white" r={circleRadius}></circle>
        <text
          x="15%"
          y="10%"
          style={{
            fontFamily: 'Roboto',
            fontSize: 17,
            fontWeight: 700,
            fill: '#282D30',
          }}
          width={200}
          textAnchor="middle"
        >Score</text>
                <Pie
                    label={false}
                    legendType={"none"}
                    data={chartData}
                    dataKey={"value"}
                    cx="50%"
                    cy="50%"
                    startAngle={90}
                    endAngle={endAngle}
                    innerRadius={60}
                    outerRadius={70}
                    cornerRadius={7}
                    paddingAngle={0}
                    fill="#FF0000"
                    labelLine={false}
                >
                    {
                        chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))
                    }
                    
                            
                </Pie>
                <text
          x="50%"
          y="45%"
          style={{
            fontFamily: 'Roboto',
            fontSize: 21,
            fontWeight: 900,
            fill: '#282D30',
          }}
          width={200}
          textAnchor="middle"
        >
          {(userScore * 100).toString()}%
        </text>
        <text
          x="50%"
          y="55%"
          style={{ fontSize: 16, fontWeight: 500, fill: '#74798C' }}
          width={200}
          textAnchor="middle"
        >
          de votre
        </text>
        <text
          x="50%"
          y="65%"
          style={{ fontSize: 16, fontWeight: 500, fill: '#74798C' }}
          width={200}
          textAnchor="middle"
        >
          objectif
        </text>

            </PieChart>
        </ResponsiveContainer>

        
    );
}

export default PieCharts;
