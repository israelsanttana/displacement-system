

import axios, { AxiosResponse, AxiosError } from 'axios';


const baseURL = 'https://api-deslocamento.herokuapp.com/api';

// Função auxiliar para tratamento de erros
const handleError = (error: AxiosError) => {
    console.error('Ocorreu um erro na requisição:', error);
    throw error;
};


export const getReqClient = async (endpoint: string) => {
    try {
        const response: AxiosResponse = await axios.get(`${baseURL}/${endpoint}`);
        return response.data;
    } catch (error) {
        handleError;
    }
};


export const postReqClient = async (endpoint: string, dados: any) => {
    try {
        const response: AxiosResponse = await axios.post(`${baseURL}/${endpoint}`, dados, {
            headers: {
                'accept': 'text/plain',
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        handleError;
    }
};


export const putReqClient = async (endpoint: string, dados: any) => {
    try {
        const response: AxiosResponse = await axios.put(`${baseURL}/${endpoint}`, dados);
        return response.data;
    } catch (error) {
        handleError;
    }
};


export const deleteReqClient = async (endpoint: string) => {
    try {
        const response: AxiosResponse = await axios.delete(`${baseURL}/${endpoint}`);
        return response.data;
    } catch (error) {
        handleError;
    }
};
