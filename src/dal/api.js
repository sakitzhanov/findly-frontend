import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8080"
});

const resourceApi = (path) => {
    return {
        search: async function() {
            const res = await instance.get(`/api/${path}`);
            return res;
        },
        get: async function (id) {
            const res = await instance.get(`/api/${path}/${id}`);
            return res;
        },
        create: async function(data) {
            const res = await instance.post(`/api/${path}`, data);
            return res;
        },
        update: async function(data) {
            const res = await instance.put(`/api/${path}`, data);
            return res;
        },
        delete: async function(id) {
            const res = await instance.delete(`/api/${path}/${id}`);
            return res;
        }
    }
}

export const languagesApi = resourceApi("languages");
export const regionsApi = resourceApi("regions");
export const citiesApi = resourceApi("cities");