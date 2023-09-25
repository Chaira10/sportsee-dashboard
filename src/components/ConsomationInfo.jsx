import React, { useEffect, useState } from 'react';
import { getUsers } from '../ServiceApi'; 

function ConsomationInfo({ userId }) {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
      // Utilisez la fonction getUsers pour récupérer les données de l'utilisateur spécifié
      getUsers(userId)
        .then((user) => {
          setUserData(user);
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération des données utilisateur : ', error);
        });
    }, [userId]);
  
    if (!userData) {
      return <div>Chargement en cours...</div>;
    }
  
    return (
      <div>
        <div>
          {userData.keyData && Object.entries(userData.keyData).map(([key, value]) => (
            <p key={key}>
              {key}: {value}
            </p>
          ))}
        </div>
      </div>
    );
  }

export default ConsomationInfo