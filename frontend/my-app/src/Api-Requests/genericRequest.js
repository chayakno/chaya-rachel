import httpService from "./httpService";

export const getItemById = (route, id) => {
    return httpService.get(`http://localhost:5000/${route}/${id}`);
};

export const getAllItems = (route) => {
    return httpService.get(`http://localhost:5000/${route}`);
};


export const deleteItem = (route, id) => {
    return httpService.delete(`http://localhost:5000/${route}/${id}`);
};

export const addItem = (route, item) => {
    return httpService.post(`http://localhost:5000/${route}`, item);
};

export const updateItem = (route, id, item) => {
    return httpService.put(`http://localhost:5000/${route}/${id}`, item);
};
