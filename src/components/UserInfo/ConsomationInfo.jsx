import React, { useEffect, useState } from 'react';
import { getUsers } from '../../ServiceApi'; 
import { useUser } from '../../context/Context';

function ConsomationInfo({ userId }) {
  const {userData,error} = useUser();


    if (error) {
      return <div>Erreur: {error.message}</div>; 
    } else if (!userData) {
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