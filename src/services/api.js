import axios from 'axios';



// Fonction asynchrone pour récupérer les données d'un utilisateur par son ID
export async function getUsers(userId) {
    try {
      // Appel à l'API pour obtenir les données utilisateur
        const response = await axios.get(`http://localhost:3000/user/${userId}/`);
        const usersData = response.data;
        // Affichage des données brutes de l'API
        console.log(usersData);
        // Extraction des données utilisateur spécifiques
        const user = response.data.data;
        // Affichage des données utilisateur extraites
        console.log(user);
        // Vérification de la présence des données utilisateur
        if (user) {
          // Création d'un objet utilisateur normalisé avec les données nécessaires
          const standardizedUser = {
            id: user.id,
            firstName: user.userInfos.firstName,
            lastName: user.userInfos.lastName,
            age: user.userInfos.age,
            // todayScore s'il est défini, sinon score 
            todayScore: user.todayScore !== undefined ? user.todayScore : user.score,
            // Données clés de l'utilisateur liées à la nutrition
            keyData: {
              calorieCount: user.keyData.calorieCount,
              proteinCount: user.keyData.proteinCount,
              carbohydrateCount: user.keyData.carbohydrateCount,
              lipidCount: user.keyData.lipidCount,
            },
          };
          // Affichage de l'utilisateur normalisé
          console.log(standardizedUser);
          // Renvoi des données normalisées
          return standardizedUser;
        } else {
          // L'utilisateur n'a pas été trouvé, déclenchement d'une erreur
          throw new Error('Utilisateur non trouvé');
        }
      } catch (error) {
        // Gestion des erreurs et renvoi de l'erreur
        throw error;
      }
    }

    export async function getDailyActivity(userId) {
        try {
          const response = await axios.get(`http://localhost:3000/user/${userId}/activity`);
          const activitiesData = response.data;
          const activity = response.data.data;
            console.log(activitiesData,activity);
            const session = activity.sessions;
            console.log(session);

          if (activitiesData) {
            return session;
          } else {
            // Si les données de l'utilisateur ne sont pas trouvées, renvoyez une erreur ou une valeur par défaut
            throw new Error('Données d\'activité non trouvées pour cet utilisateur');
          }
        } catch (error) {
          throw error;
        }
      }
      



  export async function getAverages(userId) {
    try {
      const response = await axios.get(`http://localhost:3000/user/${userId}/average-sessions`);
      const averagesData = response.data;
  
      const session = averagesData.data;
      console.log(session);
      if (session) {
        return session.sessions ;
      } else {
        // Si les données de l'utilisateur ne sont pas trouvées, renvoyez une erreur ou une valeur par défaut
        throw new Error("Données d'activité moyenne non trouvées pour cet utilisateur");
      }
    } catch (error) {
      throw error;
    }
  }


  export async function getPerformanceData(userId) {
    try {
      const response = await axios.get(`http://localhost:3000/user/${userId}/performance`);
      const performanceData = response.data;
      const performance = performanceData.data;
      if (performance) {
        const userPerformanceData = performance.data.map((entry) => {
          // Remplacez le numéro par le libellé correspondant à partir de kind
          const label = performance.kind[entry.kind.toString()] || '';
          return { ...entry, kind: label };
        });
      const orderedPerformanceData = userPerformanceData.sort((a, b) => {
        const order = ['intensity', 'speed', 'strength', 'endurance', 'energy', 'cardio'];
        return order.indexOf(a.kind) - order.indexOf(b.kind);
      });
      return orderedPerformanceData;
      } else {
        // Si les données de performance pour l'utilisateur ne sont pas trouvées, renvoyez une erreur ou une valeur par défaut
        throw new Error('Données de performance non trouvées pour cet utilisateur');
      }
    } catch (error) {
      throw error;
    }
  }

