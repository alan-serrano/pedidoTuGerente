import axios from 'axios';

export async function getClients() {
    try {
        const response = await axios.get(`${process.env.PUBLIC_URL}/clients.json`);
        return response.data;

    } catch (error){
        throw error;
    }
}

export async function getProducts() {
    try {
        const response = await axios.get(`${process.env.PUBLIC_URL}/products.json`);
        return response.data;

    } catch (error){
        throw error;
    }
}

export async function getWarehouses() {
    try {
        const response = await axios.get(`${process.env.PUBLIC_URL}/warehouses.json`);
        return response.data;

    } catch (error){
        throw error;
    }
}