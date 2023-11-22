import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { useUser } from '../../../context/Context';


function RadarsChart() {
   // Récupération des données de performance et gestion des erreurs
  const {performanceData, error} = useUser();
  console.log(performanceData);
  // Gestion des erreurs
  if (error) {
    return <div>Erreur: {error.message}</div>; 
  } else if (!performanceData) {
    return <div>Chargement en cours...</div>;
  }

   // Mapping des types de données de performance à la traduction
  const kinds = {
    intensity: 'Intensité',
    cardio: 'Cardio',
    energy: 'Energie',
    endurance: 'Endurance',
    strength: 'Force',
    speed: 'Vitesse',
  };
// Traduction des données de performance
  const translatedData = performanceData.map((item) => {
    return {
        value: item.value,
        kind: kinds[item.kind],
    };
});

console.log(translatedData);
    return (
      // Conteneur réactif pour le graphique radar
        <ResponsiveContainer width="100%" height="100%" >
         {/* Graphique radar */}
        <RadarChart data={translatedData} cx="50%" cy="50%"  outerRadius={'65%'} fill="#FFFFFF">
         {/* Axe radial pour les valeurs */}
          {/* Axe radial pour les catégories (types de performance) */}
          <PolarAngleAxis orient="inner" dataKey="kind" tickLine={false} stroke="#FFFFFF" tick={{ fontSize: 12 }}/>
          {/* Grille radiale pour guider la lecture des valeurs */}
          <PolarGrid radialLines={false} stroke="white" strokeWidth={1} />
          {/* Série radar représentant les données de performance */}
          <Radar name="Performance" dataKey="value" stroke="#FF0101" fill="#FF0101" fillOpacity={0.6} />
        </RadarChart>
      </ResponsiveContainer>
    );
  }

export default RadarsChart