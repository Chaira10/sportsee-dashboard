import React, { useEffect, useState } from 'react';
import { getUsers } from '../ServiceApi'; // Importez la fonction du service

function UserList() {
  const [standardizedUsers, setStandardizedUsers] = useState([]);

  useEffect(() => {
    // Appelez la fonction du service pour récupérer les données
    getUsers()
      .then((data) => {
        // Utilisez les données standardisées dans le state du composant
        setStandardizedUsers(data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des utilisateurs : ', error);
      });
  }, []);

  return (
    <div>
      <h1>Liste des Utilisateurs (Données Standardisées)</h1>
      <ul>
        {standardizedUsers.map((user) => (
          <li key={user.id}>
            <strong>Nom :</strong> {user.firstName} {user.lastName}<br />
            <strong>Âge :</strong> {user.age}<br />
            <strong>Score du jour :</strong> {user.todayScore}<br />
            <strong>Données clés :</strong>
            <ul>
              <li>Calories : {user.keyData.calorieCount}</li>
              <li>Protéines : {user.keyData.proteinCount}</li>
              <li>Glucides : {user.keyData.carbohydrateCount}</li>
              <li>Lipides : {user.keyData.lipidCount}</li>
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
