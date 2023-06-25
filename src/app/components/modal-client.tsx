'use client'
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useAPI } from '../Context/AppContext';
import React from "react";
import { UserType } from "../Clientes/listUsers";


interface FormState {
    numeroDocumento: string,
    tipoDocumento: string,
    nome: string,
    logradouro: string,
    numero: string,
    bairro: string,
    cidade: string,
    uf: string

}

export interface ModalClientProps {
    open: boolean;
    onClose: () => void;
    onUpdateTable: () => void;
    mode: "register" | "edit"
    user?: UserType | null;
}

export default function ModalClient({ open, mode, user, onClose, onUpdateTable }: ModalClientProps) {
    const { postAPIClient, putAPIClient } = useAPI();

    const [formState, setFormState] = useState<FormState>({
        numeroDocumento: "",
        tipoDocumento: "",
        nome: "",
        logradouro: "",
        numero: "",
        bairro: "",
        cidade: "",
        uf: "",
    });

    useEffect(() => {
        if (mode === "edit" && user) {
            setFormState(user);
        } else if (mode === "register") {
            setFormState({
                numeroDocumento: "",
                tipoDocumento: "",
                nome: "",
                logradouro: "",
                numero: "",
                bairro: "",
                cidade: "",
                uf: "",
            });
        }
    }, [mode, user]);

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setFormState((prevFormState) => ({
            ...prevFormState,
            [name]: value,
        }));
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if (mode === "register") {
            await postAPIClient('v1/Cliente', formState);
        } else if (mode === "edit") {
            await putAPIClient(`v1/Cliente/${user?.id}`, formState);
        }
        onClose();
        onUpdateTable();
    };

    return (

        <Dialog open={open}
            onClose={onClose}>
            <DialogTitle>
                {mode === "register" ? "Novo cadastro" : "Editar registro"}
            </DialogTitle>
            <DialogContent onSubmit={handleSubmit}>
                <DialogContentText sx={{ pb: 1 }}>
                </DialogContentText>
                <Grid container spacing={3} >
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
                            name="numeroDocumento"
                            label="CPF"
                            value={formState.numeroDocumento}
                            onChange={handleInputChange}
                        />

                    </Grid>
                    <Grid item xs={9} >
                        <TextField
                            fullWidth
                            variant="outlined"
                            name="logradouro"
                            label="Rua"
                            value={formState.logradouro}
                            onChange={handleInputChange}
                        />

                    </Grid>

                    <Grid item xs={3} >
                        <TextField
                            fullWidth
                            variant="outlined"
                            name="numero"
                            label="Número"
                            value={formState.numero}
                            onChange={handleInputChange}
                        />

                    </Grid>

                    <Grid item xs={5} >
                        <TextField
                            fullWidth
                            variant="outlined"
                            name="bairro"
                            label="Bairro"
                            value={formState.bairro}
                            onChange={handleInputChange}
                        />

                    </Grid>

                    <Grid item xs={5} >
                        <TextField
                            fullWidth
                            variant="outlined"
                            name="cidade"
                            label="Cidade"
                            value={formState.cidade}
                            onChange={handleInputChange}
                        />


                    </Grid>

                    <Grid item xs={2} >
                        <TextField
                            fullWidth
                            variant="outlined"
                            name="uf"
                            label="Estado"
                            value={formState.uf}
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
                    <Button variant="outlined" onClick={handleSubmit}>
                        Salvar
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
}
