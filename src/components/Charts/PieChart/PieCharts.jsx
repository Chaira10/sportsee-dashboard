import React, { useState, useEffect } from "react";
import { PieChart, Pie, ResponsiveContainer, Cell } from "recharts";
import { useUser } from "../../../context/Context";

// Tableau des couleurs pour les segments du graphique
const COLORS = ["red", "#FBFBFB "];

function PieCharts({ userId }) {
  // Récupération des données utilisateur et gestion des erreurs
  const { userData, error } = useUser();
  console.log(userData);
  // État pour gérer la taille du cercle en fonction de la largeur de l'écran
  const [circleRadius, setCircleRadius] = useState("29%");
  // Effet pour mettre à jour la taille du cercle en fonction de la largeur de l'écran
  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      // Ajustement de la taille du cercle en fonction de la largeur de l'écran
      if (screenWidth <= 1400) {
        setCircleRadius("29%");
      } else if (screenWidth <= 1700) {
        setCircleRadius("25%");
      } else if (screenWidth <= 1900) {
        setCircleRadius("21%");
      } else {
        // Si la largeur de l'écran est supérieure à 1900 pixels, on utilise également '21%'
        setCircleRadius("21%");
      }
    };
    // Écouteur d'événements de redimensionnement de la fenêtre
    window.addEventListener("resize", handleResize);
    handleResize(); // Appeler la fonction au chargement pour définir la taille initiale
    // Désabonnement de l'écouteur d'événements lors du démontage du composant
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  // Gestion des erreurs
  if (error) {
    // Si une erreur est présente, afficher un message d'erreur
    return <div>Erreur: {error.message}</div>;
  } else if (!userData) {
    // Si les données utilisateur ne sont pas encore disponibles, afficher un message de chargement
    return <div>Chargement en cours...</div>;
  }

  // Calcul du score utilisateur et formatage des données pour le graphique
  // Extraction du score utilisateur à partir des données utilisateur
  const userScore = userData.todayScore;
  // Création d'un ensemble de données pour le graphique en secteurs (camembert)
  const chartData = [
    { name: "Score", value: userScore * 100 },
    { name: "Reste", value: 100 - userScore * 100 },
  ];
  // Calcul de l'angle de fin en fonction du score utilisateur
  const endAngle = 90 + userScore * 730;

  return (
    // Conteneur réactif pour le graphique en secteurs (camembert)
    <ResponsiveContainer width="100%" height="100%">
      {/* Graphique en secteurs (camembert) */}
      <PieChart>
        {/* Cercle central pour un effet de trou */}
        <circle cx="50%" cy="50%" fill="white" r={circleRadius}></circle>
        {/* Texte au-dessus du graphique pour indiquer le type de données */}
        <text
          // Position horizontale du texte, 15% de la largeur du conteneur SVG
          x="15%"
          // Position verticale du texte, 10% de la hauteur du conteneur SVG
          y="10%"
          // Styles du texte
          style={{
            fontFamily: "Roboto",
            fontSize: 17,
            fontWeight: 700,
            // Couleur de remplissage du texte
            fill: "#282D30",
          }}
          width={200}
          // Ancrage horizontal du texte, "middle" le centre horizontalement
          textAnchor="middle"
        >
          Score
        </text>
        {/* Série en secteurs du graphique (camembert) */}
        <Pie
          // Désactivation des étiquettes pour chaque segment du camembert
          label={false}
          // Désactivation de la légende
          legendType={"none"}
          // Données utilisées pour le graphique en secteurs
          data={chartData}
          // Clé utilisée pour extraire les valeurs des données
          dataKey={"value"}
          // Centre horizontal du graphique, 50% de la largeur du conteneur SVG
          cx="50%"
          // Centre vertical du graphique, 50% de la hauteur du conteneur SVG
          cy="50%"
          // Angle de départ du premier segment, 90 degrés correspond au haut
          startAngle={90}
          // Angle de fin du dernier segment, déterminé dynamiquement par la variable endAngle
          endAngle={endAngle}
          // Rayon intérieur du graphique en secteurs
          innerRadius={60}
          // Rayon extérieur du graphique en secteurs
          outerRadius={70}
          // Rayon de coin pour les coins arrondis des segments
          cornerRadius={7}
          // Angle de rembourrage entre les segments
          paddingAngle={0}
          // Couleur de remplissage des segments du camembert
          fill="#FF0000"
          // Désactivation des lignes d'étiquettes à l'extérieur du camembert
          labelLine={false}
        >
          {/* Création des segments du graphique avec des couleurs différentes */}
          {
            // Mapping sur chaque entrée de chartData pour générer des cellules (segments) dans le graphique
            chartData.map((entry, index) => (
              // Chaque cellule est identifiée par une clé unique
              <Cell
                key={`cell-${index}`}
                // La couleur de remplissage de la cellule est déterminée par l'index dans le tableau COLORS
                fill={COLORS[index % COLORS.length]}
              />
            ))
          }
        </Pie>
        {/* Label au centre du graphique */}
        <text
          x="50%"
          y="45%"
          style={{
            fontFamily: "Roboto",
            fontSize: 21,
            fontWeight: 900,
            fill: "#282D30",
          }}
          width={200}
          textAnchor="middle"
        >
          {(userScore * 100).toString()}%
        </text>
        <text
          x="50%"
          y="55%"
          style={{ fontSize: 16, fontWeight: 500, fill: "#74798C" }}
          width={200}
          textAnchor="middle"
        >
          de votre
        </text>
        <text
          x="50%"
          y="65%"
          style={{ fontSize: 16, fontWeight: 500, fill: "#74798C" }}
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
