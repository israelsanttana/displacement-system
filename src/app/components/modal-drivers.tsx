'use client'
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid } from "@mui/material";
import { useAPI } from '../Context/AppContext';
import React from "react";
import { DriverType } from "../Condutores/listDrivers";



interface FormState {
    nome: string;
    numeroHabilitacao: string,
    categoriaHabilitacao: string;
    vencimentoHabilitacao: string;

}

export interface ModalDriversProps {
    open: boolean;
    onClose: () => void;
    onUpdateTable: () => void;
    mode: "register" | "edit"
    driver?: DriverType | null;
};

export default function ModalDrivers({ open, mode, driver, onClose, onUpdateTable }: ModalDriversProps) {
    const { postAPIDrivers, putAPIDrivers } = useAPI();

    const [formState, setFormState] = useState<FormState>({
        nome: "",
        numeroHabilitacao: "",
        categoriaHabilitacao: "",
        vencimentoHabilitacao: "",
    });

    useEffect(() => {
        if (mode === "register") {
            setFormState({
                nome: "",
                numeroHabilitacao: "",
                categoriaHabilitacao: "",
                vencimentoHabilitacao: "",
            });
        }
    }, [mode, driver]);

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        const updatedFormState = {
            id: driver?.id || 0,
            categoriaHabilitacao: formState.categoriaHabilitacao,
            vencimentoHabilitacao: formState.vencimentoHabilitacao
        };

        if (mode === "register") {
            await postAPIDrivers('v1/Condutor', formState);
        } else if (mode === "edit") {
            await putAPIDrivers(`v1/Condutor/${driver?.id}`, updatedFormState);
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
                {mode === "register" ? "Novo condutor" : "Editar registro"}
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
                                    name="nome"
                                    label="Nome"
                                    value={formState.nome}
                                    onChange={handleInputChange}
                                />

                            </Grid>
                            <Grid item xs={12} >
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    name="numeroHabilitacao"
                                    label="Nº Habilitação"
                                    value={formState.numeroHabilitacao}
                                    onChange={handleInputChange}
                                />

                            </Grid>
                        </>
                    )}
                    <Grid item xs={4} >
                        <TextField

                            fullWidth
                            variant="outlined"
                            name="categoriaHabilitacao"
                            label="Categoria"
                            value={formState.categoriaHabilitacao}
                            onChange={handleInputChange}
                        />

                    </Grid>

                    <Grid item xs={6} >
                        <TextField
                            fullWidth
                            variant="outlined"
                            name="vencimentoHabilitacao"
                            label="Vencimento"
                            value={formState.vencimentoHabilitacao}
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