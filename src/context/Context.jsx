import React, { createContext, useContext, useState, useEffect } from 'react';
import { getUsers, getDailyActivity, getAverages,getPerformanceData } from '../services/api';

// Création d'un contexte utilisateur
const UserContext = createContext();

// Hook personnalisé pour accéder aux données utilisateur
export function useUser() {
  return useContext(UserContext);
}
// Composant de fournisseur utilisateur qui gère les données utilisateur
export function UserProvider({ children }) {
  // Initialisation des états pour stocker les données utilisateur, d'activité quotidienne, d'activité moyenne et de performance
    const [userData, setUserData] = useState(null);
    const [activityData, setActivityData] = useState(null);
    const [averagesData, setAveragesData] = useState(null);
    const [performanceData, setPerformanceData] = useState(null);


    useEffect(() => {
      // ID utilisateur fixe (12 dans cet exemple)
      const userId = 12; 
      // Fonction asynchrone pour récupérer les données
      const fetchData = async () => {
        try {
          let userResponse, activityResponse, averagesResponse, performanceResponse;
          // Appel asynchrone de la fonction getUsers avec l'ID utilisateur
          userResponse = await getUsers(userId);
          // Vérification si la réponse de getUsers est disponible
          if (userResponse) {
          // Mise à jour de l'état userData avec les données récupérées de l'utilisateur
            setUserData(userResponse);
          } else {
            // En cas d'erreur (réponse non disponible), affichage d'un message d'erreur dans la console
            console.error("Erreur lors de la récupération des données de l'utilisateur");
          }
          // Appel asynchrone de la fonction getDailyActivity avec l'ID utilisateur
          activityResponse = await getDailyActivity(userId);
          // Vérification si la réponse de getDailyActivity est disponible
          if (activityResponse) {
            // Mise à jour de l'état activityData avec les données d'activité quotidienne récupérées
            setActivityData(activityResponse);
          } else {
            // En cas d'erreur (réponse non disponible), affichage d'un message d'erreur dans la console
            console.error("Erreur lors de la récupération des données d'activité quotidienne");
          }
          // Appel asynchrone de la fonction getAverages avec l'ID utilisateur
          averagesResponse = await getAverages(userId);
          // Vérification si la réponse de getAverages est disponible
          if (averagesResponse) {
            // Mise à jour de l'état averagesData avec les données d'activité moyenne récupérées
            setAveragesData(averagesResponse);
          } else {
            // En cas d'erreur (réponse non disponible), affichage d'un message d'erreur dans la console
            console.error("Erreur lors de la récupération des données d'activité moyenne");
          }
          // Appel asynchrone de la fonction getPerformanceData avec l'ID utilisateur
          performanceResponse = await getPerformanceData(userId);
          // Vérification si la réponse de getPerformanceData est disponible
          if (performanceResponse) {
            // Mise à jour de l'état performanceData avec les données de performance récupérées
            setPerformanceData(performanceResponse);
          } else {
            // En cas d'erreur (réponse non disponible), affichage d'un message d'erreur dans la console
            console.error("Erreur lors de la récupération des données d'activité moyenne");
          }
        } catch (error) {
          // En cas d'erreur lors de l'exécution du bloc try, cette partie est exécutée
           // Affichage d'un message d'erreur détaillé dans la console
          console.error("Une erreur s'est produite lors de la récupération des données de l'utilisateur:", error);
        }
      };
    // Appel de la fonction fetchData au montage du composant (une seule fois grâce au tableau de dépendances vide [])
      fetchData(); 
    }, []); // Le tableau vide indique que cette fonction d'effet n'a pas de dépendances, elle ne s'exécute qu'une seule fois après le montage du composant
    
  // Rendu du contexte avec les données utilisateur pour que les composants enfants puissent y accéder
  // Retourne le contexte utilisateur avec les données d'utilisateur, d'activité, d'activité moyenne et de performance
    return (
      <UserContext.Provider value={{userData: userData , activityData: activityData, averagesData: averagesData, performanceData: performanceData}}>
        {children}
      </UserContext.Provider>
    );
  }