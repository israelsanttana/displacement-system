'use client'
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Modal, Container, TextField, Button } from "@mui/material";
import { useAPI } from '../Context/AppContext';

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
        <Modal
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Container maxWidth="sm" sx={{ bgcolor: "#ffffff" }}>
                <form onSubmit={handleSubmit}>
                    <TextField
                        name="input1"
                        label="Input 1"
                        value={formState.nome}
                        onChange={handleInputChange}
                    />
                    <br />
                    <TextField
                        name="input2"
                        label="Input 2"
                        value={formState.numeroDocumento}
                        onChange={handleInputChange}
                    />
                    <br />
                    <TextField
                        name="input3"
                        label="Input 3"
                        value={formState.tipoDocumento}
                        onChange={handleInputChange}
                    />
                    <br />
                    <TextField
                        name="input4"
                        label="Input 4"
                        value={formState.logradouro}
                        onChange={handleInputChange}
                    />
                    <br />
                    <TextField
                        name="input5"
                        label="Input 5"
                        value={formState.numero}
                        onChange={handleInputChange}
                    />
                    <br />
                    <TextField
                        name="input6"
                        label="Input 6"
                        value={formState.bairro}
                        onChange={handleInputChange}
                    />
                    <br />
                    <TextField
                        name="input7"
                        label="Input 7"
                        value={formState.cidade}
                        onChange={handleInputChange}
                    />
                    <TextField
                        name="input7"
                        label="Input 7"
                        value={formState.uf}
                        onChange={handleInputChange}
                    />
                    <br />
                    <Button variant="contained" color="primary" type="submit">
                        Enviar
                    </Button>
                </form>
            </Container>
        </Modal>
    );
}
