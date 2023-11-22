import axios from "axios";

const API_BASE_URL_MOCK = "http://localhost:3002";
const API_BASE_URL = "http://localhost:3000";

// Fonction asynchrone pour récupérer les données d'un utilisateur par son ID
export async function getUsers(userId, mock) {
  try {
    // Définir l'URL en fonction du mode mock ou non
    const apiUrl = mock
      ? `${API_BASE_URL_MOCK}/users`
      : `${API_BASE_URL}/user/${userId}/`;
    if (mock) {
      const response = await axios.get(apiUrl);
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
          todayScore:
            user.todayScore !== undefined ? user.todayScore : user.score,
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
        throw new Error("Utilisateur non trouvé");
      }
    } else {
      // Appel à l'API pour obtenir les données utilisateur
      const response = await axios.get(apiUrl);
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
          todayScore:
            user.todayScore !== undefined ? user.todayScore : user.score,
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
        throw new Error("Utilisateur non trouvé");
      }
    }
  } catch (error) {
    // Gestion des erreurs et renvoi de l'erreur
    throw error;
  }
}

export async function getDailyActivity(userId, mock) {
  try {
    // Définir l'URL en fonction du mode mock ou non
    const apiUrl = mock
      ? `${API_BASE_URL_MOCK}/user/${userId}/activity`
      : `${API_BASE_URL}/user/${userId}/activity`;
    if (mock) {
      const response = await axios.get(apiUrl);
      const activitiesData = response.data;

      // Recherchez l'utilisateur avec l'ID spécifié
      const userActivities = activitiesData.find(
        (userActivity) => userActivity.userId === userId
      );

      if (userActivities) {
        return userActivities.sessions;
      } else {
        // Si les données de l'utilisateur ne sont pas trouvées, renvoyez une erreur ou une valeur par défaut
        throw new Error("Données d'activité non trouvées pour cet utilisateur");
      }
    } else {
      const response = await axios.get(apiUrl);
      const activitiesData = response.data;
      const activity = response.data.data;
      console.log(activitiesData, activity);
      const session = activity.sessions;
      console.log(session);

      if (activitiesData) {
        return session;
      } else {
        // Si les données de l'utilisateur ne sont pas trouvées, renvoyez une erreur ou une valeur par défaut
        throw new Error("Données d'activité non trouvées pour cet utilisateur");
      }
    }
  } catch (error) {
    throw error;
  }
}

export async function getAverages(userId, mock) {
  try {
    // Définir l'URL en fonction du mode mock ou non
    const apiUrl = mock
      ? `${API_BASE_URL_MOCK}/user/${userId}/average-sessions`
      : `${API_BASE_URL}/user/${userId}/average-sessions`;

      if (mock) {
        const response = await axios.get(apiUrl);
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


      } else {
    const response = await axios.get(apiUrl);
    const averagesData = response.data;

    const session = averagesData.data;
    console.log(session);
    if (session) {
      return session.sessions;
    } else {
      // Si les données de l'utilisateur ne sont pas trouvées, renvoyez une erreur ou une valeur par défaut
      throw new Error(
        "Données d'activité moyenne non trouvées pour cet utilisateur"
      );
    }
  }
  } catch (error) {
    throw error;
  }
}

export async function getPerformanceData(userId, mock) {
  try {
    // Définir l'URL en fonction du mode mock ou non
    const apiUrl = mock
      ? `${API_BASE_URL_MOCK}/user/${userId}/performance`
      : `${API_BASE_URL}/user/${userId}/performance`;
      if (mock) {
        const response = await axios.get(apiUrl);
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
      } else {

    const response = await axios.get(apiUrl);
    const performanceData = response.data;
    const performance = performanceData.data;
    if (performance) {
      const userPerformanceData = performance.data.map((entry) => {
        // Remplacez le numéro par le libellé correspondant à partir de kind
        const label = performance.kind[entry.kind.toString()] || "";
        return { ...entry, kind: label };
      });
      const orderedPerformanceData = userPerformanceData.sort((a, b) => {
        const order = [
          "intensity",
          "speed",
          "strength",
          "endurance",
          "energy",
          "cardio",
        ];
        return order.indexOf(a.kind) - order.indexOf(b.kind);
      });
      return orderedPerformanceData;
    } else {
      // Si les données de performance pour l'utilisateur ne sont pas trouvées, renvoyez une erreur ou une valeur par défaut
      throw new Error(
        "Données de performance non trouvées pour cet utilisateur"
      );
    }
  }
  } catch (error) {
    throw error;
  }
}
