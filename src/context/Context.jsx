import React, { createContext, useContext, useState, useEffect } from 'react';
import { getUsers, getDailyActivity, getAverages,getPerformanceData } from '../services/api';

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
    const [userData, setUserData] = useState(null);
    const [activityData, setActivityData] = useState(null);
    const [averagesData, setAveragesData] = useState(null);
    const [performanceData, setPerformanceData] = useState(null);


    useEffect(() => {
      const userId = 12; 
      const fetchData = async () => {
        try {
          let userResponse, activityResponse, averagesResponse, performanceResponse;
    
          // Appel à getUsers
          userResponse = await getUsers(userId);
          if (userResponse) {

            setUserData(userResponse);
          } else {
            console.error("Erreur lors de la récupération des données de l'utilisateur");
          }
    
          // Appel à getDailyActivity
          activityResponse = await getDailyActivity(userId);
          if (activityResponse) {

            setActivityData(activityResponse);
          } else {
            console.error("Erreur lors de la récupération des données d'activité quotidienne");
          }
    
          // Appel à getAverages
          averagesResponse = await getAverages(userId);
          if (averagesResponse) {

            setAveragesData(averagesResponse);
          } else {
            console.error("Erreur lors de la récupération des données d'activité moyenne");
          }

          performanceResponse = await getPerformanceData(userId);
          if (performanceResponse) {

            setPerformanceData(performanceResponse);
          } else {
            console.error("Erreur lors de la récupération des données d'activité moyenne");
          }
    
          
          
        } catch (error) {
          console.error("Une erreur s'est produite lors de la récupération des données de l'utilisateur:", error);
        }
      };
    
      fetchData(); 
    }, []);
    
  
    return (
      <UserContext.Provider value={{userData: userData , activityData: activityData, averagesData: averagesData, performanceData: performanceData}}>
        {children}
      </UserContext.Provider>
    );
  }