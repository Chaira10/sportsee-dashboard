import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './BarChart.css';
import { useUser } from '../../../context/Context';


function customizeName(name) {
   // Si le nom est 'Poids (kg)', renvoie 'kg'.
  if (name === 'Poids (kg)') {
    return 'kg';
      // Sinon, si le nom est 'Calories brûlées (kCal)', renvoie 'kCal'.
  } else if (name === 'Calories brûlées (kCal)') {
    return 'kCal';
    // Sinon, renvoie le nom tel quel.
  } else {
    return name;
  }
}
// Fonction de composant BarCharts prenant userId comme propriété.
function BarCharts({ userId }) {
  // Utilisation du hook useUser pour obtenir activityData et error depuis le contexte.
  const { activityData,error } = useUser();
  console.log(activityData);
  // Gestion des erreurs et des états de chargement.
  if (error) {
    // Si une erreur est présente, affiche un message d'erreur.
    return <div>Erreur: {error.message}</div>; 
  } else if (!activityData) {
     // Si activityData n'est pas encore disponible, affiche un message de chargement.
    return <div>Chargement en cours...</div>;
  }
   // Ajout d'un numéro de jour à chaque entrée dans le tableau activityData.
  const dataWithDayNumbers = activityData.map((entry, index) => ({
    ...entry,
    dayNumber: index + 1, 
  }));
  // Retourne le JSX du composant BarCharts.
  return (
    <div>
    {/* Conteneur ResponsiveContainer pour rendre le graphique réactif */}
      <ResponsiveContainer width="100%" height={300}>
      {/* BarChart composant de Recharts avec données et paramètres de style */}
        <BarChart data={dataWithDayNumbers} margin={{top: 5,right: 5,left: 5,bottom: 0,}} barSize={10} barGap={10} >
         {/* Grille cartésienne pour guider le regard sur le graphique */}
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
           {/* Axe X représentant les numéros de jour avec des paramètres de style */}
          <XAxis dataKey="dayNumber" padding={{ bottom: 20 }} tick={{stroke: 'lightgray', strokeWidth: 1}} tickLine={false}  />
          {/* Axe Y à droite sans lignes ni axe pour un aspect épuré */}
          <YAxis orientation="right" tickLine={false} axisLine={false}  />
          {/* Tooltip personnalisé */}
          <Tooltip
          // Le contenu du Tooltip dépend du payload (données du graphique au point survolé)
            content={({ payload }) => {
              // Vérifie si le payload existe et a une longueur supérieure à 0
              if (payload && payload.length > 0) {
                // Retourne un div contenant des paragraphes pour chaque entrée dans le payload
                return (
                  <div>
                  {/* Mapping sur les entrées du payload pour afficher dans le tooltip */}
                    {payload.map((entry, index) => (
                      // Chaque paragraphe a une clé unique et une classe de style basée sur l'index
                      <p key={index} style={{ color: entry.color }} className={`tool${index}`}>
                       {/* Affiche la valeur personnalisée du nom et de la valeur de l'entrée */}
                        {`${customizeName(entry.value)} ${customizeName(entry.name)}`}
                      </p>
                    ))}
                  </div>
                );
              }
              // Si le payload est vide, retourne null (pas de tooltip)
              return null;
            }}
            // Le formatter spécifie comment formater le contenu du tooltip (ici, simplement la valeur)
            formatter={(value, name) => {
              return `${value}`;
            }}
          />
          {/* Légende du graphique avec des paramètres de style */}
          <Legend verticalAlign="top" align="right" iconType="circle" height={76} />
          {/* Barres représentant les données de poids (kg) avec style personnalisé */}
          <Bar dataKey="kilogram" fill="red" name="Poids (kg)" radius={[10, 10, 0, 0]} />
          {/* Barres représentant les données de calories avec style personnalisé */}
          <Bar dataKey="calories" fill="black" name="Calories brûlées (kCal)" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BarCharts