import axios from "axios";

const API_BASE_URL = "http://localhost:3002";
// Effectuez une requête GET vers l'URL locale pour récupérer les utilisateurs

export async function getUsers(userId) {
    try {
      const response = await axios.get(`${API_BASE_URL}/users`);
      const usersData = response.data;
  
      // Recherchez l'utilisateur avec l'ID spécifié
      const user = usersData.find((user) => user.id === userId);
  
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
      const response = await axios.get(`${API_BASE_URL}/activities`);
      const activitiesData = response.data;
      
      // Recherchez l'utilisateur avec l'ID spécifié
      const userActivities = activitiesData.find((userActivity) => userActivity.userId === userId);
  
      if (userActivities) {
        return userActivities.sessions;
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
    const response = await axios.get(`${API_BASE_URL}/averages`);
    const averagesData = response.data;

    // Recherchez l'utilisateur avec l'ID spécifié
    const userAverages = averagesData.find(
      (userAverage) => userAverage.userId === userId
    );

    if (userAverages) {
      return userAverages.sessions;
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
    const response = await axios.get(`${API_BASE_URL}/performance`);
    const performanceData = response.data;
    
    // Recherchez les données de performance pour l'utilisateur avec l'ID spécifié
    const userPerformance = performanceData.find((performance) => performance.userId === userId);

    if (userPerformance) {
      const userPerformanceData = userPerformance.data.map((entry) => {
        // Remplacez le numéro par le libellé correspondant à partir de kind
        const label = userPerformance.kind[entry.kind.toString()] || '';
        return { ...entry, kind: label };
      });
    // const customLabelOrder = ["Intensité", "Vitesse", "Force", "Endurance", "Énergie", "Cardio"];
    const customLabelOrder = ["intensity","speed","strength","endurance", "energy","cardio"];
    const sortedUserPerformanceData = userPerformanceData.sort((a, b) => {
      const labelA = customLabelOrder.indexOf(a.kind);
      const labelB = customLabelOrder.indexOf(b.kind);
      return labelA - labelB;
    });

    return sortedUserPerformanceData;
    } else {
      // Si les données de performance pour l'utilisateur ne sont pas trouvées, renvoyez une erreur ou une valeur par défaut
      throw new Error('Données de performance non trouvées pour cet utilisateur');
    }
  } catch (error) {
    throw error;
  }
}






