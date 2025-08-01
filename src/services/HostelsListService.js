// services/HostelsListService.js
import axios from 'axios';

const BASE_URL = 'https://7748785f4976.ngrok-free.app';
const HEADERS = { 'ngrok-skip-browser-warning': 'true' };

export const fetchCities = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/cities`, { headers: HEADERS });
        return response.data?.data || [];
    } catch (error) {
        console.error('Error fetching cities:', error);
        throw error;
    }
};

export const fetchAreas = async (city) => {
    try {
        const response = await axios.get(`${BASE_URL}/areas?city=${encodeURIComponent(city)}`, {
            headers: HEADERS
        });
        return response.data?.data || [];
    } catch (error) {
        console.error('Error fetching areas:', error);
        throw error;
    }
};

export const fetchHostels = async (city, area) => {
    try {
        const response = await axios.get(
            `${BASE_URL}/hostels?city=${encodeURIComponent(city)}&area=${encodeURIComponent(area)}`,
            { headers: HEADERS }
        );
        return response.data?.data || [];
    } catch (error) {
        console.error('Error fetching hostels:', error);
        throw error;
    }
};
