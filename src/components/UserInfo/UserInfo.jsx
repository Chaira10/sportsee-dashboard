import React from 'react';
import { useUser } from '../../context/Context';
import './UserInfo.css';

function UserInfo({ userId }) {
  const {userData,error} = useUser();
  console.log(userData);

  if (error) {
    return <div>Erreur: {error.message}</div>; 
  } else if (!userData) {
    return <div>Chargement en cours...</div>;
  }

  return (
    <div className="text-container">
      <span className="text-1">Bonjour <p className="text-name">{userData.firstName}</p></span>
      <p className="text-2">Félicitations ! Vous avez explosé vos objectifs hier 👏</p>
    </div>
  );
}

export default UserInfo;
