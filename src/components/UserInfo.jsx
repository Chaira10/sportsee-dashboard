import React, { useEffect, useState } from 'react';
import { getUserInfo } from '../apiService';

function UserInfo({ userId }) {
    const [userData, setUserData] = useState(null);
    useEffect(() => {
        getUserInfo(userId)
          .then((response) => {
            setUserData(response.data);
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
      <span>Bonjour <p>{userData.firstName}</p></span>
      <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
    </div>
  )
}

export default UserInfo