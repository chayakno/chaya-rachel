// httpService.js
import axios from 'axios';



const httpService = {
    get: async (url) => {
        return axios.get(url);
    },
    post: async (url, data) => {
        return axios.post(url, data);
    },
    put: async (url, data) => {
        return axios.put(url, data);
    },
    delete: async (url) => {
        return axios.delete(url);
    }
};

export default httpService;
