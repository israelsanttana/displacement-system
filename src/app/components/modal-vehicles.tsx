/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid } from "@mui/material";
import { useAPI } from '../Context/AppContext';
import React from "react";
import { VehicleType } from "../Veiculos/listVehicles";



interface FormState {
    placa: string;
    marcaModelo: string,
    anoFabricacao: string;
    kmAtual: string;

}

export interface ModalDriversProps {
    open: boolean;
    onClose: () => void;
    onUpdateTable: () => void;
    mode: "register" | "edit"
    vehicles?: VehicleType | null;
};

export default function ModalVehicles({ open, mode, vehicles, onClose, onUpdateTable }: ModalDriversProps) {
    const { postAPIDrivers, putAPIDrivers } = useAPI();


    const [formState, setFormState] = useState<FormState>({
        placa: "",
        marcaModelo: "",
        anoFabricacao: "",
        kmAtual: "",
    });


    useEffect(() => {
        if (mode === "edit" && vehicles) {
            setFormState({
                placa: vehicles.placa,
                marcaModelo: vehicles.marcaModelo,
                anoFabricacao: vehicles.anoFabricacao,
                kmAtual: vehicles.kmAtual
            });
        } else if (mode === "register") {
            setFormState({
                placa: "",
                marcaModelo: "",
                anoFabricacao: "",
                kmAtual: "",
            });
        }
    }, [mode, vehicles]);

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        const updatedFormState = {
            id: vehicles?.id || 0,
            categoriaHabilitacao: formState.anoFabricacao,
            vencimentoHabilitacao: formState.marcaModelo
        };

        if (mode === "register") {
            await postAPIDrivers('v1/Condutor', formState);
        } else if (mode === "edit") {
            await putAPIDrivers(`v1/Condutor/${vehicles?.id}`, updatedFormState);
        }

        onClose();
        onUpdateTable();
    };



    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setFormState((prevFormState) => ({
            ...prevFormState,
            [name]: value,
        }));
    }

    return (
        <Dialog open={open}
            onClose={onClose}>
            <DialogTitle>
                {mode === "register" ? "Novo veículo" : "Editar registro"}
            </DialogTitle>
            <DialogContent onSubmit={handleSubmit}>
                <DialogContentText sx={{ pb: 1 }}>
                </DialogContentText>
                <Grid container spacing={3} >
                    {mode === "register" && (
                        <>
                            <Grid item xs={12} >
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    name="placa"
                                    label="Nome"
                                    value={formState.placa}
                                    onChange={handleInputChange}
                                />

                            </Grid>
                            <Grid item xs={12} >
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    name="marcaModelo"
                                    label="Nº Habilitação"
                                    value={formState.marcaModelo}
                                    onChange={handleInputChange}
                                />

                            </Grid>
                        </>
                    )}
                    <Grid item xs={4} >
                        <TextField
                            fullWidth
                            variant="outlined"
                            name="anoFabricacao"
                            label="Categoria"
                            value={formState.anoFabricacao}
                            onChange={handleInputChange}
                        />

                    </Grid>

                    <Grid item xs={6} >
                        <TextField
                            fullWidth
                            variant="outlined"
                            name=".kmAtual"
                            label="Vencimento"
                            value={formState.kmAtual}
                            onChange={handleInputChange}
                        />

                    </Grid>

                </Grid>
            </DialogContent>

            <DialogActions>
                {mode === "register" && (
                    <>
                        <Button variant="outlined" onClick={handleSubmit}>
                            Cadastrar
                        </Button>
                        <Button variant="outlined" color="error" onClick={onClose}>
                            Cancelar
                        </Button>
                    </>
                )}
                {mode === "edit" && (
                    <>
                        <Button variant="outlined" onClick={handleSubmit}>
                            Salvar
                        </Button>
                        <Button variant="outlined" color="error" onClick={onClose}>
                            Cancelar
                        </Button>
                    </>
                )}
            </DialogActions>
        </Dialog>
    );
};