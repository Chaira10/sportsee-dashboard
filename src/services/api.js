import axios from 'axios';



// Appel à la première route pour récupérer les informations de l'utilisateur
export async function getUsers(userId) {
    try {
        const response = await axios.get(`http://localhost:3000/user/${userId}/`);
        const usersData = response.data;
        
        console.log(usersData);
        const user = response.data.data;
        console.log(user);

        if (user) {
          // Normalisez les données pour cet utilisateur
          const standardizedUser = {
            id: user.id,
            firstName: user.userInfos.firstName,
            lastName: user.userInfos.lastName,
            age: user.userInfos.age,
            todayScore: user.todayScore !== undefined ? user.todayScore : user.score,
            keyData: {
              calorieCount: user.keyData.calorieCount,
              proteinCount: user.keyData.proteinCount,
              carbohydrateCount: user.keyData.carbohydrateCount,
              lipidCount: user.keyData.lipidCount,
            },
          };
          console.log(standardizedUser);
          return standardizedUser;
        } else {
          // Si l'utilisateur n'est pas trouvé, renvoyez une erreur ou une valeur par défaut
          throw new Error('Utilisateur non trouvé');
        }
      } catch (error) {
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

