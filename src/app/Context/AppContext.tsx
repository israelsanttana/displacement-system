"use client"

import { createContext, useContext, ReactNode } from 'react'
import { getReqClient, postReqClient, putReqClient, deleteReqClient, getReqDrivers, deleteReqDrivers, postReqDrivers, putReqDrivers, getReqVehicles, postReqVehicles } from '../api/requests'

interface API {
    getAPIClient: (endpoint: string) => Promise<any>;
    postAPIClient: (endpoint: string, dados: any) => Promise<any>;
    putAPIClient: (endpoint: string, dados: any) => Promise<any>;
    deleteAPIClient: (id: number) => Promise<any>;

    getAPIDrivers: (endpoint: string) => Promise<any>;
    deleteAPIDrivers: (id: number) => Promise<any>;
    postAPIDrivers: (endpoint: string, dados: any) => Promise<any>;
    putAPIDrivers: (endpoint: string, dados: any) => Promise<any>;

    getAPIVehicles: (endpoint: string) => Promise<any>;
    postAPIVehicles: (endpoint: string, dados: any) => Promise<any>;
}

interface APIProviderProps {
    children: ReactNode;
}

const GlobalContext = createContext<API>({} as API);

export const APIProvider = ({ children }: APIProviderProps) => {

    const getAPIClient = async (endpoint: string) => {
        const data = await getReqClient(endpoint);
        return data;
    };


    const postAPIClient = async (endpoint: string, dados: any) => {
        const data = await postReqClient(endpoint, dados);
        return data;
    };


    const putAPIClient = async (endpoint: string, dados: any) => {
        const data = await putReqClient(endpoint, dados);
        return data;
    };


    const deleteAPIClient = async (id: number) => {
        const data = await deleteReqClient(id);
        return data;
    };

    /* REQ DRIVERS */

    const getAPIDrivers = async (endpoint: string) => {
        const data = await getReqDrivers(endpoint);
        return data;
    };

    const putAPIDrivers = async (endpoint: string, dados: any) => {
        const data = await putReqDrivers(endpoint, dados);
        return data;
    };

    const postAPIDrivers = async (endpoint: string, dados: any) => {
        const data = await postReqDrivers(endpoint, dados);
        return data;
    };

    const deleteAPIDrivers = async (id: number) => {
        const data = await deleteReqDrivers(id);
        return data;
    };

    /* REQ VEHICLES */

    const getAPIVehicles = async (endpoint: string) => {
        const data = await getReqVehicles(endpoint);
        return data;
    };

    const postAPIVehicles = async (endpoint: string, dados: any) => {
        const data = await postReqVehicles(endpoint, dados);
        return data;
    };





    return (
        <GlobalContext.Provider value={{ getAPIClient, postAPIClient, putAPIClient, deleteAPIClient, getAPIDrivers, deleteAPIDrivers, postAPIDrivers, putAPIDrivers, getAPIVehicles, postAPIVehicles }}>
            {children}
        </GlobalContext.Provider>
    );





};

export const useAPI = () => useContext(GlobalContext);







