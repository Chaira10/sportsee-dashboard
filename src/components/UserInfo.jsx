import React, { useEffect, useState } from 'react';
import { getUsers } from '../ServiceApi'; 
import './UserInfo.css';

function UserInfo({ userId }) {
    const [userData, setUserData] = useState(null);
    useEffect(() => {
        getUsers(userId)
          .then((user) => { // Utilisez "user" au lieu de "response.data"
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
    <div className="text-container">
      <span className="text-1">Bonjour <p className="text-name">{userData.firstName}</p></span>
      <p className="text-2">Félicitations ! Vous avez explosé vos objectifs hier 👏</p>
    </div>
  )
}

export default UserInfo;