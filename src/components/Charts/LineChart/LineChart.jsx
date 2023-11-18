import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Rectangle,
} from "recharts";
import { useUser } from "../../../context/Context";
import "./LineChart.css";

// Fonction de composant LineCharts prenant userId comme propriété.
function LineCharts({ userId }) {
  // Utilisation du hook useUser pour obtenir averagesData et error depuis le contexte.
  const { averagesData, error } = useUser();
  console.log(averagesData);

  // Gestion des erreurs et des états de chargement.
  if (error) {
    // Si une erreur est présente, affiche un message d'erreur.
    return <div>Erreur: {error.message}</div>;
  } else if (!averagesData) {
    // Si averagesData n'est pas encore disponible, affiche un message de chargement.
    return <div>Chargement en cours...</div>;
  }
  // Liste des jours de la semaine.
  const daysOfWeek = ["L", "M", "M", "J", "V", "S", "D"];

  // Formatage des données pour les rendre compatibles.
  const formattedData = averagesData.map((session, index) => ({
    // Pour chaque élément dans averagesData, crée un nouvel objet avec les propriétés suivantes :
    // La propriété 'name' est définie comme le jour de la semaine correspondant.
    name: daysOfWeek[index],
    // La propriété 'sessionLength' est définie comme la longueur de session du jour.
    sessionLength: session.sessionLength,
  }));
  // Définition d'une fonction de composant CustomCursor.
  function CustomCursor(props) {
    // Destructuration des propriétés 'points' et 'width' depuis les props.
    const { points, width } = props;
    // Destructuration des coordonnées 'x' et 'y' depuis le premier point dans 'points'.
    const { x, y } = points[0];
    // Retourne un composant Rectangle (un rectangle représentant un curseur personnalisé).
    return (
      <Rectangle
        fill="#000" // Couleur de remplissage du rectangle.
        stroke="#000" // Couleur de la bordure du rectangle.
        x={x} // Position horizontale du coin supérieur gauche du rectangle.
        y={y} // Position verticale du coin supérieur gauche du rectangle.
        width={width} // Largeur du rectangle.
        height={230} // Hauteur du rectangle.
        className="custom-cursor" // Classe CSS pour le style du curseur personnalisé.
      />
    );
  }

  return (
    <div className="session-lineChart">
      <h3 className="text-start">Durée moyenne des sessions</h3>
      {/* Conteneur réactif pour le graphique en ligne */}
      <ResponsiveContainer width="100%" height="100%" className="areaContainer">
        {/* Composant de graphique en ligne */}
        <LineChart
          // Données formatées à afficher
          data={formattedData}
          margin={{ top: 0, right: 0, left: 3, bottom: 5 }}
          padding={{ top: 0, right: 5, left: 5, bottom: 10 }}
        >
          {/* Désactive la grille cartésienne sur le graphique */}
          <CartesianGrid vertical={false} horizontal={false} />
          {/* Axe horizontal avec des propriétés de style et d'affichage spécifiques */}
          <XAxis
            className="xArea"
            dataKey="name"
            tickLine={false}
            axisLine={false}
            style={{ fill: "#fff", opacity: ".5", fontSize: "12px" }}
          />
          {/* Axe vertical avec des propriétés de style et d'affichage spécifiques */}
          <YAxis
            dataKey="sessionLength"
            domain={["dataMin - 10", "dataMax + 50"]}
            width={0}
            orientation="right"
          />
          {/* Tooltip configuré avec des styles spécifiques et un curseur personnalisé */}
          <Tooltip
            // Décalage du tooltip par rapport au point de données
            offset={10}
            // Style du contenu du tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "none",
              textAlign: "center",
            }}
            // Style du conteneur du tooltip
            wrapperStyle={{
              outline: "none",
            }}
            // Style des éléments du tooltip (par exemple, ligne de données)
            itemStyle={{
              fontSize: "12px",
              fontWeight: "500",
              color: "#000",
              lineHeight: "0",
              opacity: 0.5,
            }}
            // Fonction de formatage de l'étiquette du tooltip (vide dans ce cas)
            labelFormatter={() => ""}
            // Séparateur entre l'étiquette et la valeur dans le tooltip
            separator=""
            // Fonction de formatage de la valeur dans le tooltip
            formatter={(value) => ["", value]}
            // Curseur personnalisé pour le tooltip
            cursor={<CustomCursor />}
          />

          {/* Déclaration d'un dégradé linéaire utilisé plus tard dans le graphique */}
          <defs>
            {/* Définition d'un dégradé linéaire avec l'identifiant 'linear' */}
            <linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%">
              {/* Stop à l'offset 0% avec une couleur semi-transparente */}
              <stop offset="0%" stopColor="rgba(255,255,255,30%)" />
              {/* Stop à l'offset 100% avec une couleur opaque */}
              <stop offset="100%" stopColor="rgba(255,255,255,100%)" />
            </linearGradient>
          </defs>
          {/* Ligne du graphique avec des propriétés de style et d'interaction spécifiques */}
          <Line
          // Style du trait du graphique, utilisant le dégradé linéaire défini précédemment
            style={{ stroke: "url(#linear)" }}
            // Rayon des coins du trait
            radius={[10, 10, 0, 0]}
            // Type de courbe (naturelle dans ce cas)
            type="natural"
            // Propriété du jeu de données à utiliser pour les valeurs en ordonnées (Y)
            dataKey="sessionLength"
            // Couleur de remplissage sous le trait
            fill="white"
            // Unité pour la valeur affichée dans le tooltip
            unit="min"
            // Désactive l'affichage des points (dot) sur le trait
            dot={false}
            // Épaisseur du trait
            strokeWidth={2}
            // Propriétés du point actif (lorsqu'il est survolé par exemple)
            activeDot={{
              r: 3,  // Rayon du point actif
              strokeWidth: 4,  // Épaisseur du trait entourant le point actif
              stroke: "rgba(255,255,255,.2)",   // Couleur du trait entourant le point actif
              fill: "#fff", // Couleur de remplissage du point actif
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default LineCharts;
