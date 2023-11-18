import React, { useEffect, useState } from 'react';
import { getUsers } from '../../ServiceApi'; 
import { useUser } from '../../context/Context';

// Fonction de composant ConsomationInfo prenant userId comme propriété.
function ConsomationInfo({ userId }) {
  // Utilisation du hook useUser pour obtenir userData et error depuis le contexte.
  const {userData,error} = useUser();

  // Gestion des erreurs et des états de chargement.
    if (error) {
      // Si une erreur est présente, affiche un message d'erreur.
      return <div>Erreur: {error.message}</div>; 
    } else if (!userData) {
      // Si userData n'est pas encore disponible, affiche un message de chargement.
      return <div>Chargement en cours...</div>;
    }
   // Rendu du composant.
    return (
      <div>
        <div>
         {/* Vérifie si userData.keyData existe avant de mapper sur ses entrées */}
          {userData.keyData && Object.entries(userData.keyData).map(([key, value]) => (
             // Pour chaque paire clé-valeur, affiche un paragraphe avec la clé et la valeur
            <p key={key}>
              {key}: {value}
            </p>
          ))}
        </div>
      </div>
    );
  }

export default ConsomationInfo