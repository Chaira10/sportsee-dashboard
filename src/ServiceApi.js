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
  
  
  
  
  
export async function getActivity() {
  try {
    const response = await axios.get(`${API_BASE_URL}/activities`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getAverage() {
  try {
    const response = await axios.get(`${API_BASE_URL}/averages`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getPerformance() {
  try {
    const response = await axios.get(`${API_BASE_URL}/performance`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
