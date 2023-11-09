import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { useUser } from '../../../context/Context';


function RadarsChart({ userId }) {
  const {performanceData, error} = useUser();
  console.log(performanceData);
  if (error) {
    return <div>Erreur: {error.message}</div>; 
  } else if (!performanceData) {
    return <div>Chargement en cours...</div>;
  }

  
  const kinds = {
    intensity: 'Intensité',
    cardio: 'Cardio',
    energy: 'Energie',
    endurance: 'Endurance',
    strength: 'Force',
    speed: 'Vitesse',
  };

  const translatedData = performanceData.map((item) => {
    return {
        value: item.value,
        kind: kinds[item.kind],
    };
});


    return (
        <ResponsiveContainer width="100%" height="100%" >
        <RadarChart data={translatedData} cx="50%" cy="50%"  outerRadius={'65%'} fill="#FFFFFF">
          <PolarRadiusAxis axisLine={false} tick={false} />
          <PolarAngleAxis orient="inner" dataKey="kind" tickLine={false} stroke="#FFFFFF" tick={{ fontSize: 12 }}/>

          <PolarRadiusAxis axisLine={false} tick={false} />
          <PolarGrid radialLines={false} stroke="white" strokeWidth={1} />

          <Radar name="Performance" dataKey="value" stroke="#FF0101" fill="#FF0101" fillOpacity={0.6} />
        </RadarChart>
      </ResponsiveContainer>
    );
  }

export default RadarsChart