'use client'
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useAPI } from '../Context/AppContext';
import React from "react";
import { DriverType } from "../Condutores/listDrivers";


interface FormState {
    nome: string;
    numeroHabilitacao: string,
    catergoriaHabilitacao: string;
    vencimentoHabilitacao: string;

}

export interface ModalDriversProps {
    open: boolean;
    onClose: () => void;
    onUpdateTable: () => void;
    mode: "register" | "edit"
    driver?: DriverType | null;
}

export default function ModalDrivers({ open, mode, driver, onClose, onUpdateTable }: ModalDriversProps) {
    const { postAPIClient, putAPIClient } = useAPI();

    const [formState, setFormState] = useState<FormState>({
        nome: "",
        numeroHabilitacao: "",
        catergoriaHabilitacao: "",
        vencimentoHabilitacao: "",
    });

    useEffect(() => {
        if (mode === "edit" && driver) {
            setFormState(driver);
        } else if (mode === "register") {
            setFormState({
                nome: "",
                numeroHabilitacao: "",
                catergoriaHabilitacao: "",
                vencimentoHabilitacao: "",
            });
        }
    }, [mode, driver]);

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
            await putAPIClient(`v1/Cliente/${driver?.id}`, formState);
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
                            name="numeroHabilitacao"
                            label="Nº Habilitação"
                            value={formState.numeroHabilitacao}
                            onChange={handleInputChange}
                        />

                    </Grid>
                    <Grid item xs={9} >
                        <TextField
                            fullWidth
                            variant="outlined"
                            name="catergoriaHabilitacao"
                            label="Categoria"
                            value={formState.catergoriaHabilitacao}
                            onChange={handleInputChange}
                        />

                    </Grid>

                    <Grid item xs={3} >
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
                    <Button variant="outlined" onClick={handleSubmit}>
                        Salvar
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
}
