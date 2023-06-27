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


export const deleteReqClient = async (id: number) => {
    try {
        const response: AxiosResponse = await axios.delete(`${baseURL}/v1/Cliente/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'accept': '*/*'
            },
            data: {
                id: id
            }
        });
        return response.data;
    } catch (error) {
        handleError;
    }
};

/* REQ DRIVERS*/

export const getReqDrivers = async (endpoint: string) => {
    try {
        const response: AxiosResponse = await axios.get(`${baseURL}/${endpoint}`);
        return response.data;
    } catch (error) {
        handleError;
    }
};

export const postReqDrivers = async (endpoint: string, dados: any) => {
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

export const putReqDrivers = async (endpoint: string, dados: any) => {
    try {
        const response: AxiosResponse = await axios.put(`${baseURL}/${endpoint}`, dados, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*'
            }
        });
        return response.data;
    } catch (error) {
        handleError;
    }
};


export const deleteReqDrivers = async (id: number) => {
    try {
        const response: AxiosResponse = await axios.delete(`${baseURL}/v1/Condutor/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'accept': '*/*'
            },
            data: {
                id: id
            }
        });
        return response.data;
    } catch (error) {
        handleError;
    }
};

/* REQ VEHICLES*/

export const getReqVehicles = async (endpoint: string) => {
    try {
        const response: AxiosResponse = await axios.get(`${baseURL}/${endpoint}`);
        return response.data;
    } catch (error) {
        handleError;
    }
};

export const postReqVehicles = async (endpoint: string, dados: any) => {
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

export const putReqVehicles = async (endpoint: string, dados: any) => {
    try {
        const response: AxiosResponse = await axios.put(`${baseURL}/${endpoint}`, dados, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*'
            }
        });
        return response.data;
    } catch (error) {
        handleError;
    }
};