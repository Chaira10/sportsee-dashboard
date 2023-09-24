import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export const getUserInfo = (userId) => {
    return axios.get(`${BASE_URL}/user/${userId}`);
};

export const getUserActivity = (userId) => {
    return axios.get(`${BASE_URL}/user/${userId}/activity`);
};

export const getUserAverage = (userId) => {
    return axios.get(`${BASE_URL}/user/${userId}/average-sessions`);
};

export const getUserPerformance = (userId) => {
    return axios.get(`${BASE_URL}/user/${userId}/performance`);
};