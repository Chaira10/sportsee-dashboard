import React from 'react';
import { useUser } from '../../context/Context';


function UserList() {
  const { userData } = useUser();


  

  return (
    <div>
      <h1>Liste des Utilisateurs (Données Standardisées)</h1>
      <ul>
        {userData.map((user) => (
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
