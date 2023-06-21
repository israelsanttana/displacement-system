'use client'
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Modal, Container, TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useAPI } from '../Context/AppContext';
import React from "react";


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
}

export default function ModalClient({ open, onClose, onUpdateTable }: ModalClientProps) {
    const { postAPIClient } = useAPI();

    const [age, setAge] = React.useState('');

    const [formState, setFormState] = useState<FormState>({
        numeroDocumento: "77777777",
        tipoDocumento: "cpf",
        nome: "Marcos",
        logradouro: "Girasol",
        numero: "57",
        bairro: "Bom Retiro",
        cidade: "São Paulo",
        uf: "SP",
    });


    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };


    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setFormState((prevFormState) => ({
            ...prevFormState,
            [name]: value,
        }));
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        await postAPIClient('v1/Cliente', formState);
        onClose();
        onUpdateTable();
    };

    return (

        <Dialog open={open}
            onClose={onClose}>
            <DialogTitle>Novo cadastro</DialogTitle>
            <DialogContent onSubmit={handleSubmit}>
                <DialogContentText sx={{ pb: 4 }}>
                    To subscribe to this website, please enter your email address here. We
                    will send updates occasionally.
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

                    <Grid item xs={3} >
                        <Select
                            fullWidth
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={age}
                            label="Age"
                            name="input1"
                            variant="outlined"
                            onChange={handleChange}
                        >
                            <MenuItem value={10}>CPF</MenuItem>
                            <MenuItem value={20}>RG</MenuItem>

                        </Select>

                    </Grid>
                    <Grid item xs={9} >
                        <TextField
                            fullWidth
                            variant="outlined"
                            name="cpf"
                            label="CPF"
                            value={formState.numeroDocumento}
                            onChange={handleInputChange}
                        />

                    </Grid>
                    {/*  <TextField
                        variant="outlined"
                        name="input3"
                        label="Input 3"
                        value={formState.tipoDocumento}
                        onChange={handleInputChange}
                    /> */}
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
                            name="cidaded"
                            label="Cidade"
                            value={formState.cidade}
                            onChange={handleInputChange}
                        />


                    </Grid>

                    <Grid item xs={2} >
                        <TextField
                            fullWidth
                            variant="outlined"
                            name="Estado"
                            label="Estado"
                            value={formState.uf}
                            onChange={handleInputChange}
                        />

                    </Grid>



                </Grid>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={handleSubmit}>Cadastrar</Button>
                <Button variant="outlined" color="error" onClick={onClose}>Cancelar</Button>
            </DialogActions>
        </Dialog>
    );
}
